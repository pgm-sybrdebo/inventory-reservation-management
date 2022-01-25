import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AdminLayout from "../layouts/AdminLayout";
import Table from "../components/dashboard/Table";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  GET_ALL_USERS_BY_LAST_NAME_AND_ROLE_WITH_PAGINATION,
  REMOVE_USER,
  SOFT_REMOVE_USER,
  TOTAL_USERS_BY_LAST_NAME_AND_ROLE,
  UPDATE_USER,
} from "../graphql/users";
import { TokenInfo } from "../interfaces";
import jwt_decode from "jwt-decode";
import { GridCellParams, MuiEvent } from "@mui/x-data-grid";
import UpdateFormUser from "../components/dashboard/updateForms/updateFormUser";
import ConfirmDialog from "../components/dashboard/dialogs/ConfirmDialog";
import SearchBar from "material-ui-search-bar";
import Loading from "../components/dashboard/Loading";
import { columnsSuperUser } from "../components/dashboard/columns/columnsSuperUser";
import { columnsUser } from "../components/dashboard/columns/columnUser";
import { Snackbar, Alert } from "@mui/material";

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

const token: string | null = localStorage.getItem("token");
const tokenData = token
  ? jwt_decode<TokenInfo>(token)
  : {
      role: 0,
    };

interface initState {
  action: string;
}

type ActionType =
  | { action: "anonymize" }
  | { action: "softDelete" }
  | { action: "delete" };

const initialState = { action: "" };
function actionReducer(state: initState, action: ActionType): initState {
  switch (action.action) {
    case "anonymize":
      return { action: "anonymize" };
    case "softDelete":
      return { action: "softDelete" };
    case "delete":
      return { action: "delete" };
    default:
      return state;
  }
}

