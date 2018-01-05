/* @flow */
import { observable, action, computed } from 'mobx';
import {
  langIndex,
  refresh,
  languageCalculator,
  loadLangFonts
} from '../languages';

export const __continuous = (columnIndex, startRow, endRow, hasLeadingZero) => {
  if (
    isNaN(parseInt(columnIndex, 16)) ||
    isNaN(startRow) ||
    isNaN(endRow) ||
    startRow > endRow ||
    typeof hasLeadingZero !== 'boolean'
  ) {
    return false;
  } else {
    let unicodeArray = [];
    for (let j = startRow; j <= endRow; j++) {
      const unicodeStr = hasLeadingZero
        ? `0${columnIndex}${j.toString(16)}`
        : `${columnIndex}${j.toString(16)}`;
      const unicode = String.fromCharCode(parseInt(unicodeStr, 16));
      unicodeArray = [...unicodeArray, unicode];
    }
    return unicodeArray;
  }
};

class LanguageStore {
  @observable languages = {};
  @observable selectedLanguage = 'en';
  @observable categoryIndex = 0;
  @observable charMap = {};

  @computed
  get categories() {
    return Object.keys(this.languages[this.selectedLanguage].categories);
  }

  @computed
  get categoryTranslation() {
    return this.languages[this.selectedLanguage].categoryTranslation;
  }

  @computed
  get languageKeys() {
    return Object.keys(this.languages);
  }

  @computed
  get langMeta() {
    return {
      appTitle: langIndex[this.selectedLanguage].appTitle,
      languageName: langIndex[this.selectedLanguage].name
    };
  }

  @computed
  get vocabulary() {
    return this.languages[this.selectedLanguage].categories[
      this.categories[this.categoryIndex]
    ];
  }

  // @action
  // addWord(text, comment, cb) {
  //   let vocabularies = JSON.parse(window.localStorage.getItem("vocabularies"));
  //   vocabularies = vocabularies.map(item => {
  //     if (this.selectedLanguage === item.lang) {
  //       return {
  //         ...item,
  //         categories: item.categories.map(category => {
  //           if (category.categoryName === this.categories[this.categoryIndex]) {
  //             return {
  //               ...category,
  //               categoryValue:
  //                 category.categoryValue[0].comment === "Please add words"
  //                   ? [{ id: uuidV4(), text, comment }]
  //                   : [
  //                       ...category.categoryValue,
  //                       { id: uuidV4(), text, comment }
  //                     ]
  //             };
  //           }
  //           return category;
  //         })
  //       };
  //     }
  //     return item;
  //   });
  //   window.localStorage.setItem("vocabularies", JSON.stringify(vocabularies));
  //   this.languages = languageCalculator();
  //   cb();
  // }

  // @action
  // addVocabulary(categoryName, cb) {
  //   if (window.localStorage.getItem("vocabularies")) {
  //     let vocabularies = JSON.parse(
  //       window.localStorage.getItem("vocabularies")
  //     );
  //     const langs = vocabularies.map(item => item.lang);
  //     if (langs.indexOf(this.selectedLanguage) === -1) {
  //       vocabularies = [
  //         ...vocabularies,
  //         {
  //           lang: this.selectedLanguage,
  //           categories: [
  //             {
  //               categoryName,
  //               categoryValue: [
  //                 { id: uuidV4(), text: " ", comment: "Please add words" }
  //               ]
  //             }
  //           ]
  //         }
  //       ];
  //     } else {
  //       vocabularies = vocabularies.map(item => {
  //         if (this.selectedLanguage === item.lang) {
  //           return {
  //             ...item,
  //             categories: [
  //               ...item.categories,
  //               {
  //                 categoryName,
  //                 categoryValue: [
  //                   { id: uuidV4(), text: " ", comment: "Please add words" }
  //                 ]
  //               }
  //             ]
  //           };
  //         }
  //         return item;
  //       });
  //     }
  //     window.localStorage.setItem("vocabularies", JSON.stringify(vocabularies));
  //   } else {
  //     let vocabularies = [
  //       {
  //         lang: this.selectedLanguage,
  //         categories: [
  //           {
  //             categoryName,
  //             categoryValue: [
  //               { id: uuidV4(), text: " ", comment: "Please add words" }
  //             ]
  //           }
  //         ]
  //       }
  //     ];
  //     window.localStorage.setItem("vocabularies", JSON.stringify(vocabularies));
  //   }
  //   this.languages = languageCalculator();
  //   window.localStorage.setItem("currentIndex", this.categories.length - 1);
  //   this.categoryIndex = this.categories.length - 1;
  //   refresh();
  // }

