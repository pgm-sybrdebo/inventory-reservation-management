// import { GridColDef, } from '@material-ui/data-grid';
import { GridColDef} from '@mui/x-data-grid';
import styled from 'styled-components';
import { Delete, DeleteForever, VisibilityOff } from '@material-ui/icons';
import { BiEdit } from "react-icons/bi";

const Button = styled.button`
  width: 2rem;
  height: 2rem;
  min-width: 2rem;
  min-height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #CBBEC5;
  border: 1px solid #CBBEC5;
  background-color: transparent;
  color: #F58732;
  border: 1px solid #F58732;
  border-radius: 3px;
  cursor:pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  margin: 0 auto;

  &:hover {
    background-color: #F58732;
    color: #FFF;
    // border: 1px solid #F58732;

  }
`;

const columnsSuperUser: GridColDef[] = [
  { field: "firstName", headerName: "First name", width: 200 },
  { field: "lastName", headerName: "Last name", width: 200 },
  { field: "email", headerName: "Email", width: 300 },
  {field: "cardNumber", headerName:"Card number", width: 200},
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
        //<span>{params.row.role === 0 ? "User" : "Admin"}</span>
        <span>{ params.row.role === 0 ? "User" : params.row.role === 1 ? "Admin" : "Super admin"}</span>
      )
    }
  },

  {
    field: "edit",
    headerName: "Edit",
    width: 100,
    sortable: false,
    renderCell: (params) => {

      return (
        <Button>
          <BiEdit />
        </Button>
      );
    },
  },
  {
    field: "anonymize",
    headerName: "Anonymize",
    width: 100,
    sortable: false,
    renderCell: (params) => {

      return (
        <Button>
          <VisibilityOff />
        </Button>
      );
    },
  },
  {
    field: "softDelete",
    headerName: "Soft Delete",
    width: 100,
    sortable: false,
    renderCell: (params) => {

      return (
        <Button>
          <Delete />
        </Button>
      );
    },
  },
  {
    field: "delete",
    headerName: "Hard Delete",
    width: 100,
    sortable: false,
    renderCell: (params) => {

      return (
        <Button>
          <DeleteForever />
        </Button>
      );
    },
  },
];

export { columnsSuperUser };