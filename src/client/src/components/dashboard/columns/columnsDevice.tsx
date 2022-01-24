// import { GridColDef, } from '@material-ui/data-grid';
import { GridColDef } from "@mui/x-data-grid";
import styled from "styled-components";
import { Delete, DeleteForever } from "@material-ui/icons";
import { BiEdit } from "react-icons/bi";
import moment from "moment";
import { Box, Hidden, Typography } from "@mui/material";

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

const columnsDevice: GridColDef[] = [
  { field: "id", headerName: "Id", minWidth: 300, flex: 1 },
  {
    field: "modelName",
    headerName: "Model name",
    minWidth: 300,
    flex: 1,
    renderCell: (params) => {
      return (
        <Typography
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {params.row.model.name}
        </Typography>
      );
    },
  },
  {
    field: "device status",
    headerName: "Device status",
    minWidth: 150,
    flex: 1,
    renderCell: (params) => {
      return (
        <Box
          sx={{
            width: "90%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "2rem",
            margin: "0 auto",
            borderRadius: "0.3rem",
            backgroundColor:
              params.row.deviceStatus.name === "broken"
                ? "#ED0034"
                : params.row.deviceStatus.name === "stolen"
                ? "#CBBEC5"
                : params.row.deviceStatus.name === "in check"
                ? "#F58732"
                : "#5AB946",
          }}
        >
          <Typography
            sx={{
              color: "#000",
            }}
          >
            {params.row.deviceStatus.name}
          </Typography>
        </Box>
      );
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

export { columnsDevice };
