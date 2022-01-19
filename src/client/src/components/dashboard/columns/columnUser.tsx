
import { GridColDef} from '@mui/x-data-grid';

const columnsUser: GridColDef[] = [
  { field: "firstName", headerName: "First name", width: 200 },
  { field: "lastName", headerName: "Last name", width: 200 },
  { field: "email", headerName: "Email", width: 300 },
  { 
    field: "profession", 
    headerName: "Profession", 
    width: 150,
    renderCell: (params) => {
      return (
        <span>{params.row.profession === 0 ? "Student" : "Staff"}</span>
      )
    }
  },
  { 
    field: "role", 
    headerName: "Role", 
    width: 150,
    renderCell: (params) => {
      return (
        <span>{params.row.role === 0 ? "User" : "Admin"}</span>
      )
    }
  },
];

export { columnsUser };