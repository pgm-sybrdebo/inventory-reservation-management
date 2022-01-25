import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AdminLayout from "../layouts/AdminLayout";
import Table from "../components/dashboard/Table";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GridCellParams, MuiEvent } from "@mui/x-data-grid";
import ConfirmDialog from "../components/dashboard/dialogs/ConfirmDialog";
import SearchBar from "material-ui-search-bar";
import Loading from "../components/dashboard/Loading";
import { Button, Snackbar } from "@material-ui/core";
import { columnsDevice } from "../components/dashboard/columns/columnsDevice";
import {
  GET_ALL_DEVICES_BY_NAME_WITH_PAGINATION,
  GET_ALL_DEVICES_IN_CHECK_BY_NAME_WITH_PAGINATION,
  REMOVE_DEVICE,
  SOFT_REMOVE_DEVICE,
  TOTAL_DEVICES_BY_NAME,
  TOTAL_DEVICES_IN_CHECK_BY_NAME,
  UPDATE_DEVICE,
} from "../graphql/devices";
import { ColumnsDeviceInCheck } from "../components/dashboard/columns/ColumnsDeviceInCheck";

import "dotenv/config";
import CreateFormDamage from "../components/dashboard/createForms/CreateFormDamage";
import { Alert } from "@mui/material";

const Title = styled.h1`
  margin: 1.5rem;
`;

const SearchContainer = styled.div`
  margin: 0 1.5rem;

  h2 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
`;

const SearchButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    width: 100%;
  }

  button {
    margin-left: 3rem;
  }
