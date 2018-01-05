import React from "react";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import Button from "material-ui/Button";
import { FormattedMessage } from "react-intl";

export default ({ title, message, cancel }) => (
  <Dialog open={true} onRequestClose={cancel}>
    <DialogTitle>
      <FormattedMessage id={title} />
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        <FormattedMessage id={message} />
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={cancel} color="primary">
        <FormattedMessage id="ok" />
      </Button>
    </DialogActions>
  </Dialog>
);
