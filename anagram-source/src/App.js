import React, { Component } from 'react';
import GameView from './components/GameView';
import Settings from './components/Settings';
import { Provider } from 'mobx-react';
import stores from './stores';
import intl, { flattenMessages } from './intl';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import mr from 'react-intl/locale-data/mr';
import kn from 'react-intl/locale-data/kn';
import bn from 'react-intl/locale-data/bn';
import te from 'react-intl/locale-data/te';
import hi from 'react-intl/locale-data/hi';
import { observer } from 'mobx-react';
addLocaleData([...en, ...mr, ...kn, ...bn, ...te, ...hi]);

@observer
class App extends Component {
  state = {
    mgmtView: false
  };
  constructor(props) {
    super(props);
    if (window.localStorage.getItem('lang')) {
      stores.LanguageStore.changeLanguage(window.localStorage.getItem('lang'));
    } else {
      window.localStorage.setItem('lang', 'en');
      stores.LanguageStore.changeLanguage('en');
    }
    stores.AnagramStore.shuffledAssembly();
  }

  componentDidMount() {}

  render() {
    return (
      <IntlProvider
        locale={stores.LanguageStore.selectedLanguage}
        messages={flattenMessages(intl[stores.LanguageStore.selectedLanguage])}
      >
        <Provider {...stores}>
          <div>
            {this.state.mgmtView ? (
              <Settings
                selectedLanguage={stores.LanguageStore.langMeta.languageName}
                langCode={stores.LanguageStore.selectedLanguage}
                done={() => {
                  stores.LanguageStore.reinit();
                  this.setState({ mgmtView: false });
                }}
              />
            ) : (
              <GameView
                onToggle={() => {
                  this.setState({ mgmtView: true });
                }}
              />
            )}
          </div>
        </Provider>
      </IntlProvider>
    );
  }
}

export default App;
