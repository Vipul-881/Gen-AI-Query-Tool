import React, { Component } from "react";
import "./VerticalPanel.css";
// import Queries from "../../public/queries.json";

class VerticalPanel extends Component {
  constructor() {
    super();

    this.state = {
      selectedQuery: null, // Track the selected query
    };

    this.buttonContainerRef = React.createRef();
  }

  handleButtonClick(item) {
    this.setState({ selectedQuery: item });
    this.props.onQuerySelect(item);
  }

  render() {
    const { queries } = this.props;
    const { selectedQuery } = this.state;

    return (
      <div className="vertical-wrapper">
        <div className="v-button-container" ref={this.buttonContainerRef}>
          {queries.map((item, index) => (
            <button
            key={index}
            className={`v-panel-button ${selectedQuery === item ? 'selected' : ''}`}
            onClick={() => this.handleButtonClick(item)}
            // className="v-panel-button"
            >
              {item.shortcut_name}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default VerticalPanel;
