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
import { columnsModels } from "../components/dashboard/columns/columnsModel";
import {
  GET_ALL_MODELS_BY_NAME_WITH_PAGINATION,
  REMOVE_MODEL,
  SOFT_REMOVE_MODEL,
  TOTAL_MODELS_BY_NAME,
} from "../graphql/models";
import CreateFormModel from "../components/dashboard/createForms/CreateFormModel";
import UpdateFormModel from "../components/dashboard/updateForms/UpdateFormModel";
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

const DashboardModels = () => {
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

  const { data: totalData } = useQuery(TOTAL_MODELS_BY_NAME, {
    variables: {
      name: searchValue,
    },
  });
  const [getModelsByNameWithPagination, { error, loading, data }] =
    useLazyQuery(GET_ALL_MODELS_BY_NAME_WITH_PAGINATION);
  //const [updateModel] = useMutation(UPDATE_MODEL);
  const [softDeleteModel] = useMutation(SOFT_REMOVE_MODEL);
  const [deleteModel] = useMutation(REMOVE_MODEL);

  useEffect(() => {
    getModelsByNameWithPagination({
      variables: {
        name: searchValue,
        offset: page * 10,
        limit: 10,
      },
    });
  }, [getModelsByNameWithPagination, page, searchValue]);

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
      setTitle("Confirm soft delete of this model");
      setMessage("Are you sure you want to soft delete this model?");
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
      setTitle("Confirm delete of this model");
      setMessage(
        "Are you sure you want to delete this model? The data of this model will be lost for ever."
      );
      dispatch({ action: "delete" });
    }
  };

  const softDeleteCurrentModel = async (id: string) => {
    try {
      await softDeleteModel({
        variables: {
          id: id,
        },
        refetchQueries: [
          {
            query: GET_ALL_MODELS_BY_NAME_WITH_PAGINATION,
            variables: {
              name: searchValue,
              offset: page * 10,
              limit: 10,
            },
          },
          {
            query: TOTAL_MODELS_BY_NAME,
            variables: {
              name: searchValue,
            },
          },
        ],
      });
      setSnackbarSuccess(true);
      setSnackbarMessage("Tag is deleted!");
      setOpenSnackbar(true);
      handleClose();
    } catch (error) {
      console.log(error);
      setSnackbarSuccess(false);
      setSnackbarMessage(`Model is not deleted due to error: ${error}`);
      setOpenSnackbar(true);
    }
  };

  const deleteCurrentModel = async (id: string) => {
    try {
      await deleteModel({
        variables: {
          id: id,
        },
        refetchQueries: [
          {
            query: GET_ALL_MODELS_BY_NAME_WITH_PAGINATION,
            variables: {
              name: searchValue,
              offset: page * 10,
              limit: 10,
            },
          },
          {
            query: TOTAL_MODELS_BY_NAME,
            variables: {
              name: searchValue,
            },
          },
        ],
      });
      setSnackbarSuccess(true);
      setSnackbarMessage("Model is deleted for ever!");
      setOpenSnackbar(true);
      handleClose();
    } catch (error) {
      console.log(error);
      setSnackbarSuccess(false);
      setSnackbarMessage(`Model is not deleted due to error: ${error}`);
      setOpenSnackbar(true);
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
      <Title>All Models</Title>

      <SearchContainer>
        <h2>Search on name:</h2>
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
          data={data.modelsByNameWithPagination}
          columns={columnsModels}
          onCellClick={currentlySelectedRow}
          total={totalData.totalModelsByName}
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
              ? softDeleteCurrentModel
              : deleteCurrentModel
          }
        />
      )}

      {isOpen && (
        <UpdateFormModel
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

      {isOpenCreate && (
        <CreateFormModel
          handleClose={handleClose}
          open={isOpenCreate}
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

export default DashboardModels;
