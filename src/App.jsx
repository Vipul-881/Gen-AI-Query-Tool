import React, { Component } from "react";
import "./App.css";
import HorizontalPanels from "./components/HorizontalPanels.jsx";
import VerticalPanel from "./components/VerticalPanel.jsx";
import DataView from "./components/DataView.jsx";
import DetailsPanel from './components/DetailsPanel.jsx';
import DataProvider from './components/DataContext';

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedQuery: null,
      queries: [],
    };

    this.handleQuerySelect = this.handleQuerySelect.bind(this);
    this.setQueries = this.setQueries.bind(this);
  }

  setQueries(queries) {
    this.setState({ queries });
  }

  handleQuerySelect(query) {
    this.setState({ selectedQuery: query });
  }

  render() {
    const { queries, selectedQuery } = this.state;

    return (
      <DataProvider>
      <div className="App">
        <div className="horizontal-panels">
          <HorizontalPanels setQueries={this.setQueries} />
        </div>
        <div className="content">
          <VerticalPanel className="v-panel"
            queries={queries}
            onQuerySelect={this.handleQuerySelect}
          />
          <DetailsPanel selectedQuery={selectedQuery} />
          <div className="output-panel">
            <DataView />
          </div>
        </div>
      </div>
      </DataProvider>
    );
  }
}

export default App;
