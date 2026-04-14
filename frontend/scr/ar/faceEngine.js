import { FACE_REGIONS } from "./faceRegions";

export function getRegion(landmarks, indices) {
  return indices.map(i => landmarks[i]);
}

export function buildFaceMap(lm) {
  return {
    lips: {
      outer: getRegion(lm, FACE_REGIONS.lipsOuter),
      inner: getRegion(lm, FACE_REGIONS.lipsInner)
    },

    eyes: {
      left: getRegion(lm, FACE_REGIONS.leftEye),
      right: getRegion(lm, FACE_REGIONS.rightEye)
    },

    brows: {
      left: getRegion(lm, FACE_REGIONS.leftBrow),
      right: getRegion(lm, FACE_REGIONS.rightBrow)
    },

    cheeks: {
      left: getRegion(lm, FACE_REGIONS.cheeksLeft),
      right: getRegion(lm, FACE_REGIONS.cheeksRight)
    }
  };
}
