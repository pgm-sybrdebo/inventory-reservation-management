import { GridColDef } from "@mui/x-data-grid";

const columnsUser: GridColDef[] = [
  { field: "firstName", headerName: "First name", minWidth: 200, flex: 1 },
  { field: "lastName", headerName: "Last name", minWidth: 200, flex: 1 },
  { field: "email", headerName: "Email", width: 300 },
  {
    field: "profession",
    headerName: "Profession",
    minWidth: 200,
    flex: 1,
    renderCell: (params) => {
      return <span>{params.row.profession === 0 ? "Student" : "Staff"}</span>;
    },
  },
  {
    field: "role",
    headerName: "Role",
    minWidth: 200,
    flex: 1,
    renderCell: (params) => {
      return <span>{params.row.role === 0 ? "User" : "Admin"}</span>;
    },
  },
];

export { columnsUser };
