import tinycolor from "tinycolor2";

const defaultTwitchColors = [
  "#FF0000",
  "#0000FF",
  "#008000",
  "#B22222",
  "#FF7F50",
  "#9ACD32",
  "#FF4500",
  "#2E8B57",
  "#DAA520",
  "#D2691E",
  "#5F9EA0",
  "#1E90FF",
  "#FF69B4",
  "#8A2BE2",
  "#00FF7F",
];

const crayonColors = [
  "#FF355E",
  "#FD5B78",
  "#FF6037",
  "#FF9966",
  "#FF9933",
  "#FFCC33",
  "#FFFF66",
  "#CCFF00",
  "#66FF66",
  "#AAF0D1",
  "#50BFE6",
  "#FF6EFF",
  "#FF00CC",
  "#FF91A4",
  "#FC74FD",
  "#6CDAE7",
];

export const getRandomCrayonColor = () =>
  crayonColors[Math.floor(Math.random() * crayonColors.length)];

export const getRandomTwitchColor = () =>
  defaultTwitchColors[Math.floor(Math.random() * defaultTwitchColors.length)];

export const lightenColor = (color?: string) => {
  if (!color) {
    return getRandomTwitchColor();
  }

  const isDim = tinycolor(color).getBrightness() <= 50;
  if (isDim) {
    return tinycolor(color).lighten(30).toHexString();
  }

  return color;
};

export const shadeColor = (color: string, amount: number) =>
  tinycolor(color).brighten(amount).toHexString();
