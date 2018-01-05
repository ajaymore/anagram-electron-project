import React from "react";
import { observer, inject } from "mobx-react";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
const AnagramDisplay = ({ AnagramStore }) => (
  <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
    {AnagramStore.shuffledAssembledWord.map((item, i) => (
      <Paper
        elevation={4}
        key={i}
        style={{
          display: "inline-block",
          margin: 10,
          padding: "10px 15px"
        }}
      >
        <Typography type="headline" component="h4" style={{}}>
          <span>{item.join("")}</span>
        </Typography>
      </Paper>
    ))}
  </div>
);

export default inject("AnagramStore")(observer(AnagramDisplay));
