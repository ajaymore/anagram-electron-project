import easy from './data/easy';
import animals from './data/animals';
import countries from './data/countries';
export const charSet = {
  numerals: [['C6', 6, 15, true]],
  connectors: [
    ['C0', 0, 3, true],
    ['C3', 13, 15, true],
    ['C4', 0, 13, true],
    ['C5', 5, 6, true],
    ['C6', 2, 3, true]
  ],
  vyanjans: [
    ['C1', 5, 15, true],
    ['C2', 0, 15, true],
    ['C3', 0, 9, true],
    ['C5', 8, 10, true],
    ['C7', 8, 15, true]
  ],
  swaras: [['C0', 5, 15, true], ['C1', 0, 4, true], ['C6', 0, 1, true]]
};

export const appTitle = 'Anagram';

export const categories = {
  easy,
  animals,
  countries
};

export const categoryTranslation = {
  easy: 'సులభంగా',
  animals: 'జంతువులు',
  countries: 'దేశాలు'
};
