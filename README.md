## Adding a new language

1. Use converter node converter.js
2. create folder with language code under src/languages/LANG_CODE
3. create a folder named data and a file named index.js
4. Copy the index.js code from other language folder and update it for new language
5. update intl/index.js with localization strings
6. update language in languages/index.js
7. check the language font loading feature in stores/LanguageStore.js function name = changeLanguage
8. update src/App.js

## Packaging

1. to test run yarn start in anagarm-source - this should start the node server
2. Run yarn build in anagram-source
3. Update the package.json version for app in anagram-source/package.json
4. run yarn make in app-builder