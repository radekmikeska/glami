import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

export default function CategoriesTable(props) {
  const { items, onCategoryEdit, onCategoryDelete } = props;
  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "percentage",
      headerName: "Percentage",
      width: 150,
      editable: true,
    },
    {
      field: "action",
      headerName: "",
      width: 80,
      renderCell: (tableRow) => (
        <IconButton
          onClick={() => {
            onCategoryDelete(tableRow.row);
          }}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={items}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        onCellEditCommit={onCategoryEdit}
      />
    </div>
  );
}
