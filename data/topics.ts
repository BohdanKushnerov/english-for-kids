import { animals } from "./animals";

export type LearnItem = {
  label: string;
  color?: string; // для цветов
  image?: any; // потом для картинок
};

export const topicsData: Record<string, LearnItem[]> = {
  colors: [
    { label: "Red", color: "#FF3B30" },
    { label: "Blue", color: "#007AFF" },
    { label: "Green", color: "#34C759" },
    { label: "Yellow", color: "#FFCC00" },
    { label: "Black", color: "#000000" },
    { label: "White", color: "#FFFFFF" },
  ],

  numbers: [
    { label: "One" },
    { label: "Two" },
    { label: "Three" },
    { label: "Four" },
    { label: "Five" },
    { label: "Six" },
  ],

  animals,
};
