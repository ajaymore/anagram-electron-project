/* @flow */
import { observable, action, computed } from 'mobx';
import LanguageStore from './LanguageStore';
// String.prototype.replaceAll = function(search, replacement) {
//   var target = this;
//   return target.replace(new RegExp(search, "g"), replacement);
// };
class AnagramStore {
  @observable entry = '';
  @observable anagramText = '';
  @observable shuffledAssembledWord = null;
  @observable showHint = false;
  @observable showAnswer = false;

  @action
  toggle(itemToToggle) {
    if (itemToToggle === 'hint') {
      this.showHint = !this.showHint;
    } else {
      this.showAnswer = !this.showAnswer;
    }
  }

  @computed
  get matchStatus() {
    return this.anagramText === this.entry.text ? 'goodJob' : 'keepTrying';
  }

  @action
  updateText(text) {
    if (text.length > this.entry.text.length + 5) {
      return;
    }
    this.anagramText = text.trim();
  }

  @action
  shuffledAssembly() {
    this.anagramText = '';
    this.showAnswer = false;
    this.showHint = false;
    if (!LanguageStore.vocabulary) {
      console.error('no vocabulary available');
      this.shuffledAssembledWord = [['']];
      localStorage.setItem('currentIndex', 0);
      return;
    }
    this.entry =
      LanguageStore.vocabulary[
        Math.floor(Math.random() * LanguageStore.vocabulary.length)
      ];
    // this.entry.text.replaceAll(" ", "-");
    const allUtfChars = this.entry.text.split('');
    let assembledBlock = [];
    const charMap = LanguageStore.charMap;
    if (LanguageStore.selectedLanguage === 'en') {
      this.shuffledAssembledWord = this.doShuffle(
        allUtfChars.map(item => [item])
      );
    } else {
      for (let i = 0; i < allUtfChars.length; i++) {
        let char = allUtfChars[i];
        if (!charMap[char]) continue;
        if (charMap[char].type !== 'connector') {
          assembledBlock.push([char]);
          for (let j = i + 1; j < allUtfChars.length; j++) {
            let innerChar = allUtfChars[j];
            if (
              innerChar === '्' ||
              innerChar === '್' ||
              innerChar === '্' ||
              innerChar === '్'
            ) {
              if (allUtfChars[j + 1] === ' ') {
                assembledBlock[assembledBlock.length - 1].push(innerChar);
              } else {
                assembledBlock[assembledBlock.length - 1].push(innerChar);
                assembledBlock[assembledBlock.length - 1].push(
                  allUtfChars[j + 1]
                );
                j++;
              }
            } else if (
              charMap[innerChar] &&
              charMap[innerChar].type === 'connector'
            ) {
              assembledBlock[assembledBlock.length - 1].push(innerChar);
            } else {
              break;
            }
            i = j;
          }
        }
      }
      this.shuffledAssembledWord = this.doShuffle(assembledBlock);
    }
  }

  doShuffle(assembledBlock) {
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
  }
}

export default new AnagramStore();
