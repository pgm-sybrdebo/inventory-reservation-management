import styled from "styled-components";
import AdminLayout from '../layouts/AdminLayout';
import { GridColDef } from '@material-ui/data-grid';
import Table from "../components/dashboard/Table";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { useQuery } from "@apollo/client";
//import { GET_ALL_USERS_BY_ROLE } from "../graphql/users";
// import { GET_ALL_DEVICES, GET_ALL_IN_CHECK_DEVICES } from "../graphql/devices";
import { GET_ALL_IN_CHECK_DEVICES } from "../graphql/devices";

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

const Description = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
`;


const columns: GridColDef[] = [
  { 
    field: "name", 
    headerName: "Name", 
    width: 200,
    renderCell: (params) => {
      return (
        <span>{params.row.model.name}</span>
      )
    }
  },
  { 
    field: "brand", 
    headerName: "Brand", 
    width: 150,
    renderCell: (params) => {
      return (
        <span>{params.row.model.brand}</span>
      )
    }
  },
  { 
    field: "description", 
    headerName: "Description", 
    width: 200,
    renderCell: (params) => {
      return (
        <Description>{params.row.model.description}</Description>
      )
    }
  },
  { 
    field: "specifications", 
    headerName: "Specifications", 
    width: 200,
    renderCell: (params) => {
      return (
        <span>{params.row.model.specifications}</span>
      )
    }
  },
  { 
    field: "max_reservation_time", 
    headerName: "Max reservation time", 
    width: 150,
    renderCell: (params) => {
      return (
        <span>{params.row.model.max_reservation_time}</span>
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



const DashboardInCheckDevices = () => {

  const { error, loading, data } = useQuery(GET_ALL_IN_CHECK_DEVICES);
  if (data) {
    console.log(data);
  }

  // if (loading) return 
  // if (error) return <p>{error.message}</p>
  

  return (
    <AdminLayout>
      <Title>Devices in Check</Title>

      {loading && (<p>Loading ...</p>)}
      {error && (<p>{error.message}</p>)}
      {data && <Table  data={data.inCheckDevices} columns={columns} />}


    </AdminLayout>

  )
}

export default DashboardInCheckDevices;

