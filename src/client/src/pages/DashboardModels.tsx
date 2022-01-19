import React, { useState, useReducer, useEffect } from 'react';
import styled from "styled-components";
import AdminLayout from '../layouts/AdminLayout';
import Table from "../components/dashboard/Table";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GridCellParams, MuiEvent } from "@mui/x-data-grid";
import ConfirmDialog from '../components/dashboard/dialogs/ConfirmDialog';
import SearchBar from 'material-ui-search-bar';
import Loading from '../components/dashboard/Loading';
import { Button } from '@material-ui/core';
import { columnsModels } from '../components/dashboard/columns/columnsModel';
import { GET_ALL_MODELS_BY_NAME_WITH_PAGINATION, REMOVE_MODEL, SOFT_REMOVE_MODEL, TOTAL_MODELS_BY_NAME, UPDATE_MODEL } from '../graphql/models';


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
  action: string
}


type ActionType = 
  | { action: "softDelete" }
  | { action: "delete" }

const initialState = { action: "" }
function actionReducer (state: initState, action: ActionType): initState {
  switch (action.action) {
    case 'softDelete':
      return { action: "softDelete" };
    case 'delete':
      return { action: "delete" };
    default:
      return state;  
  }
}


const DashboardModels = () => {
  const [selectedRow, setSelectedRow] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [searchChange, setSearchChange] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(0);
  const [state, dispatch] = React.useReducer(actionReducer, initialState);

  const {data: totalData} = useQuery(TOTAL_MODELS_BY_NAME, {
    variables: {
      name: searchValue
    }
  });
  const [getModelsByNameWithPagination, { error, loading, data }] = useLazyQuery(GET_ALL_MODELS_BY_NAME_WITH_PAGINATION);
  const [updateModel] = useMutation(UPDATE_MODEL);
  const [softDeleteModel] = useMutation(SOFT_REMOVE_MODEL);
  const [deleteModel] = useMutation(REMOVE_MODEL);

  useEffect(() => {
    getModelsByNameWithPagination({
      variables: {
        name: searchValue,
        offset: page * 10,
        limit: 10
      }
    })

  }, [page, searchValue])

  const currentlySelectedRow = (
    params: GridCellParams,
    event: MuiEvent<React.MouseEvent>
  ) => {
    const { field } = params;

    if (field !== "edit" && field !== "delete" && field !== "softDelete" ) {
      return;
    }

    console.log("tag", event.target instanceof Element ? event.target.tagName : "nope")
    if (field === "edit" && event.target instanceof Element && (event.target.tagName === "BUTTON" || event.target.tagName === "svg" || event.target.tagName === "path")) {
      setSelectedRow(params.row);
      setIsOpen(true);
    } else if (field === "softDelete" && event.target instanceof Element && (event.target.tagName === "BUTTON" || event.target.tagName === "svg" || event.target.tagName === "path")){
      console.log("ano");
      setSelectedRow(params.row);
      setIsOpenDialog(true);
      setTitle("Confirm soft delete of this model");
      setMessage("Are you sure you want to soft delete this model?");
      dispatch({ action: "softDelete" })
    } else if (field === "delete" && event.target instanceof Element && (event.target.tagName === "BUTTON" || event.target.tagName === "svg" || event.target.tagName === "path")){
      console.log("ano");
      setSelectedRow(params.row);
      setIsOpenDialog(true);
      setTitle("Confirm delete of this model");
      setMessage("Are you sure you want to delete this model? The data of this model will be lost for ever.");
      dispatch({ action: "delete" })
    }
  };

  const softDeleteCurrentModel = async (id:string) => {
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
              limit: 10
            }
          },
          {
            query: 
            TOTAL_MODELS_BY_NAME,
            variables: {
              name: searchValue,
            }
          }
        ]
      });
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  const deleteCurrentModel = async (id:string) => {
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
              limit: 10
            }
          },
          {
            query: 
            TOTAL_MODELS_BY_NAME,
            variables: {
              name: searchValue,
            }
          }
        ]
      });
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleClose = () => {
    console.log("close");
    setIsOpen(false);
    setIsOpenDialog(false);
    setIsOpenCreate(false);
  }


  return (
    <AdminLayout>
      <Title>All Models</Title>

      <SearchContainer>
        <h2>Search on name:</h2>
        <SearchButtonContainer>  
          <SearchBar
            value={searchChange}
            onChange={(newValue) => {
              setSearchChange(newValue)
            }}
            onRequestSearch={() => setSearchValue(searchChange)}
          />
          <Button
            variant='contained'
            size='large'
            onClick={() => setIsOpenCreate(true)}
            style={{
              backgroundColor: '#F58732',
            }}
          >Create</Button>
        </SearchButtonContainer>
      </SearchContainer>

      {loading && (<Loading />)}
      {error && (<p>{error.message}</p>)}
      {data && totalData && <Table  data={data.modelsByNameWithPagination} columns={ columnsModels} onCellClick={currentlySelectedRow} total={totalData.totalModelsByName}
      page={page}
      setPage={setPage}
      />}

      {isOpenDialog && (
        <ConfirmDialog
          selectedRow={selectedRow}
          title={title}
          message={message}
          open={isOpenDialog}
          handleClose={handleClose}
          handleConfirm={ state.action === 'softDelete' ? softDeleteCurrentModel : deleteCurrentModel}
        />
      )}

    </AdminLayout>
  )
}

export default DashboardModels
