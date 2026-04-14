precision highp float;

uniform sampler2D tVideo;
uniform float gloss;

varying vec2 vUv;

void main(){
  vec4 base = texture2D(tVideo, vUv);

  float spec = pow(max(0.0, base.r), 8.0) * gloss;

  vec3 color = base.rgb + spec;

  gl_FragColor = vec4(color, 1.0);
}
