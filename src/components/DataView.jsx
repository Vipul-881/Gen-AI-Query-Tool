import React, { useContext, useEffect, useRef, useState } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { DataContext } from './DataContext';
import "./DataView.css";

Chart.register(...registerables);

const DataView = () => {
  const { data } = useContext(DataContext);
  const [view, setView] = useState('table');
  const [xAxisColumn, setXAxisColumn] = useState('');
  const [yAxisColumn, setYAxisColumn] = useState('');
  const [graphType, setGraphType] = useState('line');
  const chartRef = useRef(null);

  const handleViewChange = (event) => {
    setView(event.target.value);
  };

  const handleXAxisChange = (event) => {
    setXAxisColumn(event.target.value);
  };

  const handleYAxisChange = (event) => {
    setYAxisColumn(event.target.value);
  };

  const handleGraphTypeChange = (event) => {
    setGraphType(event.target.value);
  };

  useEffect(() => {
    if (chartRef.current && chartRef.current.chartInstance) {
      chartRef.current.chartInstance.destroy();
    }
  }, [view]);

  const renderGraph = () => {
    const labels = data.map(item => item[xAxisColumn]);
    const dataSet = data.map(item => item[yAxisColumn]);

    // const commonOptions = {
    //   maintainAspectRatio: false, // Disable aspect ratio to fit container
    //   plugins: {
    //     legend: {
    //       display: false,
    //     },
    //   },
    //   scales: {
    //     x: {
    //       title: {
    //         display: true,
    //         text: `${xAxisColumn} Values`
    //       }
    //     },
    //     y: {
    //       title: {
    //         display: true,
    //         text: `${yAxisColumn} Values`
    //       }
    //     }
    //   }
    // };

    switch (graphType) {
      case 'line':
        return (
          <Line
            ref={chartRef}
            data={{
              labels,
              datasets: [{
                label: `${yAxisColumn} Values`,
                data: dataSet,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              }]
            }}
            //options={commonOptions}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  type: 'linear',
                  title: {
                    display: true,
                    text: `${xAxisColumn} Values`
                  }
                },
                y: {
                  type: 'linear',
                  title: {
                    display: true,
                    text: `${yAxisColumn} Values`
                  }
                }
              }
            }}
          />
        );
      case 'pie':
        return (
          <Pie
            data={{
              labels,
              datasets: [{
                label: `${yAxisColumn} Values`,
                data: dataSet,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                ],
              }]
            }}
            //options={commonOptions}
          />
        );
      case 'bar':
        return (
          <Bar
            data={{
              labels,
              datasets: [{
                label: `${yAxisColumn} Values`,
                data: dataSet,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
              }]
            }}
            //options={commonOptions}
            options={{
              indexAxis: 'x',
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: `${xAxisColumn} Values`
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: `${yAxisColumn} Values`
                  }
                }
              }
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="dataview-container">
      <div className="view-change">
        <label>Select View:</label>
        <select value={view} onChange={handleViewChange} style={{ marginLeft: '10px' }}>
          <option value="table">Tabular View</option>
          <option value="graph">Graphical View</option>
        </select>
      </div>
      {view === 'table' && (
        <div /*style={{ flex: 1, overflow: 'hidden' }}*/ >
          <h2>Data Table</h2>
          <table className="center">
            <thead>
              <tr>
                {Object.keys(data[0] || {}).map(column => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  {Object.keys(item).map(key => (
                    <td key={key}>{item[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {view === 'graph' && (
        <div /*style={{ flex: 1 }}*/ >
          <h2>{graphType === 'line' ? 'Line Graph' : graphType === 'pie' ? 'Pie Chart' : 'Bar Chart'}</h2>
          <div className={`graph-container ${graphType}-graph-container`}>
            <div className="graph-controls">
              <div className="control-item">
                <label>X-axis:</label>
                <select value={xAxisColumn} onChange={handleXAxisChange} style={{ marginLeft: '10px' }}>
                  {Object.keys(data[0] || {}).map(column => (
                    <option key={column} value={column}>{column}</option>
                  ))}
                </select>
              </div>
              <div className="control-item">
                <label>Y-axis:</label>
                <select value={yAxisColumn} onChange={handleYAxisChange} style={{ marginLeft: '10px' }}>
                  {Object.keys(data[0] || {}).map(column => (
                    <option key={column} value={column}>{column}</option>
                  ))}
                </select>
              </div>
              <div className="control-item">
                <label>Graph Type:</label>
                <select value={graphType} onChange={handleGraphTypeChange} style={{ marginLeft: '10px' }}>
                  <option value="line">Line Graph</option>
                  <option value="pie">Pie Chart</option>
                  <option value="bar">Bar Chart</option>
                </select>
              </div>
            </div>
            {/* <div style={{ width: '100%', height: '100%' }}>
              {renderGraph()}
            </div> */}
            {renderGraph()}
          </div>
        </div>
      )}
    </div>
  );
};

export default DataView;
