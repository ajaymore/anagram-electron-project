import React from "react";
import { observer, inject } from "mobx-react";
import Button from "material-ui/Button";
import { FormattedMessage } from "react-intl";
import Typography from "material-ui/Typography";
import Popover from "material-ui/Popover";
import { findDOMNode } from "react-dom";

@inject("AnagramStore")
@observer
class ShowHint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  handleClickButton = () => {
    this.setState({
      anchorEl: findDOMNode(this.button)
    });
  };

  handleRequestClose = () => {
    this.props.AnagramStore.toggle("hint");
  };
  button = null;

  render() {
    const { AnagramStore } = this.props;
    return (
      <div style={{ flex: 1 }}>
        <div>
          <Button
            raised
            color="primary"
            onClick={() => {
              AnagramStore.toggle("hint");
              this.handleClickButton();
            }}
            ref={node => {
              this.button = node;
            }}
          >
            <FormattedMessage id="showHint" />
          </Button>
          <Popover
            open={AnagramStore.showHint}
            anchorEl={this.state.anchorEl}
            onRequestClose={this.handleRequestClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left"
            }}
          >
            <Typography style={{ marginTop: 5, padding: 10 }}>
              {AnagramStore.showHint ? AnagramStore.entry.comment : ""}
            </Typography>
          </Popover>
        </div>
      </div>
    );
  }
}

export default ShowHint;
