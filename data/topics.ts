import { alphabet } from "./alphabet";
import { animals } from "./animals";
import { clothes } from "./clothes";
import { colors } from "./colors";
import { gastronomy } from "./gastronomy";
import { numbers } from "./numbers";
import { shapes } from "./shapes";

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

  gastronomy,

  shapes,

  clothes,
};
