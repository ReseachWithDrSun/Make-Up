import * as THREE from "three";

export function createMakeupMaterial(videoTex, maskTex) {
  return new THREE.ShaderMaterial({
    uniforms: {
      tVideo: { value: videoTex },
      tMask: { value: maskTex },
      lipColor: { value: new THREE.Color("#c2185b") },
      eyeColor: { value: new THREE.Color("#6a5acd") },
      blushColor: { value: new THREE.Color("#ff6b81") },
      lightDir: { value: new THREE.Vector3(0, 0, 1) }
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
      uniform vec3 lightDir;

      varying vec2 vUv;

      void main(){
        vec4 base = texture2D(tVideo, vUv);
        vec4 mask = texture2D(tMask, vUv);

        float lips = mask.r;
        float eyes = mask.g;
        float cheeks = mask.b;

        float light = dot(vec3(0,0,1), lightDir) * 0.5 + 0.5;

        vec3 col = base.rgb;

        col = mix(col, lipColor * light, lips);
        col = mix(col, eyeColor * light, eyes);
        col = mix(col, blushColor * light, cheeks);

        gl_FragColor = vec4(col, 1.0);
      }
    `
  });
}
