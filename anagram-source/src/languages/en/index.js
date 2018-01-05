import easy from "./data/easy";
import animals from "./data/animals";
import countries from "./data/countries";
export const charSet = {
  numerals: [[96, 6, 15, true]],
  connectors: [
    [90, 0, 3, true],
    [93, 10, 15, true],
    [94, 0, 15, true],
    [95, 1, 7, true]
  ],
  vyanjans: [
    [91, 5, 15, true],
    [92, 0, 15, true],
    [93, 0, 9, true],
    [95, 0, 0, true],
    [95, 8, 15, true],
    [97, 9, 12, true],
    [97, 14, 15, true]
  ],
  swaras: [[90, 4, 15, true], [91, 0, 4, true], [97, 2, 7, true]]
};

export const appTitle = "Anagram";

export const categories = {
  easy,
  animals,
  countries
};

export const categoryTranslation = {
  easy: "easy",
  animals: "animals",
  countries: "countries"
};
