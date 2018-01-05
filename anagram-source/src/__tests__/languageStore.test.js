import LanguageStore from "../stores/LanguageStore";
describe("Language Store", () => {
  it("it should initialize to following values", () => {
    expect(LanguageStore.categoryIndex).toBe(0);
    expect(LanguageStore.languageKeys.toJSON()).toEqual(["mr", "en"]);
    expect(LanguageStore.selectedLanguage).toEqual("mr");
    expect(LanguageStore.categories.toJSON()).toEqual([
      "easy",
      "animals",
      "countries"
    ]);
  });

  it("should change language", () => {
    expect(LanguageStore.langMeta).toEqual({
      appTitle: "अनाग्राम",
      languageName: "मराठी"
    });
    LanguageStore.changeLanguage("en");
    expect(LanguageStore.langMeta).toEqual({
      appTitle: "Anagram",
      languageName: "English"
    });
  });

  it("should get selected vocabulary", () => {
    LanguageStore.changeLanguage("mr");
    expect(LanguageStore.vocabulary).toContainEqual({
      id: "aed8f6dc-171a-42ea-9352-b00723820848",
      text: "फर्निचर",
      comment: "एखाद्या खोलीत वस्तू"
    });
    LanguageStore.changeIndex(2);
    // expect(LanguageStore.vocabulary).toContain({});
  });
});
