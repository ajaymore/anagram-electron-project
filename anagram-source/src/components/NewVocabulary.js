import React from "react";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import { FormattedMessage } from "react-intl";
import AddIcon from "material-ui-icons/Add";

export default class NewVocabulary extends React.Component {
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

  addVocabulary = () => {
    this.props.addVocab();
    this.setState({ open: false, text: "" });
  };

  render() {
    return (
      <div>
        <Button
          fab
          color="primary"
          aria-label="Add a Vocabulary"
          onClick={this.handleClickOpen}
        >
          <AddIcon />
        </Button>
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
          <DialogTitle>
            <FormattedMessage id="addVocab" />
          </DialogTitle>
          <DialogContent>
            <DialogContentText style={{ whiteSpace: "pre-wrap" }}>
              <FormattedMessage id="addVocabMessage" />
            </DialogContentText>
            <FormattedMessage id="newVocabName">
              {msg => (
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label={msg}
                  type="text"
                  fullWidth
                  onChange={this.props.onChange}
                  value={this.props.value}
                />
              )}
            </FormattedMessage>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose}>
              <FormattedMessage id="cancel" />
            </Button>
            <Button onClick={this.addVocabulary} color="primary">
              <FormattedMessage id="add" />
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