  @action
  reinit() {
    this.languages = languageCalculator();
    this.selectedLanguage = this.selectedLanguage;
    this.categoryIndex = this.categoryIndex = parseInt(
      window.localStorage.getItem('currentIndex'),
      10
    );
    this.charMap = this.charMap;
  }

  @action
  changeLanguage(lang, categoryIndex) {
    if (window.localStorage.getItem('currentIndex')) {
      this.categoryIndex = parseInt(
        window.localStorage.getItem('currentIndex'),
        10
      );
    }
    if (
      !window.localStorage.getItem('lang') ||
      window.localStorage.getItem('lang') !== lang
    ) {
      window.localStorage.setItem('currentIndex', 0);
      window.localStorage.setItem('lang', lang);
      refresh();
    }

    if (lang === 'mr' || lang === 'hi') {
      loadLangFonts('devanagari');
    } else {
      loadLangFonts(lang);
    }
    // if (lang === "kn") {
    //   let css = `body,
    //   button,
    //   div,
    //   span,
    //   a,
    //   p,
    //   h1,
    //   h2,
    //   h3,
    //   h4,
    //   h5,
    //   h6 {
    //     margin: 0;
    //     padding: 0;
    //     font-family: "Noto Sans Kannada", sans-serif;
    //   }`,
    //     head = document.head || document.getElementsByTagName("head")[0],
    //     style = document.createElement("style");

    //   style.type = "text/css";
    //   if (style.styleSheet) {
    //     style.styleSheet.cssText = css;
    //   } else {
    //     style.appendChild(document.createTextNode(css));
    //   }

    //   head.appendChild(style);
    // } else if (lang === "mr") {
    //   let css = `body,
    //   button,
    //   div,
    //   span,
    //   a,
    //   p,
    //   h1,
    //   h2,
    //   h3,
    //   h4,
    //   h5,
    //   h6 {
    //     margin: 0;
    //     padding: 0;
    //     font-family: "Noto Sans Marathi", sans-serif;
    //   }`,
    //     head = document.head || document.getElementsByTagName("head")[0],
    //     style = document.createElement("style");

    //   style.type = "text/css";
    //   if (style.styleSheet) {
    //     style.styleSheet.cssText = css;
    //   } else {
    //     style.appendChild(document.createTextNode(css));
    //   }

    //   head.appendChild(style);
    // }

    this.languages = languageCalculator();
    this.selectedLanguage = lang;
    const charSet = this.languages[this.selectedLanguage].charSet;
    let numerals = [];
    let connectors = [];
    let vyanjans = [' '];
    let swaras = [];
    charSet.numerals.forEach(item => {
      numerals = [...numerals, ...__continuous(...item)];
    });
    charSet.connectors.forEach(
      item => (connectors = [...connectors, ...__continuous(...item)])
    );
    charSet.vyanjans.forEach(
      item => (vyanjans = [...vyanjans, ...__continuous(...item)])
    );
    charSet.swaras.forEach(
      item => (swaras = [...swaras, ...__continuous(...item)])
    );
    numerals.forEach(num => (this.charMap[num] = { type: 'numeral' }));
    swaras.forEach(swara => (this.charMap[swara] = { type: 'swara' }));
    vyanjans.forEach(
      vyanjana => (this.charMap[vyanjana] = { type: 'vyanjana' })
    );
    connectors.forEach(
      connector => (this.charMap[connector] = { type: 'connector' })
    );
    this.charMap[' '] = { type: 'vyanjana' };
  }

  @action
  changeIndex(direction) {
    if (direction !== 'prev' && direction !== 'next') return;
    if (direction === 'prev') {
      this.categoryIndex =
        this.categoryIndex - 1 < 0
          ? this.categories.length - 1
          : this.categoryIndex - 1;
    } else {
      this.categoryIndex =
        this.categoryIndex + 1 === this.categories.length
          ? 0
          : this.categoryIndex + 1;
    }
    window.localStorage.setItem('currentIndex', this.categoryIndex);
  }
}

export default new LanguageStore();
