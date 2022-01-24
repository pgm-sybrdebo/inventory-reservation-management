// import { GridColDef, } from '@material-ui/data-grid';
import { GridColDef } from "@mui/x-data-grid";
import styled from "styled-components";
import { Delete, DeleteForever } from "@material-ui/icons";
import { BiEdit } from "react-icons/bi";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

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

const Center = styled.span`
  text-align: center;
  display: block;
  width: 100%;
`;

const Description = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
`;

const columnsModels: GridColDef[] = [
  { field: "name", headerName: "Name", minWidth: 200, flex: 1 },
  {
    field: "brand",
    headerName: "Brand",
    minWidth: 150,
    flex: 1,
    headerClassName: "centeredHeader",
  },
  {
    field: "description",
    headerName: "Description",
    minWidth: 200,
    flex: 1,
    renderCell: (params) => {
      return <Description>{params.row.description}</Description>;
    },
  },
  {
    field: "quantity",
    headerName: "Total quantity",
    minWidth: 150,
    flex: 1,
    renderCell: (params) => {
      return <Center>{params.row.quantity}</Center>;
    },
  },
  {
    field: "readyQuantity",
    headerName: "Ready quantity",
    minWidth: 150,
    flex: 1,
    renderCell: (params) => {
      return <Center>{params.row.readyQuantity}</Center>;
    },
  },
  {
    field: "max_reservation_time",
    headerName: "Max reservation time in days",
    minWidth: 150,
    flex: 1,
    renderCell: (params) => {
      return <Center>{params.row.max_reservation_time}</Center>;
    },
  },
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

export { columnsModels };
