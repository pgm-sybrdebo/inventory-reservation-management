// import { GridColDef, } from '@material-ui/data-grid';
import { GridColDef } from "@mui/x-data-grid";
import styled from "styled-components";
import { Delete, DeleteForever } from "@material-ui/icons";
import { BiEdit } from "react-icons/bi";
import moment from "moment";

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

const columnsDeviceStatus: GridColDef[] = [
  { field: "name", headerName: "Name", minWidth: 300, flex: 1 },
  {
    field: "created_on",
    headerName: "Created on",
    minWidth: 150,
    flex: 1,
    renderCell: (params) => {
      const d = new Date(Number(params.row.created_on));
      const dString =
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      const date = moment(dString).format("DD-MM-YYYY");
      return <span>{date}</span>;
    },
  },
  {
    field: "updated_on",
    headerName: "Updated on",
    minWidth: 150,
    flex: 1,
    renderCell: (params) => {
      const d = new Date(Number(params.row.updated_on));
      const dString =
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      const date = moment(dString).format("DD-MM-YYYY");
      return <span>{date}</span>;
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

export { columnsDeviceStatus };
