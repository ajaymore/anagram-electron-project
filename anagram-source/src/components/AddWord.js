import React from "react";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog";
import IconButton from "material-ui/IconButton";
import Icon from "material-ui/Icon";
import Tooltip from "material-ui/Tooltip";
import { observer, inject } from "mobx-react";

@inject("LanguageStore", "AnagramStore")
@observer
export default class AddWord extends React.Component {
  state = {
    open: false,
    text: "",
    comment: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  addWord = () => {
    this.props.LanguageStore.addWord(
      this.state.text,
      this.state.comment,
      () => {
        this.props.AnagramStore.shuffledAssembly();
      }
    );
    this.setState({ open: false, text: "", comment: "" });
  };

  render() {
    const { LanguageStore } = this.props;
    if (!LanguageStore.addWordVisibility) {
      return null;
    }
    return (
      <div>
        <Tooltip
          id="tooltip-icon"
          title="Add word to vocabulary"
          placement="top"
        >
          <IconButton
            color="accent"
            aria-label="Add a Word"
            onClick={this.handleClickOpen}
          >
            <Icon>add_circle</Icon>
          </IconButton>
        </Tooltip>
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
          <DialogTitle>{"Add a Word"}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Word"
              type="text"
              fullWidth
              onChange={e => this.setState({ text: e.target.value })}
              value={this.state.text}
            />
            <TextField
              margin="dense"
              id="name"
              label="Hint"
              type="text"
              fullWidth
              onChange={e => this.setState({ comment: e.target.value })}
              value={this.state.comment}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.addWord} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
