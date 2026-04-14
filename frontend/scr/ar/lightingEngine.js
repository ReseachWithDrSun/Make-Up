import * as THREE from "three";

let smoothedLight = new THREE.Vector3(0, 0, 1);

export function estimateLighting(landmarks) {
  if (!landmarks) return smoothedLight;

  const nose = landmarks[1];
  const forehead = landmarks[10];

  const dx = nose.x - forehead.x;
  const dy = nose.y - forehead.y;

  const raw = new THREE.Vector3(dx, dy, 1.0).normalize();

  // smoothing (temporal stability)
  smoothedLight.lerp(raw, 0.15);

  return smoothedLight;
}
