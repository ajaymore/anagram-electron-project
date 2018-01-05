import * as mr from './mr';
import * as en from './en';
import * as kn from './kn';
import * as bn from './bn';
import * as te from './te';
import * as hi from './hi';
const languages = {
  mr,
  en,
  kn,
  bn,
  te,
  hi
};

if (!localStorage.getItem('vocabularies')) {
  const nativeVocab = Object.keys(languages).map(lang => {
    const categories = languages[lang].categories;
    return {
      lang,
      categories: Object.keys(categories).map(ctg => {
        return {
          categoryName: languages[lang].categoryTranslation[ctg],
          categoryValue: categories[ctg]
        };
      })
    };
  });
  localStorage.setItem('vocabularies', JSON.stringify(nativeVocab));
} else {
  let vocabularies = JSON.parse(localStorage.getItem('vocabularies'));
  const storedVocabs = vocabularies.map(item => item.lang);
  if (Object.keys(languages).length > storedVocabs.length) {
    Object.keys(languages).forEach(item => {
      if (storedVocabs.indexOf(item) === -1) {
        vocabularies = [
          ...vocabularies,
          {
            lang: item,
            categories: Object.keys(languages[item].categories).map(ctg => {
              return {
                categoryName: languages[item].categoryTranslation[ctg],
                categoryValue: languages[item].categories[ctg]
              };
            })
          }
        ];
      }
    });
    localStorage.setItem('vocabularies', JSON.stringify(vocabularies));
  }
}

export const refresh = () => {
  // window.location = './index.html';
  window
    .require('electron')
    .remote.getCurrentWindow()
    .reload();
};

export const languageCalculator = () => {
  let languagesExtra = {};
  Object.keys(languages).forEach(item => {
    languagesExtra[item] = {
      ...languages[item],
      categories: {}
    };
  });
  if (localStorage.getItem('vocabularies')) {
    const vocabularies = JSON.parse(localStorage.getItem('vocabularies'));
    vocabularies.forEach(element => {
      element.categories.forEach(category => {
        languagesExtra[element.lang] = {
          ...languagesExtra[element.lang],
          categories: {
            ...languagesExtra[element.lang].categories,
            [category.categoryName]: category.categoryValue
          },
          categoryTranslation: {
            ...languagesExtra[element.lang].categoryTranslation,
            [category.categoryName]: category.categoryName
          }
        };
      });
    });
  }
  return { ...languagesExtra };
};

export const loadLangFonts = lang => {
  if (lang === 'en') return;
  let css = `

  ${fontSettings[lang].fontface}

  body,
  button,
  div,
  span,
  a,
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
    font-family: ${fontSettings[lang].family}, sans-serif;
  }`,
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  head.appendChild(style);
};

export const langIndex = {
  mr: {
    name: 'मराठी'
  },
  en: {
    name: 'English'
  },
  kn: {
    name: 'ಕನ್ನಡ'
  },
  bn: {
    name: 'বাঙালি'
  },
  te: {
    name: 'తెలుగు'
  },
  hi: {
    name: 'हिंदी'
  }
};

const fontSettings = {
  kn: {
    fontface: `
  @font-face {
    font-family: "Noto Sans Kannada";
    font-style: normal;
    font-weight: 400;
    src: url(fonts/kn/NotoSansKannada-Regular.ttf) format("truetype");
  }
  @font-face {
    font-family: "Noto Sans Kannada";
    font-style: normal;
    font-weight: 700;
    src: url(fonts/kn/NotoSansKannada-Bold.ttf) format("truetype");
  }
  `,
    family: 'Noto Sans Kannada'
  },
  bn: {
    fontface: `
  @font-face {
    font-family: "Lohit Bengali";
    font-style: normal;
    font-weight: 400;
    src: url(fonts/bn/Lohit-Bengali.ttf) format("truetype");
  }
  `,
    family: 'Lohit Bengali'
  },
  te: {
    fontface: `
  @font-face {
    font-family: font-family: "NATS", sans-serif;
    font-style: normal;
    font-weight: 400;
    src: url(fonts/te/NATS-Regular.ttf) format("truetype");
  }
  `,
    family: 'NATS'
  },
  devanagari: {
    fontface: `
  @font-face {
    font-family: "Noto Sans Devanagari";
    font-style: normal;
    font-weight: 400;
    src: url(fonts/devanagari/NotoSans-Regular.ttf) format("truetype");
  }
  @font-face {
    font-family: "Noto Sans Devanagari";
    font-style: normal;
    font-weight: 700;
    src: url(fonts/devanagari/NotoSans-Bold.ttf) format("truetype");
  }
  `,
    family: 'Noto Sans Devanagari'
  }
};
