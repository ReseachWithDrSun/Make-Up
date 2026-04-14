export function hexToRGB(hex) {
  const bigint = parseInt(hex.replace("#",""), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}
