import React, { Component } from "react";
import LanguageSelector from "./LanguageSelector";
import CategoryChooser from "./CategoryChooser";
import AngramDisplay from "./AngramDisplay";
import Title from "./Title";
import Hint from "./Hint";
import UserEntry from "./UserEntry";
import ShowAnswer from "./ShowAnswer";
import NextAnagram from "./NextAnagram";
import FeedbackOnTrial from "./FeedbackOnTrial";
import IconButton from "material-ui/IconButton";
import Icon from "material-ui/Icon";
import Tooltip from "material-ui/Tooltip";
import { FormattedMessage } from "react-intl";

export default class GameView extends Component {
  render() {
    return (
      <div
        className="container"
        style={{
          background: "#263238",
          color: "#fff"
        }}
      >
        <div
          className="App"
          style={{
            display: "flex",
            flexDirection: "column",
            height: window.innerHeight,
            justifyContent: "space-between",
            paddingBottom: 80,
            boxSizing: "border-box"
          }}
        >
          <Title />
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <LanguageSelector />
            <CategoryChooser />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                flex: 1
              }}
            >
              <FormattedMessage id="manageVocabularies">
                {msg => (
                  <Tooltip id="tooltip-icon" title={msg} placement="top">
                    <IconButton
                      color="accent"
                      aria-label="Manage vocabularies"
                      onClick={this.props.onToggle}
                    >
                      <Icon>settings</Icon>
                    </IconButton>
                  </Tooltip>
                )}
              </FormattedMessage>
            </div>
          </div>
          <AngramDisplay />
          <FeedbackOnTrial />
          <UserEntry />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <Hint />
            <NextAnagram />
            <ShowAnswer />
          </div>
        </div>
      </div>
    );
  }
}
