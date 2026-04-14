precision highp float;

uniform vec3 lightDir;

varying vec2 vUv;

void main(){
  float NdotL = dot(vec3(0.0, 0.0, 1.0), lightDir);
  float diffuse = max(NdotL, 0.3);

  vec3 skin = vec3(1.0, 0.85, 0.75) * diffuse;

  gl_FragColor = vec4(skin, 1.0);
}
