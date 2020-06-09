import React, { useState, useEffect } from "react";
import "./App.scss";
import MaterialTable from "material-table";

import DB from "./DB.json";
import ColorPicker from "./components/ColorPicker";

const App = () => {
  const initialData = () =>
    JSON.parse(window.localStorage.getItem("data")) || DB;

  const [data, setData] = useState(initialData);

  useEffect(() => {
    window.localStorage.setItem("data", JSON.stringify(data));
  }, [data]);
  return (
    <div className="App">
      {data && (
        <MaterialTable
          options={{ search: false, paging: false }}
          title="Примитивный редактор табличных данных"
          columns={[
            { title: "Name", field: "name" },
            { title: "Type", field: "type" },
            {
              title: "Color",
              field: "color",
              render: (rowData) => <ColorPicker color={rowData.color} />,
              editComponent: (props) => (
                <ColorPicker
                  color={props.value}
                  onChange={props.onChange}
                  active
                />
              ),
            },
          ]}
          data={data}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  setData((prevState) => [...prevState, newData]);
                  resolve();
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  if (oldData) {
                    const dataCopy = [...data];
                    dataCopy[oldData.tableData.id] = newData;
                    setData(dataCopy);
                    resolve();
                  }
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  const dataCopy = [...data];
                  dataCopy.splice(oldData.tableData.id, 1);
                  setData(dataCopy);
                  resolve();
                }, 600);
              }),
          }}
        />
      )}
    </div>
  );
};

export default App;
