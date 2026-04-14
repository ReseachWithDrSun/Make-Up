precision highp float;

uniform vec3 eyeColor;
varying vec2 vUv;

void main(){
  float intensity = smoothstep(0.2, 0.8, vUv.y);
  gl_FragColor = vec4(eyeColor * intensity, 1.0);
}
