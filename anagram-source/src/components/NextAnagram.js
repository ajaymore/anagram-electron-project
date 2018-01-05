import React from "react";
import { observer, inject } from "mobx-react";
import { FormattedMessage } from "react-intl";
import Button from "material-ui/Button";
const NextAnagram = ({ AnagramStore }) => (
  <div style={{ flex: 1 }}>
    <Button
      raised
      color="accent"
      onClick={() => AnagramStore.shuffledAssembly()}
    >
      <FormattedMessage id="next" />
    </Button>
  </div>
);

export default inject("AnagramStore")(observer(NextAnagram));
