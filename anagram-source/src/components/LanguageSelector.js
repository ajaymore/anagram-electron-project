import React from "react";
import { FormattedMessage } from "react-intl";
import Button from "material-ui/Button";
import Menu, { MenuItem } from "material-ui/Menu";
import { observer, inject } from "mobx-react";
import { langIndex } from "../languages";
const langKeys = Object.keys(langIndex);

@inject("LanguageStore", "AnagramStore")
@observer
class LanguageSelector extends React.Component {
  constructor(props) {
    super(props);
    const selectedLang = window.localStorage.getItem("lang")
      ? window.localStorage.getItem("lang")
      : "en";
    let selectedIndex = 0;
    langKeys.forEach((item, index) => {
      if (item === selectedLang) {
        selectedIndex = index;
      }
    });
    this.state = {
      anchorEl: null,
      open: false,
      selectedIndex
    };
  }

  handleClick = (event, index) => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, open: false });
  };

  handleRequestClose = selectedLang => {
    this.setState({
      open: false
    });
    if (typeof selectedLang === "string") {
      this.props.LanguageStore.changeLanguage(selectedLang);
      this.props.AnagramStore.shuffledAssembly();
    }
  };

  render() {
    const { LanguageStore } = this.props;
    return (
      <div style={{ textAlign: "left", marginTop: 5, flex: 1 }}>
        <Button
          style={{
            color: "#fff",
            fontSize: LanguageStore.selectedLanguage === "en" ? 15 : 20
          }}
          aria-owns={this.state.open ? "language-menu" : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <FormattedMessage id="lang" />
          {`: ${LanguageStore.langMeta.languageName}`}
        </Button>
        <Menu
          id="language-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          {langKeys.map((item, index) => (
            <MenuItem
              key={item}
              onClick={this.handleRequestClose.bind(this, item)}
              selected={index === this.state.selectedIndex}
            >
              <span>{langIndex[item].name}</span>
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default LanguageSelector;
