import { Container, Header, ListCards, ModelCard, Topic } from '../components';
import device from '../assets/device.jpg';
import ReactPaginate from 'react-paginate';
//import defaultPic from '../assets/def.jpg';
import { useLazyQuery, useQuery } from '@apollo/client';
import {GET_MODELS_BY_FILTER_WITH_PAGINATION, GET_TOTAL_MODELS_WITH_FILTER } from '../graphql/models';
import {ModelCardData} from '../interfaces'
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useStore from '../store';
const limitItems = 24;
const defaultPicture = device;


const Models = () => {
  const store = useStore();

  const [pageNumber, setPageNumber] = useState(1)
  const [total, setTotal]=useState(0);
  const {loading:loadinging} = useQuery(GET_TOTAL_MODELS_WITH_FILTER, {
    variables:{ 
      name:store.searchQuery,
      tagIds: store.searchTags,
    },
    onCompleted: (response) => {
      setTotal(Number(response.totalModelsWithFilter[0].total))
    },
    onError: (error) => {
      console.log(`GRAPHQL ERROR: ${error.message}`);
    }
  })
  const [getModels, { error, loading, data}] = useLazyQuery(GET_MODELS_BY_FILTER_WITH_PAGINATION);
  useEffect(() => {
    
    getModels({variables: {
      name:store.searchQuery,
      tagIds: store.searchTags,
      limit: limitItems,
      offset: pageNumber
    }})
  }, [getModels, pageNumber,store.searchQuery, store.searchTags])

  let result;
  //let quantity;
  if (data) {
    result = data.modelsByFilterWithPagination;
  }

  if(loading) {return <div className="loading"><h1 className="loading__text">Loading...</h1></div>}
  if(loadinging) {return <div className="loading"><h1 className="loading__text">Loading...</h1></div>}
  if(error) {return <div className="loading"><h1 className="loading__text">Error {error.message}</h1></div>}


  const changePage = ({ selected }: any) => {
    setPageNumber(selected + 1);
  };
  return (
    <>
      <Header />
      {data && 
      <>
        <Topic quantity={total} />
        <Container>
          <ListCards>
            {result.map((model: ModelCardData) => 
              <ModelCard key={model.id} src={defaultPicture} title={model.name.slice(0,21)} quantity={model.quantity} description={`${model.description.slice(0,42)}...`} id={model.id}/>
            )}
          </ListCards>
          {total > limitItems && 
          <StyledPaginateContainer>
          <ReactPaginate 
              previousLabel={"Back"}
              nextLabel={"Next"}
              pageCount={Math.ceil((total / limitItems))}
              pageRangeDisplayed={0}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
              forcePage={pageNumber-1}
            />
            </StyledPaginateContainer>
          }
        </Container>
      </>
      }
    </>

  )
}

const StyledPaginateContainer = styled.div`
  .paginationBttns {
    list-style: none;
    margin: 1rem 0 3rem 0;
    display: flex;
    width: 90%;
    justify-content: center;
    flex-wrap: wrap;

  }
  .paginationBttns li {
    margin: 1.5rem 0;
  }
  .paginationBttns a {
    padding: 0.5rem;
    margin: 0.5rem;
    border-radius: 3px;
    border: 1px solid #F58732;
    color: black;
    cursor: pointer;
    @media (min-width: 62rem) {
      padding: 1rem; 
    }
  }
  .paginationBttns a:hover {
    background-color: #ED1534;
    color: black;
  }
  .paginationActive a {
    background-color: #ED1534 !important;
    color: #fff !important;
    border-color: #ED1534 !important;
  }
  .paginationDisabled a {
    color: transparent;
    background-color: transparent;
    &:hover {
      color: black;
      background-color: transparent;
    }
  }
`;
export default Models