const DashboardAdmins = () => {
  const [selectedRow, setSelectedRow] = useState();
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

  const { data: totalData } = useQuery(TOTAL_USERS_BY_LAST_NAME_AND_ROLE, {
    variables: {
      role: 1,
      lastName: searchValue,
    },
  });
  const [getUsersByLastNameAndRoleWithPagination, { error, loading, data }] =
    useLazyQuery(GET_ALL_USERS_BY_LAST_NAME_AND_ROLE_WITH_PAGINATION);
  const [updateUser] = useMutation(UPDATE_USER);
  const [softDeleteUser] = useMutation(SOFT_REMOVE_USER);
  const [deleteUser] = useMutation(REMOVE_USER);

  useEffect(() => {
    getUsersByLastNameAndRoleWithPagination({
      variables: {
        role: 1,
        lastName: searchValue,
        offset: page * 10,
        limit: 10,
      },
    });
  }, [getUsersByLastNameAndRoleWithPagination, page, searchValue]);

  const currentlySelectedRow = (
    params: GridCellParams,
    event: MuiEvent<React.MouseEvent>
  ) => {
    const { field } = params;

    if (
      field !== "edit" &&
      field !== "anonymize" &&
      field !== "delete" &&
      field !== "softDelete"
    ) {
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
      field === "anonymize" &&
      event.target instanceof Element &&
      (event.target.tagName === "BUTTON" ||
        event.target.tagName === "svg" ||
        event.target.tagName === "path")
    ) {
      setSelectedRow(params.row);
      setIsOpenDialog(true);
      setTitle("Confirm anonymization of this user");
      setMessage("Are you sure you want to anonymize this user?");
      dispatch({ action: "anonymize" });
    } else if (
      field === "softDelete" &&
      event.target instanceof Element &&
      (event.target.tagName === "BUTTON" ||
        event.target.tagName === "svg" ||
        event.target.tagName === "path")
    ) {
      setSelectedRow(params.row);
      setIsOpenDialog(true);
      setTitle("Confirm soft delete of this user");
      setMessage("Are you sure you want to soft delete this user?");
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
      setTitle("Confirm delete of this user");
      setMessage(
        "Are you sure you want to delete this user? The data of this user will be lost for ever."
      );
      dispatch({ action: "delete" });
    }
  };

  const anonymize = async (id: string) => {
    try {
      await updateUser({
        variables: {
          id: id,
          firstName: "Anonymized",
          lastName: "Anonymized",
          email: "Anonymized@gmail.com",
          password: "Anonymized",
        },
        refetchQueries: [
          {
            query: GET_ALL_USERS_BY_LAST_NAME_AND_ROLE_WITH_PAGINATION,
            variables: {
              lastName: searchValue,
              role: 1,
              offset: page * 10,
              limit: 10,
            },
          },
          {
            query: TOTAL_USERS_BY_LAST_NAME_AND_ROLE,
            variables: {
              lastName: searchValue,
              role: 1,
            },
          },
        ],
      });
      setSnackbarSuccess(true);
      setSnackbarMessage("User is anonymized!");
      setOpenSnackbar(true);
      handleClose();
    } catch (error) {
      setSnackbarSuccess(false);
      setSnackbarMessage(`User is not anonymized due to error: ${error}`);
      setOpenSnackbar(true);
    }
  };

  const softDeleteCurrentUser = async (id: string) => {
    try {
      await softDeleteUser({
        variables: {
          id: id,
        },
        refetchQueries: [
          {
            query: GET_ALL_USERS_BY_LAST_NAME_AND_ROLE_WITH_PAGINATION,
            variables: {
              lastName: searchValue,
              role: 1,
              offset: page * 10,
              limit: 10,
            },
          },
          {
            query: TOTAL_USERS_BY_LAST_NAME_AND_ROLE,
            variables: {
              lastName: searchValue,
              role: 1,
            },
          },
        ],
      });
      setSnackbarSuccess(true);
      setSnackbarMessage("User is deleted!");
      setOpenSnackbar(true);
      handleClose();
    } catch (error) {
      setSnackbarSuccess(false);
      setSnackbarMessage(`User is not deleted due to error: ${error}`);
      setOpenSnackbar(true);
    }
  };

  const deleteCurrentUser = async (id: string) => {
    try {
      await deleteUser({
        variables: {
          id: id,
        },
        refetchQueries: [
          {
            query: GET_ALL_USERS_BY_LAST_NAME_AND_ROLE_WITH_PAGINATION,
            variables: {
              lastName: searchValue,
              role: 1,
              offset: page * 10,
              limit: 10,
            },
          },
          {
            query: TOTAL_USERS_BY_LAST_NAME_AND_ROLE,
            variables: {
              lastName: searchValue,
              role: 1,
            },
          },
        ],
      });
      setSnackbarSuccess(true);
      setSnackbarMessage("User is deleted for ever!");
      setOpenSnackbar(true);
      handleClose();
    } catch (error) {
      setSnackbarSuccess(false);
      setSnackbarMessage(`User is not deleted due to error: ${error}`);
      setOpenSnackbar(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsOpenDialog(false);
  };

  return (
    <AdminLayout>
      <Title>All admins</Title>

      <SearchContainer>
        <h2>Search on last name:</h2>
        <SearchBar
          value={searchChange}
          onChange={(newValue) => {
            setSearchChange(newValue);
          }}
          onRequestSearch={() => setSearchValue(searchChange)}
        />
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
          data={data.usersByLastNameAndRoleWithPagination}
          columns={tokenData.role === 2 ? columnsSuperUser : columnsUser}
          onCellClick={currentlySelectedRow}
          total={totalData.totalUsersByLastNameAndRole}
          page={page}
          setPage={setPage}
        />
      )}

      {isOpen && (
        <UpdateFormUser
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

      {isOpenDialog && (
        <ConfirmDialog
          selectedRow={selectedRow}
          title={title}
          message={message}
          open={isOpenDialog}
          handleClose={handleClose}
          handleConfirm={
            state.action === "anonymize"
              ? anonymize
              : state.action === "softDelete"
              ? softDeleteCurrentUser
              : deleteCurrentUser
          }
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

export default DashboardAdmins;
