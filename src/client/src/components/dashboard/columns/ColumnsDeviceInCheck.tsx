// import { GridColDef, } from '@material-ui/data-grid';
import { GridColDef } from "@mui/x-data-grid";
import styled from "styled-components";
import {
  Add,
  Block,
  Check,
  Clear,
  Delete,
  DeleteForever,
} from "@material-ui/icons";
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
const GreenButton = styled.button`
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
  color: #5ab946;
  border: 1px solid #5ab946;
  border-radius: 3px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  margin: 0 auto;

  &:hover {
    background-color: #5ab946;
    color: #fff;
    // border: 1px solid #F58732;
  }
`;
const RedButton = styled.button`
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
  color: #ed0034;
  border: 1px solid #ed0034;
  border-radius: 3px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  margin: 0 auto;

  &:hover {
    background-color: #ed0034;
    color: #fff;
    // border: 1px solid #F58732;
  }
`;

const ColumnsDeviceInCheck: GridColDef[] = [
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
    field: "damage",
    headerName: "Add damage",
    minWidth: 200,
    flex: 1,
    sortable: false,
    renderCell: (params) => {
      return (
        <Button>
          <Add />
        </Button>
      );
    },
  },
  {
    field: "ready",
    headerName: "Set ready",
    minWidth: 100,
    flex: 1,
    sortable: false,
    renderCell: (params) => {
      return (
        <GreenButton>
          <Check />
        </GreenButton>
      );
    },
  },
  {
    field: "broken",
    headerName: "Set broken",
    minWidth: 200,
    flex: 1,
    sortable: false,
    renderCell: (params) => {
      return (
        <RedButton>
          <Block />
        </RedButton>
      );
    },
  },
];

export { ColumnsDeviceInCheck };
