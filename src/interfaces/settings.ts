export type Style = "default" | "donk" | "donkExtra" | "nymn" | "nnys";

export interface Settings {
  animate: boolean;
  showNames: boolean;
  showIcon: boolean;
  margin: number;
  style: Style;
  fontSize: string;
}
