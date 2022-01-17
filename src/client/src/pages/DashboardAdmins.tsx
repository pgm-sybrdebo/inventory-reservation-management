import styled from "styled-components";
import AdminLayout from '../layouts/AdminLayout';
import { GridColDef} from '@mui/x-data-grid';
import Table from "../components/dashboard/Table";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS_BY_ROLE } from "../graphql/users";

const Title = styled.h1`
  margin: 1.5rem;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

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
  {
    field: "action",
    headerName: "Action",
    width: 120,
    renderCell: (params) => {

      return (
        <Actions>
        
            <Button onClick={() => console.log('click')}>
              <BiEdit />
            </Button>

         
            <Button type="submit">
                <RiDeleteBin6Line />
              </Button>
            
        </Actions>
      );
    },
  },
];



const DashboardAdmins = () => {

  const { error, loading, data } = useQuery(GET_ALL_USERS_BY_ROLE, {
    variables: {
      role: 1
    }
  });
  if (data) {
    console.log(data);
  }

  // if (loading) return 
  // if (error) return <p>{error.message}</p>
  

  return (
    <AdminLayout>
      <Title>All admins</Title>

      {loading && (<p>Loading ...</p>)}
      {error && (<p>{error.message}</p>)}
      {data && <Table  data={data.usersByRole} columns={columns} />}


    </AdminLayout>

  )
}

export default DashboardAdmins;

