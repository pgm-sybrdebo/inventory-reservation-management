// import { DataGrid, GridColDef, } from '@material-ui/data-grid';
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import { TableProps } from '../../interfaces';
import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_USERS_WITH_PAGINATION } from "../../graphql/users";

const Container = styled.div`
  margin: 1rem 1.5rem 2rem 1.5rem;
  width: calc(100% - 2rem);
  max-width: 120rem;
  height: calc(100% - 90px);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;




const Table = ({data, columns, onCellClick, total, dataPage, onPageChange}: TableProps) => {
  // console.log(dataPage);
  //console.log("total", total)

  const [page, setPage] = useState(0);

  useEffect(() => {
    if(typeof onPageChange === 'function') {
      onPageChange(page);
    }
  }, [page]);


  // useEffect(() => {
  //   // dataPage({
  //   //   variables: {
  //   //     offset: page * 12,
  //   //     limit: 12
  //   //   }});
  //   getUsersByPagination({
  //     variables: {
  //       offset: page * 12,
  //       limit: 12
  //     }
  //   })

  //   // dat = data.usersWithPagination
  // }, [page])


  // const [getUsersByPagination, { error:errorPagination, loading:loadingPagination, data:dataPagination }] = useLazyQuery(GET_ALL_USERS_WITH_PAGINATION);

  const handleChangePage = (event:any, newPage:any) => {
    console.log("changePage");
    console.log("event", event);
    setPage(event);
  }
  return (
     
      <Container>
          <>
            {/* {dataPagination &&  */}
            <DataGrid 
              // rows={dataPagination.usersWithPagination} 
              rows={data} 
              columns={columns} 
              pageSize={12} 
              checkboxSelection 
              disableSelectionOnClick
              onCellClick={onCellClick}
              page={page}
              paginationMode="server"
              rowCount={total}
              onPageChange={handleChangePage}
            />
            {/* } */}
          </>
      </Container>

  );
};

export default Table;

