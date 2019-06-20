import React from "react";
import MaterialTable, { TablePagination } from "material-table";

export default function AddProductsTable() {
  const [state, setState] = React.useState({
    columns: [
      {
        title: "Produit",
        field: "product",
        lookup: { 1: "Produit 01", 2: "Produit 02" }
      },
      { title: "Quantité", field: "quantity", type: "numeric" },
      { title: "Prix", field: "price", type: "numeric", editable: "never" }
    ],
    data: []
  });

  return (
    <MaterialTable
      title="Ajouter les produits"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.push(newData);
              setState({ ...state, data });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });
            }, 600);
          })
      }}
    />
  );
}
