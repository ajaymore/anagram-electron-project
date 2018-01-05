import React from "react";
import { observer, inject } from "mobx-react";
import { FormattedMessage } from "react-intl";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import Popover from "material-ui/Popover";
import { findDOMNode } from "react-dom";

@inject("AnagramStore")
@observer
class ShowAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl2: null
    };
  }

  handleClickButton = () => {
    this.setState({
      anchorEl2: findDOMNode(this.buttonAnswer)
    });
  };

  handleRequestClose = () => {
    this.props.AnagramStore.toggle("answer");
  };
  buttonAnswer = null;

  render() {
    const { AnagramStore } = this.props;
    return (
      <div style={{ flex: 1 }}>
        <div>
          <Button
            raised
            color="primary"
            onClick={() => {
              AnagramStore.toggle("answer");
              this.handleClickButton();
            }}
            ref={node => {
              this.buttonAnswer = node;
            }}
          >
            <FormattedMessage id="showAnswer" />
          </Button>
          <Popover
            open={AnagramStore.showAnswer}
            anchorEl={this.state.anchorEl2}
            onRequestClose={this.handleRequestClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
          >
            <Typography style={{ margin: 5, padding: 10 }}>
              {AnagramStore.showAnswer ? AnagramStore.entry.text : ""}
            </Typography>
          </Popover>
        </div>
      </div>
    );
  }
}

export default ShowAnswer;
