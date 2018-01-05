fs = require('fs');
var uuidV4 = require('uuid/v4');
var values = require('lodash/values');
var mkdirp = require('mkdirp');
import API_KEY from './API_KEY';
/*

// convert from kvtml
var parser = require("xml2json");

const kvtmlToJSON = () => {
  fs.readFile("./world_capitals.kvtml", function(err, data) {
    var json = parser.toJson(data);
    fs.writeFile("myjsonfile.json", json, "utf8", () => {
      console.log("successfully converted!!");
    });
  });

const uuidv4 = require("uuid/v4");
var vocabulary = require("./myjsonfile.json");
const { entry } = vocabulary.kvtml.entries;
const transformed = entry.map(function(element) {
  return {
    id: uuidv4(),
    text: element.translation.text,
    comment: element.translation.comment
  };
}, this);
fs.writeFile("english-easy.json", JSON.stringify(transformed), "utf8", () => {
  console.log("successfully converted!!");
});

const uuidv4 = require("uuid/v4");
var vocabulary = require("./myjsonfile");
const transformed = vocabulary.map(function(element) {
  return {
    id: uuidv4(),
    text: element.o,
    comment: `It's capital is ${element.t}`
  };
}, this);
fs.writeFile("english-easy.json", JSON.stringify(transformed), "utf8", () => {
  console.log("successfully converted!!");
});
};

kvtmlToJSON();

*/
// translate using google
var fetch = require('node-fetch');
const apiKey = API_KEY;
const getTranslated = (text, source, target) => {
  return new Promise(async (resolve, reject) => {
    const baseUrl = 'https://translation.googleapis.com/language/translate/v2';
    const url = `${baseUrl}?key=${apiKey}&source=${source}&target=${target}&q=${encodeURIComponent(
      text
    )}`;
    const response = await fetch(url, {
      method: 'POST'
    });
    const converted = await response.json();
    resolve(converted.data.translations[0].translatedText);
  });
};

async function translateArray(array, source, target) {
  let index = 0;
  let translation = [];
  for (let element of array) {
    const text = await getTranslated(element.text, source, target);
    const comment = await getTranslated(element.comment, source, target);
    console.log(`completed ${++index} of ${array.length}`);
    translation.push({ id: uuidV4(), text, comment });
  }
  return translation;
}

function generateFile(dirName, fileName, content) {
  var mkdirp = require('mkdirp');

  mkdirp(dirName, function(err) {
    if (err) {
      console.error(err);
      return;
    }

    fs.writeFile(fileName, JSON.stringify(content), 'utf8', (err, success) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`${fileName} is created.`);
    });
  });
}

var easyEn = require('./easy.json');
var countriesEn = require('./countries.json');
var animalsEn = require('./animals.json');
var intl = require('./intlStrings.json');

async function conversion(lang) {
  let convertedIntl = { ...intl };
  for (let ele of Object.keys(convertedIntl)) {
    const trans = await getTranslated(convertedIntl[ele], 'en', lang);
    convertedIntl[ele] = trans;
    console.log(`received ${trans}`);
  }
  generateFile(`./data/${lang}/`, `./data/${lang}/intl.json`, convertedIntl);

  const easy = await translateArray(easyEn, 'en', lang);
  generateFile(`./data/${lang}/`, `./data/${lang}/easy.json`, easy);

  const countries = await translateArray(countriesEn, 'en', lang);
  generateFile(`./data/${lang}/`, `./data/${lang}/countries.json`, countries);

  const animals = await translateArray(animalsEn, 'en', lang);
  generateFile(`./data/${lang}/`, `./data/${lang}/animals.json`, animals);

  var stop = process.hrtime();
  console.timeEnd('dbsave');
}

conversion('hi');
