// import { DataGrid, GridColDef, } from '@material-ui/data-grid';
import { DataGrid } from '@material-ui/data-grid';
import styled from "styled-components";
import { TableProps } from '../../interfaces';

const Container = styled.div`
  margin: 1rem 1.5rem 2rem 1.5rem;
  width: calc(100% - 2rem);
  max-width: 120rem;
  height: calc(100% - 90px);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;




const Table = ({data, columns, onCellClick}: TableProps) => {
  

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
            />
          </>
      </Container>

  );
};

export default Table;

