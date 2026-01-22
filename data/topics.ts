import { alphabet } from "./alphabet";
import { animals } from "./animals";
import { colors } from "./colors";
import { numbers } from "./numbers";

export type LearnItem = {
  label: string;
  color?: string; // for colors
  image?: any; // for images
};

export const topicsData: Record<string, LearnItem[]> = {
  colors,

  numbers,

  animals,

  alphabet,
};
