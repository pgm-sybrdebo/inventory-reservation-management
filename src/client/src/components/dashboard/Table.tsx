// import { DataGrid, GridColDef, } from '@material-ui/data-grid';
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import { TableProps } from '../../interfaces';
import { useState, useEffect } from "react";

const Container = styled.div`
  margin: 1rem 1.5rem 2rem 1.5rem;
  width: calc(100% - 2rem);
  max-width: 120rem;
  height: calc(100% - 90px);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;




const Table = ({data, columns, onCellClick, total, dataPage}: TableProps) => {
  console.log(dataPage);

  const [page, setPage] = useState(0);
  // let 
  // if (total) {

  // } 

  useEffect(() => {
    dataPage({
      variables: {
        offset: page * 12,
        limit: 12
      }});
  }, [page])

  const handleChangePage = (event:any, newPage:any) => {
    console.log("changePage");
    console.log("event", event);
    console.log(newPage);
    setPage(event);
  }
  return (
     
      <Container>
          <>
            <DataGrid 
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
          </>
      </Container>

  );
};

export default Table;

