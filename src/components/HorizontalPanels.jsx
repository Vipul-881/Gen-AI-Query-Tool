
import React, { Component, useContext } from "react";
import fetchData from "../utils/fetch.js";
import "./HorizontalPanels.css";
import { DataContext } from './DataContext';
// import Databases from "../../public/databases.json";
// import Functions from "../../public/functions.json";


class HorizontalPanel extends Component {
  constructor() {
    super();

    this.state = {
      databases: [],
      functions: [],
      // databases: Databases,
      // functions: Functions,
    };

    this.buttonContainerRefs = [React.createRef(), React.createRef()];
    this.loadQueries = this.loadQueries.bind(this);
  }

  static contextType = DataContext;

  componentDidMount() {
    this.loadDatabases();
  }

  async loadDatabases() {
    const { data, error } = await fetchData("getDBSets");
    console.log("Fetched databases:", data);
    if (error) {
      console.error("Error loading databases:", error);
      return;
    }
    if (data && data.dTable) {
      this.setState({ databases: data.dTable });
    } else {
      console.error("No databases found.");
    }
  }

  async handleDatabaseClick(database) {
    const { setSelectedDatabase } = this.context;
    setSelectedDatabase(database);
    this.setState({ selectedDatabase: database }, async () => {
      const { data, error } = await fetchData("getFunctionModules", { pDBName: database }, true);
      if (error) {
        console.error("Error loading functions:", error);
        this.setState({ functions: [] });
        return;
      }
      if (data && data.dTable) {
        const uniqueFunctions = data.dTable.filter((item, index, self) =>
          index === self.findIndex((t) => t.functioN_NAME === item.functioN_NAME)
        );
        this.setState({ functions: uniqueFunctions });
      } else {
        console.error("No functions found.");
        this.setState({ functions: [] });
      }

      this.loadQueries(database);
    });
  }

  async loadQueries(database) {
    const { data, error } = await fetchData('getSavedQueries', { pDBName: database }, true);
    if (error) {
      console.error('Error loading queries:', error);
      this.props.setQueries([]);
      return;
    }
    if (data && data.dTable) {
      this.props.setQueries(data.dTable);
    } else {
      console.error('No queries found.');
      this.props.setQueries([]);
    }
  }

  render() {
    return (
      <div>
        <div className="main">
          <div className="wrapper">
            <div className="button-container" ref={this.buttonContainerRefs[0]}>
              {this.state.databases.map((item, index) => (
                <button
                  key={index}
                  className={`panel-button ${
                    this.state.selectedDatabase === item.connection_name
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => this.handleDatabaseClick(item.connection_name)}
                  // className="panel-button"
                >
                  {item.shortcut_name}
                </button>
              ))}
            </div>
          </div>

          <div className="wrapper">
            <div className="button-container" ref={this.buttonContainerRefs[1]}>
              {this.state.functions.map((item, index) => (
                <button key={index} className="panel-button">
                  {item.functioN_NAME}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HorizontalPanel;
