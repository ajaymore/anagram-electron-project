import easy from "./data/easy";
import animals from "./data/animals";
import countries from "./data/countries";
export const charSet = {
  numerals: [["9E", 6, 15, true]],
  connectors: [
    [98, 0, 3, true],
    ["9B", 14, 15, true],
    ["9C", 0, 8, true],
    ["9C", 11, 12, true],
    ["9C", 13, 13, true],
    ["9D", 7, 7, true],
    ["9B", 12, 12, true]
  ],
  vyanjans: [
    [99, 5, 15, true],
    ["9A", 0, 15, true],
    ["9B", 0, 9, true],
    ["9B", 13, 13, true],
    ["9C", 14, 14, true],
    ["9D", 12, 15, true],
    ["9F", 0, 1, true],
    ["9F", 2, 3, true],
    ["9F", 4, 13, true]
  ],
  swaras: [[98, 5, 15, true], [99, 0, 4, true], ["9E", 0, 3, true]]
};

export const categories = {
  easy,
  animals,
  countries
};

export const categoryTranslation = {
  easy: "সহজ",
  animals: "পশুদের",
  countries: "দেশ"
};
