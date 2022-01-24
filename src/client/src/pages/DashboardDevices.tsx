import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AdminLayout from "../layouts/AdminLayout";
import Table from "../components/dashboard/Table";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GridCellParams, MuiEvent } from "@mui/x-data-grid";
import ConfirmDialog from "../components/dashboard/dialogs/ConfirmDialog";
import SearchBar from "material-ui-search-bar";
import Loading from "../components/dashboard/Loading";
import { Button } from "@material-ui/core";
import { columnsDevice } from "../components/dashboard/columns/columnsDevice";
import {
  GET_ALL_DEVICES_BY_NAME_WITH_PAGINATION,
  REMOVE_DEVICE,
  SOFT_REMOVE_DEVICE,
  TOTAL_DEVICES_BY_NAME,
} from "../graphql/devices";
import CreateFormDevice from "../components/dashboard/createForms/CreateFormDevice";
import UpdateFormDevice from "../components/dashboard/updateForms/UpdateFormDevice";

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

type ActionType = { action: "softDelete" } | { action: "delete" };

const initialState = { action: "" };
function actionReducer(state: initState, action: ActionType): initState {
  switch (action.action) {
    case "softDelete":
      return { action: "softDelete" };
    case "delete":
      return { action: "delete" };
    default:
      return state;
  }
}

const DashboardDevices = () => {
  const [selectedRow, setSelectedRow] = useState();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [searchChange, setSearchChange] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(0);
  const [state, dispatch] = React.useReducer(actionReducer, initialState);

  const { data: totalData } = useQuery(TOTAL_DEVICES_BY_NAME, {
    variables: {
      name: searchValue,
    },
  });
  const [getDevicesByNameWithPagination, { error, loading, data }] =
    useLazyQuery(GET_ALL_DEVICES_BY_NAME_WITH_PAGINATION);
  //const [updateModel] = useMutation(UPDATE_MODEL);
  const [softDeleteDevice] = useMutation(SOFT_REMOVE_DEVICE);
  const [deleteDevice] = useMutation(REMOVE_DEVICE);

  useEffect(() => {
    getDevicesByNameWithPagination({
      variables: {
        name: searchValue,
        offset: page * 10,
        limit: 10,
      },
    });
  }, [getDevicesByNameWithPagination, page, searchValue]);

  const currentlySelectedRow = (
    params: GridCellParams,
    event: MuiEvent<React.MouseEvent>
  ) => {
    const { field } = params;

    if (field !== "edit" && field !== "delete" && field !== "softDelete") {
      return;
    }

    if (
      field === "edit" &&
      event.target instanceof Element &&
      (event.target.tagName === "BUTTON" ||
        event.target.tagName === "svg" ||
        event.target.tagName === "path")
    ) {
      setSelectedRow(params.row);
      setIsOpen(true);
    } else if (
      field === "softDelete" &&
      event.target instanceof Element &&
      (event.target.tagName === "BUTTON" ||
        event.target.tagName === "svg" ||
        event.target.tagName === "path")
    ) {
      setSelectedRow(params.row);
      setIsOpenDialog(true);
      setTitle("Confirm soft delete of this device");
      setMessage("Are you sure you want to soft delete this device?");
      dispatch({ action: "softDelete" });
    } else if (
      field === "delete" &&
      event.target instanceof Element &&
      (event.target.tagName === "BUTTON" ||
        event.target.tagName === "svg" ||
        event.target.tagName === "path")
    ) {
      setSelectedRow(params.row);
      setIsOpenDialog(true);
      setTitle("Confirm delete of this device");
      setMessage(
        "Are you sure you want to delete this device? The data of this device will be lost for ever."
      );
      dispatch({ action: "delete" });
    }
  };

  const softDeleteCurrentDevice = async (id: string) => {
    try {
      await softDeleteDevice({
        variables: {
          id: id,
        },
        refetchQueries: [
          {
            query: GET_ALL_DEVICES_BY_NAME_WITH_PAGINATION,
            variables: {
              name: searchValue,
              offset: page * 10,
              limit: 10,
            },
          },
          {
            query: TOTAL_DEVICES_BY_NAME,
            variables: {
              name: searchValue,
            },
          },
        ],
      });
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCurrentDevice = async (id: string) => {
    try {
      await deleteDevice({
        variables: {
          id: id,
        },
        refetchQueries: [
          {
            query: GET_ALL_DEVICES_BY_NAME_WITH_PAGINATION,
            variables: {
              name: searchValue,
              offset: page * 10,
              limit: 10,
            },
          },
          {
            query: TOTAL_DEVICES_BY_NAME,
            variables: {
              name: searchValue,
            },
          },
        ],
      });
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    console.log("close");
    setIsOpen(false);
    setIsOpenDialog(false);
    setIsOpenCreate(false);
  };

  return (
    <AdminLayout>
      <Title>All devices</Title>

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
          <Button
            variant="contained"
            size="large"
            onClick={() => setIsOpenCreate(true)}
            style={{
              backgroundColor: "#F58732",
            }}
          >
            Create
          </Button>
        </SearchButtonContainer>
      </SearchContainer>

      {loading && <Loading />}
      {error && <p>{error.message}</p>}
      {data && totalData && (
        <Table
          data={data.devicesByNameWithPagination}
          columns={columnsDevice}
          onCellClick={currentlySelectedRow}
          total={totalData.totalDevicesByName}
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
            state.action === "softDelete"
              ? softDeleteCurrentDevice
              : deleteCurrentDevice
          }
        />
      )}

      {isOpen && (
        <UpdateFormDevice
          selectedRow={selectedRow}
          handleClose={handleClose}
          open={isOpen}
          page={page}
          name={searchValue}
        />
      )}

      {isOpenCreate && (
        <CreateFormDevice
          handleClose={handleClose}
          open={isOpenCreate}
          page={page}
          name={searchValue}
        />
      )}
    </AdminLayout>
  );
};

export default DashboardDevices;
