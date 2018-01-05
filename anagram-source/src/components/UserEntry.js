import React, { Component } from "react";
import { observer, inject } from "mobx-react";

class UserEntry extends Component {
  render() {
    const { AnagramStore } = this.props;
    return (
      <div style={{ display: "flex" }}>
        <input
          type="text"
          onChange={e => AnagramStore.updateText(e.target.value)}
          value={AnagramStore.anagramText}
          className="text-input"
        />
      </div>
    );
  }
}

export default inject("AnagramStore")(observer(UserEntry));
