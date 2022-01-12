import { useQuery } from '@apollo/client';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Container, Header, ListCards, StyledDeviceCard, TopicDevices } from '../components'
import { GET_DEVICES_BY_MODELID_WITH_PAGINATION } from '../graphql/devices';
import { ModelDeviceData, TokenInfo } from '../interfaces';
import jwt_decode from "jwt-decode"
import { GET_MODEL_BY_ID } from '../graphql/models';


function Devices() {
  const token = localStorage.getItem('token'); 
  const data = jwt_decode<TokenInfo>(token!);
  const currentUserId = data.sub;
  console.log(currentUserId)

  const [responseError, setResponseError] =useState('');
  let { modelId } = useParams();
  const [items, setItems] = useState([]);
  console.log(modelId)

  const {data:modelById} = useQuery(GET_MODEL_BY_ID, {
    variables: {id: modelId}
  })
  const title = (modelById ? modelById.model.name : "no data ");

  const { loading } = useQuery(GET_DEVICES_BY_MODELID_WITH_PAGINATION, {
    variables:{ modelId: modelId, offset: 1, limit: 24 },
    onCompleted: (response) => {
      const devices = response.getDevicesByModelIdWithPagination;
      setItems(devices);
    },
    onError: (error) => {
      console.log(`GRAPHQL ERROR: ${error.message}`);
      setResponseError(error.message)
    }
  });
  console.log(items)
  if(loading) {return <div className="loading"><h1 className="loading__text">Loading...</h1></div>}
  if(responseError) {return <div className="loading"><h1 className="loading__text">{responseError}</h1></div>}
 
  return (
    <>
      <Header />
      <TopicDevices title={title ? title : "Loading..."}/>
      <Container>
        <ListCards>
        {items.map((device : ModelDeviceData)  => 
          <StyledDeviceCard key={device.id} availability={(device.userId === null && "In Stock" )|| (device.userId === currentUserId ? "With Me" : "Out Of Stock")} deviceId={device.id} backgroundcolor={(device.userId === null && "#5AB946" )|| (device.userId === currentUserId ? "#00A5D9" : "#ED1534")} onClick={()=> console.log("clicked")}/>
          )}
        </ListCards>
      </Container>
    </>
  )
}

export default Devices
