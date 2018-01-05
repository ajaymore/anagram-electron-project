import React from "react";
import { observer, inject } from "mobx-react";
import Icon from "material-ui/Icon";
import IconButton from "material-ui/IconButton";
import AnagramStore from "../stores/AnagramStore";
import Typography from "material-ui/Typography";
const CategoryChooser = ({ LanguageStore }) => (
  <div>
    <div style={{ flex: 1 }}>
      <IconButton
        color="primary"
        aria-label="Add an alarm"
        onClick={() => {
          LanguageStore.changeIndex("prev");
          AnagramStore.shuffledAssembly();
        }}
      >
        <Icon>keyboard_arrow_left</Icon>
      </IconButton>
      <Typography
        style={{
          color: "#fff",
          verticalAlign: "super",
          width: 150,
          display: "inline-block",
          textTransform: "uppercase",
          fontSize: LanguageStore.selectedLanguage === "en" ? 20 : 30
        }}
      >
        {/* <FormattedMessage
          id={`category.${LanguageStore.categories[
            LanguageStore.categoryIndex
          ]}`}
        /> */}
        <span>
          {
            LanguageStore.categoryTranslation[
              LanguageStore.categories[LanguageStore.categoryIndex]
            ]
          }
        </span>
      </Typography>
      <IconButton
        color="primary"
        aria-label="Add an alarm"
        onClick={() => {
          LanguageStore.changeIndex("next");
          AnagramStore.shuffledAssembly();
        }}
      >
        <Icon>keyboard_arrow_right</Icon>
      </IconButton>
    </div>
  </div>
);

export default inject("LanguageStore")(observer(CategoryChooser));
