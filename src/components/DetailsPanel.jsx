
import React, { useContext } from 'react';
import './DetailsPanel.css';
import fetchData from '../utils/fetch.js';
import { DataContext } from './DataContext';

const DetailsPanel = ({ selectedQuery }) => {
  const { data, setData, selectedDatabase } = useContext(DataContext);

  const handleExecuteClick = async () => {
    if (!selectedDatabase) {
      console.error("No database selected");
      return;
    }

    const { data, error } = await fetchData("executeSQL", {
      pDBSet: selectedQuery.connection_name,
      pSQL: selectedQuery.sql_text
    }, true);
    
    if (error) {
      console.error("Error executing query:", error);
      return;
    }

    console.log("Query execution result:", data);
    setData(data.dTable);
  };

  return (
    <div className="details-panel">
      <div className="input-group-1">
        <label>Question :</label>
        <textarea className="question-box"
          value={selectedQuery ? selectedQuery.apI_QUESTION : ''}
          readOnly
        />
      </div>
      <div className="input-group-2">
        <label>Generated SQL :</label>
        <textarea
          value={selectedQuery ? selectedQuery.sql_text : ''}
          readOnly
        />
      </div>
      <div className="button-group">
        <button>Send to GPT</button>
        <button onClick={handleExecuteClick}>Execute</button>
        <button>Confirm</button>
        <button>Save</button>
      </div>
    </div>
  );
};

export default DetailsPanel;