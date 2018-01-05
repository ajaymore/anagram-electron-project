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
import FileUploadIcon from "material-ui-icons/FileUpload";

export default class UploadVocabulary extends React.Component {
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
          raised
          color="accent"
          aria-label="Add a Vocabulary"
          onClick={this.handleClickOpen}
        >
          <FileUploadIcon />
        </Button>
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
          <DialogTitle>
            <FormattedMessage id="uploadVocab" />
          </DialogTitle>
          <DialogContent>
            <DialogContentText style={{ whiteSpace: "pre-wrap" }}>
              <FormattedMessage id="uploadVocabMessage" />
            </DialogContentText>
            <FormattedMessage id="uploadVocabName">
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
            <input
              type="file"
              id="csvFileInput"
              onChange={this.props.fileHandle}
              accept=".csv"
              style={{ alignSelf: "center", width: 200 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose}>
              <FormattedMessage id="cancel" />
            </Button>
            <Button onClick={this.addVocabulary} color="primary">
              <FormattedMessage id="upload" />
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
