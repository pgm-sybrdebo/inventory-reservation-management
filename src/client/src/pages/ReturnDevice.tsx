import React from 'react'
import { Container, GeneralList, Header, ModelImage } from '../components';
import device from '../assets/device.jpg';
import { useParams } from 'react-router-dom';
import {  useQuery } from '@apollo/client';
import {GET_DEVICE_BY_ID} from '../graphql/devices';

import DeviceInfo from '../components/DeviceInfo/DeviceInfo';
import { UPDATE_RESERVATION } from '../graphql/reservations';

function ReturnDevice() {
  let { id } = useParams();

  const { loading, error, data } = useQuery(GET_DEVICE_BY_ID, {
    variables: { id },
  });
  if(loading) {return <div className="loading"><h1 className="loading__text">Loading...</h1></div>}
  if(error) {return <div className="loading"><h1 className="loading__text">Error {error.message}</h1></div>}
  let result;
  if(data){
    result = data.getDeviceById;
  }

  return (
    
    <>
    <Header />
    <Container>
      <GeneralList>
        <ModelImage src={device}/>
        <DeviceInfo name={result.model.name} description={result.model.description} damages={result.damages}/>
      </GeneralList>
    </Container>
  </>

  )
}

export default ReturnDevice
