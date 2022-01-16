import { useState } from 'react';
import styled from "styled-components";
import AdminLayout from '../layouts/AdminLayout';
import { GridColDef, } from '@material-ui/data-grid';
import Table from "../components/dashboard/Table";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_USERS, UPDATE_USER } from "../graphql/users";
import { TokenInfo } from "../interfaces";
import jwt_decode from "jwt-decode";
import { GridCellParams, MuiEvent } from "@mui/x-data-grid";
import UpdateFormUser from '../components/dashboard/updateForms/UpdateFormUser';
import { Delete, DeleteForever, VisibilityOff } from '@material-ui/icons';
import ConfirmDialog from '../components/dashboard/dialogs/ConfirmDialog';


const Title = styled.h1`
  margin: 1.5rem;
`;

// const Actions = styled.div`
//   display: flex;
//   justify-content: space-between;
//   width: 100%;
// `;

const Button = styled.button`
  width: 2rem;
  height: 2rem;
  min-width: 2rem;
  min-height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #CBBEC5;
  border: 1px solid #CBBEC5;
  background-color: transparent;
  color: #F58732;
  border: 1px solid #F58732;
  border-radius: 3px;
  cursor:pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  margin: 0 auto;

  &:hover {
    background-color: #F58732;
    color: #FFF;
    // border: 1px solid #F58732;

  }
`;

const token:string = localStorage.getItem('token') || ""; 
const tokenData = jwt_decode<TokenInfo>(token);



const columns: GridColDef[] = [
  { field: "firstName", headerName: "First name", width: 200 },
  { field: "lastName", headerName: "Last name", width: 200 },
  { field: "email", headerName: "Email", width: 300 },
  { 
    field: "profession", 
    headerName: "Profession", 
    width: 150,
    renderCell: (params) => {
      return (
        <span>{params.row.profession === 0 ? "Student" : "Staff"}</span>
      )
    }
  },
  { 
    field: "role", 
    headerName: "Role", 
    width: 150,
    renderCell: (params) => {
      return (
        <span>{params.row.role === 0 ? "User" : "Admin"}</span>
      )
    }
  },
];



{/* <Button type="submit">
<RiDeleteBin6Line />
</Button> */}



const DashboardUsers = () => {
  const [selectedRow, setSelectedRow] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const { error, loading, data } = useQuery(GET_ALL_USERS);
  const [updateUser] = useMutation(UPDATE_USER);



  const columnsSuperUser: GridColDef[] = [
    { field: "firstName", headerName: "First name", width: 200 },
    { field: "lastName", headerName: "Last name", width: 200 },
    { field: "email", headerName: "Email", width: 300 },
    {field: "cardNumber", headerName:"Card number", width: 200},
    { 
      field: "profession", 
      headerName: "Profession", 
      width: 150,
      renderCell: (params) => {
        return (
          <span>{params.row.profession === 0 ? "Student" : "Staff"}</span>
        )
      }
    },
    { 
      field: "role", 
      headerName: "Role", 
      width: 150,
      renderCell: (params) => {
        return (
          //<span>{params.row.role === 0 ? "User" : "Admin"}</span>
          <span>{ params.row.role === 0 ? "User" : params.row.role === 1 ? "Admin" : "Super admin"}</span>
        )
      }
    },
  
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
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
      field: "anonymize",
      headerName: "Anonymize",
      width: 100,
      sortable: false,
      renderCell: (params) => {
  
        return (
          <Button>
            <VisibilityOff />
          </Button>
        );
      },
    },
    {
      field: "softDelete",
      headerName: "Soft Delete",
      width: 100,
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
      width: 100,
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





  const currentlySelectedRow = (
    params: GridCellParams,
    event: MuiEvent<React.MouseEvent>
  ) => {
    const { field } = params;

    if (field !== "edit" && field !== "anonymize") {
      return;
    }

    console.log("tag", event.target instanceof Element ? event.target.tagName : "nope")
    if (field === "edit" && event.target instanceof Element && (event.target.tagName === "BUTTON" || event.target.tagName === "svg" || event.target.tagName === "path")) {
      setSelectedRow(params.row);
      setIsOpen(true);
    } else if (field === "anonymize" && event.target instanceof Element && (event.target.tagName === "BUTTON" || event.target.tagName === "svg" || event.target.tagName === "path")){
      console.log("ano");
      setSelectedRow(params.row);
      setIsOpenDialog(true);
      setTitle("Confirm anonymization of this user");
      setMessage("Are you sure you want to anonymize this user?")
    }
  };



  const anonymize = async (id:string) => {
    try {
      console.log("update ano");
      console.log("iddddd",id);
      await updateUser({
        variables: {
          id: id,
          firstName: "Anonymized",
          lastName: "Anonymized",
          email: "Anonymized@gmail.com",
          password: "Anonymized"
        }, 
        refetchQueries: [
          {
            query: GET_ALL_USERS
          }
        ]
      });
      console.log("done");
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }


  

  // if (loading) return 
  // if (error) return <p>{error.message}</p>
  
  const handleClose = () => {
    console.log("close");
    setIsOpen(false);
    setIsOpenDialog(false);
  }

  return (
    <AdminLayout>
      <Title>All Users</Title>

      {loading && (<p>Loading ...</p>)}
      {error && (<p>{error.message}</p>)}
      {data && <Table  data={data.users} columns={tokenData.role === 1 ? columnsSuperUser : columns} onCellClick={currentlySelectedRow}/>}


      {isOpen && (
        <UpdateFormUser
          selectedRow={selectedRow}
          handleClose={handleClose}
          open={isOpen}
        />
      )}

      {isOpenDialog && (
        <ConfirmDialog
          selectedRow={selectedRow}
          title={title}
          message={message}
          open={isOpenDialog}
          handleClose={handleClose}
          // @ts-ignore
          handleConfirm={anonymize}
        />
      )}


    </AdminLayout>

  )
}

export default DashboardUsers;