`;

interface initState {
  action: string;
}

type ActionType = { action: "ready" } | { action: "broken" };

const initialState = { action: "" };
function actionReducer(state: initState, action: ActionType): initState {
  switch (action.action) {
    case "ready":
      return { action: "ready" };
    case "broken":
      return { action: "broken" };
    default:
      return state;
  }
}

const DashboardInCheckDevices = () => {
  const [selectedRow, setSelectedRow] = useState();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [searchChange, setSearchChange] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(0);
  const [state, dispatch] = React.useReducer(actionReducer, initialState);

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSuccess, setSnackbarSuccess] = useState(true);

  const handleSnackbarMessageChange = (isSelected: string) => {
    setSnackbarMessage(isSelected);
  };
  const handleOpenSnackbarChange = (isSelected: boolean) => {
    setOpenSnackbar(isSelected);
  };
  const handleSnackbarSuccessChange = (isSelected: boolean) => {
    setSnackbarSuccess(isSelected);
  };

  const handleSnackbarClose = (
    e: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const { data: totalData } = useQuery(TOTAL_DEVICES_IN_CHECK_BY_NAME, {
    variables: {
      name: searchValue,
    },
  });
  const [getDevicesInCheckByNameWithPagination, { error, loading, data }] =
    useLazyQuery(GET_ALL_DEVICES_IN_CHECK_BY_NAME_WITH_PAGINATION);
  //const [updateModel] = useMutation(UPDATE_MODEL);
  const [updateDevice] = useMutation(UPDATE_DEVICE);

  useEffect(() => {
    getDevicesInCheckByNameWithPagination({
      variables: {
        name: searchValue,
        offset: page * 10,
        limit: 10,
      },
    });
  }, [getDevicesInCheckByNameWithPagination, page, searchValue]);

  const currentlySelectedRow = (
    params: GridCellParams,
    event: MuiEvent<React.MouseEvent>
  ) => {
    const { field } = params;

    if (
      field !== "damage" &&
      field !== "ready" &&
      field !== "broken" &&
      field
    ) {
      return;
    }

    if (
      field === "damage" &&
      event.target instanceof Element &&
      (event.target.tagName === "BUTTON" ||
        event.target.tagName === "svg" ||
        event.target.tagName === "path")
    ) {
      setSelectedRow(params.row);
      setIsOpen(true);
    } else if (
      field === "ready" &&
      event.target instanceof Element &&
      (event.target.tagName === "BUTTON" ||
        event.target.tagName === "svg" ||
        event.target.tagName === "path")
    ) {
      setSelectedRow(params.row);
      setIsOpenDialog(true);
      setTitle("Confirm that you think that this device is ready to be used");
      setMessage("Are you sure you want to set this device to ready?");
      dispatch({ action: "ready" });
    } else if (
      field === "broken" &&
      event.target instanceof Element &&
      (event.target.tagName === "BUTTON" ||
        event.target.tagName === "svg" ||
        event.target.tagName === "path")
    ) {
      setSelectedRow(params.row);
      setIsOpenDialog(true);
      setTitle("Confirm that this device is broken");
      setMessage(
        "Are you sure you want set the device status to broken. This means that the device will not be used anymore."
      );
      dispatch({ action: "broken" });
    }
  };

  const setCurrentDeviceReady = async (id: string) => {
    try {
      await updateDevice({
        variables: {
          id: id,
          deviceStatusId: process.env.REACT_APP_READY_STATE,
        },
        refetchQueries: [
          {
            query: GET_ALL_DEVICES_IN_CHECK_BY_NAME_WITH_PAGINATION,
            variables: {
              name: searchValue,
              offset: page * 10,
              limit: 10,
            },
          },
          {
            query: TOTAL_DEVICES_IN_CHECK_BY_NAME,
            variables: {
              name: searchValue,
            },
          },
        ],
      });
      setSnackbarSuccess(true);
      setSnackbarMessage("Device status is changed to ready!");
      setOpenSnackbar(true);
      handleClose();
    } catch (error) {
      setSnackbarSuccess(false);
      setSnackbarMessage(
        `Device status is not changed to ready due to error: ${error}`
      );
      setOpenSnackbar(true);
    }
  };

  const setCurrentDeviceBroken = async (id: string) => {
    try {
      await updateDevice({
        variables: {
          id: id,
          deviceStatusId: process.env.REACT_APP_BROKEN_STATE,
        },
        refetchQueries: [
          {
            query: GET_ALL_DEVICES_IN_CHECK_BY_NAME_WITH_PAGINATION,
            variables: {
              name: searchValue,
              offset: page * 10,
              limit: 10,
            },
          },
          {
            query: TOTAL_DEVICES_IN_CHECK_BY_NAME,
            variables: {
              name: searchValue,
            },
          },
        ],
      });
      setSnackbarSuccess(true);
      setSnackbarMessage("Device status is changed to broken!");
      setOpenSnackbar(true);
      handleClose();
    } catch (error) {
      setSnackbarSuccess(false);
      setSnackbarMessage(
        `Device status is not changed to broken due to error: ${error}`
      );
      setOpenSnackbar(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsOpenDialog(false);
  };

  return (
    <AdminLayout>
      <Title>Devices in Check</Title>

      <SearchContainer>
        <h2>Search on model name:</h2>
        <SearchButtonContainer>
          <SearchBar
            value={searchChange}
            onChange={(newValue) => {
              setSearchChange(newValue);
            }}
            onRequestSearch={() => setSearchValue(searchChange)}
          />
        </SearchButtonContainer>
      </SearchContainer>

      {loading && <Loading />}
      {error && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={true}
          autoHideDuration={3000}
        >
          <Alert severity="error">An error occured: {error.message}</Alert>
        </Snackbar>
      )}
      {data && totalData && (
        <Table
          data={data.devicesInCheckByNameWithPagination}
          columns={ColumnsDeviceInCheck}
          onCellClick={currentlySelectedRow}
          total={totalData.totalDevicesInCheckByName}
          page={page}
          setPage={setPage}
        />
      )}

      {isOpenDialog && (
        <ConfirmDialog
          selectedRow={selectedRow}
          title={title}
          message={message}
          open={isOpenDialog}
          handleClose={handleClose}
          handleConfirm={
            state.action === "ready"
              ? setCurrentDeviceReady
              : setCurrentDeviceBroken
          }
        />
      )}

      {isOpen && (
        <CreateFormDamage
          selectedRow={selectedRow}
          handleClose={handleClose}
          open={isOpen}
          page={page}
          name={searchValue}
          onSnackbarMessageChange={handleSnackbarMessageChange}
          onOpenSnackbarChange={handleOpenSnackbarChange}
          onSnackbarSuccessChange={handleSnackbarSuccessChange}
        />
      )}

      <Snackbar
        open={openSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          severity={snackbarSuccess ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </AdminLayout>
  );
};

export default DashboardInCheckDevices;
