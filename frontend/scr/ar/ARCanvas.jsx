import { useEffect, useRef } from "react";
import * as THREE from "three";
import { FaceMesh } from "@mediapipe/face_mesh";
import { useStore } from "../store/useStore";
import { buildFaceMap } from "./faceEngine";

export default function ARCanvas() {
  const ref = useRef();
  const materialRef = useRef();
  const look = useStore(s => s.look);

  useEffect(() => {
    let renderer;

    async function start() {
      const video = document.createElement("video");
      video.autoplay = true;
      video.playsInline = true;

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;

      await new Promise(r => (video.onloadedmetadata = r));

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1,1,1,-1,0,1);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      ref.current.appendChild(renderer.domElement);

      const videoTex = new THREE.VideoTexture(video);

      const maskCanvas = document.createElement("canvas");
      maskCanvas.width = 512;
      maskCanvas.height = 512;
      const ctx = maskCanvas.getContext("2d");
      const maskTex = new THREE.CanvasTexture(maskCanvas);

      const material = new THREE.ShaderMaterial({
        uniforms: {
          tVideo: { value: videoTex },
          tMask: { value: maskTex },
          lipColor: { value: new THREE.Color("#c2185b") },
          eyeColor: { value: new THREE.Color("#6a5acd") },
          blushColor: { value: new THREE.Color("#ff6b81") }
        },

        vertexShader: `
          varying vec2 vUv;
          void main(){
            vUv = uv;
            gl_Position = vec4(position,1.0);
          }
        `,

        fragmentShader: `
          precision highp float;

          uniform sampler2D tVideo;
          uniform sampler2D tMask;
          uniform vec3 lipColor;
          uniform vec3 eyeColor;
          uniform vec3 blushColor;

          varying vec2 vUv;

          void main(){
            vec4 base = texture2D(tVideo, vUv);
            vec4 mask = texture2D(tMask, vUv);

            float lips = mask.r;
            float eyes = mask.g;
            float cheeks = mask.b;

            vec3 col = base.rgb;
            col = mix(col, lipColor, lips);
            col = mix(col, eyeColor, eyes);
            col = mix(col, blushColor, cheeks);

            gl_FragColor = vec4(col,1.0);
          }
        `
      });

      materialRef.current = material;

      const quad = new THREE.Mesh(
        new THREE.PlaneGeometry(2,2),
        material
      );

      scene.add(quad);

      const face = new FaceMesh({
        locateFile: f =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${f}`
      });

      face.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true
      });

      face.onResults(results => {
        const lm = results.multiFaceLandmarks?.[0];
        if (!lm) return;

        const faceMap = buildFaceMap(lm);

        ctx.clearRect(0,0,512,512);

        ctx.fillStyle = "white";

        const draw = (pts) => {
          ctx.beginPath();
          ctx.moveTo(pts[0].x*512, pts[0].y*512);
          for (let i=1;i<pts.length;i++)
            ctx.lineTo(pts[i].x*512, pts[i].y*512);
          ctx.closePath();
          ctx.fill();
        };

        draw(faceMap.lips.outer);
        draw(faceMap.eyes.left);
        draw(faceMap.brows.left);
        draw(faceMap.cheeks.left);

        maskTex.needsUpdate = true;
      });

      const render = () => {
        requestAnimationFrame(render);
        renderer.render(scene,camera);
      };

      render();
    }

    start();
  }, []);

  useEffect(() => {
    if (!materialRef.current) return;

    if (look.lipstick)
      materialRef.current.uniforms.lipColor.value.set(look.lipstick.hex);

    if (look.eyeshadow)
      materialRef.current.uniforms.eyeColor.value.set(look.eyeshadow.hex);

    if (look.blush)
      materialRef.current.uniforms.blushColor.value.set(look.blush.hex);
  }, [look]);

  return <div ref={ref} style={{position:"fixed",inset:0}} />;
}
