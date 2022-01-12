import { useQuery } from '@apollo/client';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Container, Header, ListCards, StyledDeviceCard } from '../components'
import { GET_DEVICES_BY_MODELID } from '../graphql/devices';

function Devices() {
  const [responseError, setResponseError] =useState('');
  let { modelId } = useParams();
  console.log(modelId)
  const { loading} = useQuery(GET_DEVICES_BY_MODELID, {
    fetchPolicy: "network-only",
    variables:{ modelId: modelId },
    onCompleted: (response) => {
      console.log(response);
    },
    onError: (error) => {
      console.log(`GRAPHQL ERROR: ${error.message}`);
      setResponseError(error.message)
    }
  });

  if(loading) {return <div className="loading"><h1 className="loading__text">Loading...</h1></div>}
  if(responseError) {return <div className="loading"><h1 className="loading__text">{responseError}</h1></div>}

  return (
    <>
      <Header />
      <Container>
        <ListCards>
          <StyledDeviceCard availability="In Stock" deviceId="123456" backgroundcolor="#F58732" onClick={()=> console.log("clicked")}/>
          <StyledDeviceCard availability="In Stock" deviceId="123456" backgroundcolor="#F58732" onClick={()=> console.log("clicked")}/>
          <StyledDeviceCard availability="In Stock" deviceId="123456" backgroundcolor="#F58732" onClick={()=> console.log("clicked")}/>
          <StyledDeviceCard availability="In Stock" deviceId="123456" backgroundcolor="#F58732" onClick={()=> console.log("clicked")}/>
          <StyledDeviceCard availability="In Stock" deviceId="123456" backgroundcolor="#F58732" onClick={()=> console.log("clicked")}/>
          <StyledDeviceCard availability="In Stock" deviceId="123456" backgroundcolor="#F58732" onClick={()=> console.log("clicked")}/>

          <StyledDeviceCard availability="In Stock" deviceId="123456" backgroundcolor="#F58732" onClick={()=> console.log("clicked")}/>
          <StyledDeviceCard availability="In Stock" deviceId="123456" backgroundcolor="#F58732" onClick={()=> console.log("clicked")}/>
          <StyledDeviceCard availability="In Stock" deviceId="123456" backgroundcolor="#F58732" onClick={()=> console.log("clicked")}/>
          <StyledDeviceCard availability="In Stock" deviceId="123456" backgroundcolor="#F58732" onClick={()=> console.log("clicked")}/>
          <StyledDeviceCard availability="In Stock" deviceId="123456" backgroundcolor="#F58732" onClick={()=> console.log("clicked")}/>
          <StyledDeviceCard availability="In Stock" deviceId="123456" backgroundcolor="#F58732" onClick={()=> console.log("clicked")}/>
        </ListCards>
      </Container>
    </>
  )
}

export default Devices
