export function seededRandom(seed: number) {
  const x = Math.sin(seed * 999.983) * 43758.5453;
  return x - Math.floor(x);
}

export function rangeFromSeed(seed: number, min: number, max: number) {
  return min + seededRandom(seed) * (max - min);
}
