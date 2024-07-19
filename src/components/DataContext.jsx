
import React, { createContext, useState } from 'react';

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState(null);

  return (
    <DataContext.Provider value={{ data, setData, selectedDatabase, setSelectedDatabase }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
