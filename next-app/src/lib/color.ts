export function genColor(prefCode: number) {
  const hue = Math.round((360 / 47) * Number(prefCode) * 7);
  const saturation = 70;
  const lightness = 50;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
