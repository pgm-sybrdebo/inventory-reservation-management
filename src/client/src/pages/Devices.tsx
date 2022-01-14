import { useQuery, useLazyQuery } from '@apollo/client';
import React, { useState,  useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Header, ListCards, StyledDeviceCard, TopicDevices } from '../components'
import { GET_DEVICES_BY_MODELID_WITH_PAGINATION, GET_DEVICES_TOTAL_BY_MODELID } from '../graphql/devices';
import { ModelDeviceData, TokenInfo } from '../interfaces';
import jwt_decode from "jwt-decode"
import { GET_MODEL_BY_ID } from '../graphql/models';
import styled from 'styled-components';
const limitItems = 24;

function Devices() {
  let navigate = useNavigate();
  let { modelId } = useParams();
  const [pageNumber, setPageNumber] = useState(1)
  const [total, setTotal]=useState(0);
  const token = localStorage.getItem('token'); 
  const data = jwt_decode<TokenInfo>(token!);
  const currentUserId = data.sub;
  const [selection, setSelection] = useState('all');

  const {data:modelById} = useQuery(GET_MODEL_BY_ID, {
    variables: {id: modelId}
  })
  const title = (modelById ? modelById.model.name : "no data ");

  const {loading:loadinging} = useQuery(GET_DEVICES_TOTAL_BY_MODELID, {
    variables:{ 
      modelId: modelId
    },
    onCompleted: (response) => {
      setTotal(Number(response.totalDevicesByModelId[0].total))
    },
    onError: (error) => {
      console.log(`GRAPHQL ERROR: ${error.message}`);
    }
  })

  const [getDevices, { error, loading, data:devPag}] = useLazyQuery(GET_DEVICES_BY_MODELID_WITH_PAGINATION);
  useEffect(() => {
    
    getDevices({variables: {
      modelId: modelId,
      limit: limitItems,
      offset: pageNumber
    }})
  }, [getDevices, modelId, pageNumber])

  let result;
  //let quantity;
  if (devPag) {
    result = devPag.getDevicesByModelIdWithPagination;
    if(selection && selection === 'all'){
      result = devPag.getDevicesByModelIdWithPagination;
    }else if(selection && selection === 'inStock'){
      result = devPag.getDevicesByModelIdWithPagination.filter((i: { userId: null | string; }) => i.userId === null)
    }else if(selection && selection === 'outOfStock'){
      result = devPag.getDevicesByModelIdWithPagination.filter((i: { userId: null | string; }) => i.userId !== currentUserId && i.userId !== null)
    }
    else if(selection && selection === 'withMe'){
      result = devPag.getDevicesByModelIdWithPagination.filter((i: { userId: null | string; }) => i.userId === currentUserId)
    }
  }

  if(loading) {return <div className="loading"><h1 className="loading__text">Loading...</h1></div>}
  if(loadinging) {return <div className="loading"><h1 className="loading__text">Loading...</h1></div>}

  if(error) {return <div className="loading"><h1 className="loading__text">{error.message}</h1></div>}

  const changePage = ({ selected }: any) => {
    setPageNumber(selected + 1);
  };
  console.log(devPag)
  console.log(selection)
  return (
    <>
      <Header />
      <TopicDevices title={title ? title : "Loading..."} setSelection={setSelection} selection={selection}/>
      {devPag && 
      <Container>
        <ListCards>
        {result.map((device : ModelDeviceData)  => 
          <StyledDeviceCard 
            key={device.id} 
            availability={(device.userId === null && "In Stock" )|| (device.userId === currentUserId ? "With Me" : "Out Of Stock")} 
            deviceId={device.id} backgroundcolor={(device.userId === null && "#5AB946" )|| (device.userId === currentUserId ? "#00A5D9" : "#ED1534")} 
            onClick={()=>{
              if(device.userId === currentUserId){
                navigate(`/device/return/${device.id}`);
              }else{
                navigate(`/device/take-or-reserve/${device.id}`)
              }
            }}/>
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
    color: #fff;
  }
  .paginationActive a {
    background-color: #ED1534 !important;
    color: #fff !important;
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
export default Devices
