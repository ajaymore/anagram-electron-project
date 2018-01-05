import AnagramStore from "../stores/AnagramStore";
import LanguageStore from "../stores/LanguageStore";
import flatMap from "lodash/flatMap";
import { toJS } from "mobx";
describe("Anagram Store", () => {
  it("should import current state of language store", () => {
    expect(LanguageStore.categoryIndex).toBe(0);
    expect(LanguageStore.languageKeys.toJSON()).toEqual(["mr", "en"]);
    expect(LanguageStore.selectedLanguage).toEqual("mr");
    expect(LanguageStore.categories.toJSON()).toEqual([
      "easy",
      "animals",
      "countries"
    ]);
  });

  it("should should create random anagram from vocabulary", () => {
    LanguageStore.changeLanguage("mr");
    AnagramStore.shuffledAssembly();
    expect(AnagramStore.entry.text.length).toBe(
      flatMap(toJS(AnagramStore.shuffledAssembledWord)).length
    );
  });
});
