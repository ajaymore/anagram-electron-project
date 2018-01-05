import React from "react";
import { FormattedMessage } from "react-intl";
import Typography from "material-ui/Typography";
export default () => (
  <Typography
    type="headline"
    component="h2"
    style={{
      fontWeight: 900,
      fontSize: "2.5em",
      margin: "15px 0",
      padding: "10px 0",
      color: "#fff"
    }}
  >
    <FormattedMessage id="appTitle" />
  </Typography>
);
