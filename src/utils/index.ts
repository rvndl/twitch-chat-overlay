import tinycolor from "tinycolor2";
import { ChatUserstate } from "tmi.js";

export const vanishCommands = ["!vanish", "!vent", "vanish0"];

const permittedUserIds = ["73859741"];

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

export const lightenColor = (color?: string) => {
  color = color || "#FF7F50";

  const isDim = tinycolor(color).getBrightness() <= 50;
  if (isDim) {
    return tinycolor(color).lighten(30).toHexString();
  }

  return color;
};

export const darkenColor = (color?: string, amount: number = 10) => {
  color = color || "#FF7F50";

  return tinycolor(color).darken(amount).toHexString();
};

export const shadeColor = (color: string, amount: number) =>
  tinycolor(color).brighten(amount).toHexString();

export const isModOrBroadcasterOrIsPermitted = (user: ChatUserstate) => {
  if (permittedUserIds.includes(user?.["user-id"] || "-1")) {
    return true;
  }

  return user.mod || user.badges?.broadcaster === "1";
};

export const isASCIIArt = (message: string) => {
  const asciiArtRegex = /[\u{2800}-\u{28ff}]/u;
  return asciiArtRegex.test(message);
};
