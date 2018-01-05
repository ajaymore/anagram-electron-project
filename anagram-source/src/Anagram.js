export const __continuous = (columnIndex, startRow, endRow, hasLeadingZero) => {
  if (
    isNaN(columnIndex) ||
    isNaN(startRow) ||
    isNaN(endRow) ||
    startRow > endRow ||
    typeof hasLeadingZero !== "boolean"
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

export default class Anagram {
  text = "";
  charSet = null;
  charMap = {};
  assembledBlock = [];

  constructor(charSet) {
    this.charSet = charSet;
    let numerals = [];
    let connectors = [];
    let vyanjans = [];
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
    numerals.forEach(num => (this.charMap[num] = { type: "numeral" }));
    swaras.forEach(swara => (this.charMap[swara] = { type: "swara" }));
    vyanjans.forEach(
      vyanjana => (this.charMap[vyanjana] = { type: "vyanjana" })
    );
    connectors.forEach(
      connector => (this.charMap[connector] = { type: "connector" })
    );
  }

  setAssembledBlock = text => {
    const allUtfChars = this.text.split("");
    let assembledBlock = [];
    for (let i = 0; i < allUtfChars.length; i++) {
      let char = allUtfChars[i];
      if (!this.charMap[char]) continue;
      if (this.charMap[char].type !== "connector") {
        assembledBlock.push([char]);
        for (let j = i + 1; j < allUtfChars.length; j++) {
          let innerChar = allUtfChars[j];
          if (innerChar === "्") {
            assembledBlock[assembledBlock.length - 1].push(innerChar);
            assembledBlock[assembledBlock.length - 1].push(allUtfChars[j + 1]);
            j++;
          } else if (
            this.charMap[innerChar] &&
            this.charMap[innerChar].type === "connector"
          ) {
            assembledBlock[assembledBlock.length - 1].push(innerChar);
          } else {
            break;
          }
          i = j;
        }
      }
    }
    return assembledBlock;
  };

  setShuffledBlock = assembledBlock => {
    let arrayToShuffle = [...assembledBlock];
    var i = 0,
      j = 0,
      temp = null;

    for (i = arrayToShuffle.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arrayToShuffle[i];
      arrayToShuffle[i] = arrayToShuffle[j];
      arrayToShuffle[j] = temp;
    }
    return arrayToShuffle;
  };

  setText(text) {
    this.text = text.trim().replace(" ", "");
    this.assembledBlock = this.setAssembledBlock(text);
    this.shuffledBlock = this.setShuffledBlock(this.assembledBlock);
  }
}
