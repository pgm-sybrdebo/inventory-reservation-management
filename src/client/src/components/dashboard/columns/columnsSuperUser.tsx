// import { GridColDef, } from '@material-ui/data-grid';
import { GridColDef } from "@mui/x-data-grid";
import styled from "styled-components";
import { Delete, DeleteForever, VisibilityOff } from "@material-ui/icons";
import { BiEdit } from "react-icons/bi";

const Button = styled.button`
  width: 2rem;
  height: 2rem;
  min-width: 2rem;
  min-height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #cbbec5;
  border: 1px solid #cbbec5;
  background-color: transparent;
  color: #f58732;
  border: 1px solid #f58732;
  border-radius: 3px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  margin: 0 auto;

  &:hover {
    background-color: #f58732;
    color: #fff;
    // border: 1px solid #F58732;
  }
`;

const columnsSuperUser: GridColDef[] = [
  { field: "firstName", headerName: "First name", minWidth: 200, flex: 1 },
  { field: "lastName", headerName: "Last name", minWidth: 200, flex: 1 },
  { field: "email", headerName: "Email", minWidth: 300, flex: 1 },
  { field: "cardNumber", headerName: "Card number", minWidth: 200, flex: 1 },
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
      return (
        //<span>{params.row.role === 0 ? "User" : "Admin"}</span>
        <span>
          {params.row.role === 0
            ? "User"
            : params.row.role === 1
            ? "Admin"
            : "Super admin"}
        </span>
      );
    },
  },

  {
    field: "edit",
    headerName: "Edit",
    minWidth: 100,
    flex: 1,
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
    minWidth: 100,
    flex: 1,
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
    minWidth: 100,
    flex: 1,
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
    minWidth: 100,
    flex: 1,
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
