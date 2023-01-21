export function getRandomColor() {
  const randomRGB = () => Math.floor(Math.random() * 256);
  const randomColor = `rgb(${randomRGB()},${randomRGB()},${randomRGB()})`;
  return randomColor;
}
