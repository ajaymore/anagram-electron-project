import easy from "./data/easy";
import animals from "./data/animals";
import countries from "./data/countries";
export const charSet = {
  numerals: [["CE", 6, 15, true]],
  connectors: [
    ["C8", 0, 3, true],
    ["CB", 12, 15, true],
    ["CC", 0, 13, true],
    ["CD", 5, 6, true],
    ["CE", 1, 3, true],
    ["CF", 1, 2, true]
  ],
  vyanjans: [
    ["C9", 5, 15, true],
    ["CA", 0, 15, true],
    ["CB", 0, 9, true],
    ["CD", 14, 14, true]
  ],
  swaras: [["C8", 5, 15, true], ["C9", 0, 4, true], ["CE", 0, 0, true]]
};

export const appTitle = "Anagram";

export const categories = {
  easy,
  animals,
  countries
};

export const categoryTranslation = {
  easy: "ಸುಲಭ",
  animals: "ಪ್ರಾಣಿಗಳು",
  countries: "ದೇಶಗಳು"
};
