import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AdminLayout from "../layouts/AdminLayout";
import Table from "../components/dashboard/Table";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  GET_ALL_USERS_BY_LAST_NAME_AND_PROFESSION_WITH_PAGINATION,
  REMOVE_USER,
  SOFT_REMOVE_USER,
  TOTAL_USERS_BY_LAST_NAME_AND_PROFESSION,
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

const token: string = localStorage.getItem("token") || "";
const tokenData = jwt_decode<TokenInfo>(token);

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

const DashboardStaff = () => {
  const [selectedRow, setSelectedRow] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [searchChange, setSearchChange] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(0);
  const [state, dispatch] = React.useReducer(actionReducer, initialState);

  const { data: totalData } = useQuery(
    TOTAL_USERS_BY_LAST_NAME_AND_PROFESSION,
    {
      variables: {
        profession: 1,
        lastName: searchValue,
      },
    }
  );
  const [
    getUsersByLastNameAndProfessionWithPagination,
    { error, loading, data },
  ] = useLazyQuery(GET_ALL_USERS_BY_LAST_NAME_AND_PROFESSION_WITH_PAGINATION);
  const [updateUser] = useMutation(UPDATE_USER);
  const [softDeleteUser] = useMutation(SOFT_REMOVE_USER);
  const [deleteUser] = useMutation(REMOVE_USER);

  useEffect(() => {
    getUsersByLastNameAndProfessionWithPagination({
      variables: {
        profession: 1,
        lastName: searchValue,
        offset: page * 10,
        limit: 10,
      },
    });
  }, [getUsersByLastNameAndProfessionWithPagination, page, searchValue]);

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

    console.log(
      "tag",
      event.target instanceof Element ? event.target.tagName : "nope"
    );
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
      console.log("ano");
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
      console.log("ano");
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
      console.log("ano");
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
            query: GET_ALL_USERS_BY_LAST_NAME_AND_PROFESSION_WITH_PAGINATION,
            variables: {
              lastName: searchValue,
              profession: 1,
              offset: page * 10,
              limit: 10,
            },
          },
          {
            query: TOTAL_USERS_BY_LAST_NAME_AND_PROFESSION,
            variables: {
              lastName: searchValue,
              profession: 1,
            },
          },
        ],
      });
      handleClose();
    } catch (error) {
      console.log(error);
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
            query: GET_ALL_USERS_BY_LAST_NAME_AND_PROFESSION_WITH_PAGINATION,
            variables: {
              lastName: searchValue,
              profession: 1,
              offset: page * 10,
              limit: 10,
            },
          },
          {
            query: TOTAL_USERS_BY_LAST_NAME_AND_PROFESSION,
            variables: {
              lastName: searchValue,
              profession: 1,
            },
          },
        ],
      });
      handleClose();
    } catch (error) {
      console.log(error);
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
            query: GET_ALL_USERS_BY_LAST_NAME_AND_PROFESSION_WITH_PAGINATION,
            variables: {
              lastName: searchValue,
              profession: 1,
              offset: page * 10,
              limit: 10,
            },
          },
          {
            query: TOTAL_USERS_BY_LAST_NAME_AND_PROFESSION,
            variables: {
              lastName: searchValue,
              profession: 1,
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
  };

  return (
    <AdminLayout>
      <Title>All the staff</Title>

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
      {error && <p>{error.message}</p>}
      {data && totalData && (
        <Table
          data={data.usersByLastNameAndProfessionWithPagination}
          columns={tokenData.role === 1 ? columnsSuperUser : columnsUser}
          onCellClick={currentlySelectedRow}
          total={totalData.totalUsersByLastNameAndProfession}
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
    </AdminLayout>
  );
};

export default DashboardStaff;
