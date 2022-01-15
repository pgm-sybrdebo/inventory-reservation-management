import styled from "styled-components";
import AdminLayout from '../layouts/AdminLayout';
import { GridColDef, } from '@material-ui/data-grid';
import Table from "../components/dashboard/Table";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../graphql/users";
import { TokenInfo } from "../interfaces";
import jwt_decode from "jwt-decode";

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

  &:hover {
    background-color: #F58732;
    color: #FFF;
    // border: 1px solid #F58732;

  }
`;

const token:string = localStorage.getItem('token') || ""; 
const tokenData = jwt_decode<TokenInfo>(token);
console.log("data",tokenData);
console.log("token", tokenData.role);
console.log("token", typeof tokenData.role);
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

const columnsSuperUser: GridColDef[] = [
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

  {
    field: "edit",
    headerName: "Edit",
    width: 120,
    renderCell: (params) => {

      return (
        <Button onClick={() => console.log('click')}>
          <BiEdit />
        </Button>
      );
    },
  },
];

{/* <Button type="submit">
<RiDeleteBin6Line />
</Button> */}



const DashboardUsers = () => {

  const { error, loading, data } = useQuery(GET_ALL_USERS);
  if (data) {
    // console.log(data.role);
    // console.log(typeof data.role)
  }

  // if (loading) return 
  // if (error) return <p>{error.message}</p>
  

  return (
    <AdminLayout>
      <Title>All Users</Title>

      {loading && (<p>Loading ...</p>)}
      {error && (<p>{error.message}</p>)}
      {data && <Table  data={data.users} columns={tokenData.role === 1 ? columnsSuperUser : columns} />}


    </AdminLayout>

  )
}

export default DashboardUsers;

