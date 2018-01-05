import React from "react";
import { observer, inject } from "mobx-react";
import { FormattedMessage } from "react-intl";
import Typography from "material-ui/Typography";
const Feedbackontrial = ({ AnagramStore }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center"
    }}
  >
    <Typography
      type="title"
      gutterBottom
      style={{
        color:
          AnagramStore.matchStatus === "keepTrying" ? "#ffa726" : "#66bb6a",
        textTransform: "uppercase",
        fontWeight: 700
      }}
    >
      <FormattedMessage id={AnagramStore.matchStatus} />&nbsp;<span
        style={{ fontWeight: "normal" }}
      >
        {AnagramStore.matchStatus === "keepTrying" ? "🤔" : "🤓"}
      </span>
    </Typography>
  </div>
);

export default inject("AnagramStore")(observer(Feedbackontrial));
