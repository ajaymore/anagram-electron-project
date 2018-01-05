import React from "react";
import Button from "material-ui/Button";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog";
import { FormattedMessage } from "react-intl";
import Icon from "material-ui/Icon";
import IconButton from "material-ui/IconButton";

export default class AreYouSure extends React.Component {
  state = {
    open: false,
    text: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  action = () => {
    this.props.action();
    this.setState({ open: false, text: "" });
  };

  render() {
    return (
      <div>
        <IconButton
          color="accent"
          aria-label="remove"
          onClick={this.handleClickOpen}
        >
          <Icon>delete</Icon>
        </IconButton>
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
          <DialogTitle>
            <FormattedMessage id="areYouSure" />
          </DialogTitle>
          <DialogContent />
          <DialogActions>
            <Button onClick={this.handleRequestClose}>
              <FormattedMessage id="cancel" />
            </Button>
            <Button onClick={this.action} color="primary">
              <FormattedMessage id="yes" />
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
