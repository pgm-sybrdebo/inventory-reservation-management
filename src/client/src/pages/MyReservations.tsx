import React from 'react'
import defaultPicture from '../assets/device.jpg';
import { Container, Header, ListCards, ModelCard, ReserveCard, TopicMyReservation } from '../components'
import { GET_RESERVATIONS_BY_USER_ID_AND_RESERVATIONSTATE_ID } from '../graphql/reservations';
import { useQuery } from '@apollo/client';
import { reservationData, TokenInfo } from '../interfaces';
import jwt_decode from "jwt-decode";
import useStore from '../store';


function MyReservations() {
  const store = useStore();
  const token = localStorage.getItem('token');  
  const userData = jwt_decode<TokenInfo>(token!);

  const { error, loading, data } = useQuery(GET_RESERVATIONS_BY_USER_ID_AND_RESERVATIONSTATE_ID, {
    variables: { 
      userId: userData.sub, 
      reservationStateId: store.selectionReserv
     }
  }); 
  if(loading) {return <div className="loading"><h1 className="loading__text">Loading...</h1></div>}
  if(error) {return <div className="loading"><h1 className="loading__text">Error {error.message}</h1></div>}
  let result ;
  if(data){
    result = data.reservationsByUserIdAndReservationState
  }
  console.log(result);
  return (
    <>
    <Header />
    <TopicMyReservation />
    <Container>
      <h2 style={{marginTop:"32px"}}>{(store.selectionReserv === "b89fe2ec-f5b8-4461-943c-15073ac0438a" && "My Reserved Devices") || (store.selectionReserv === "1d6e3e78-024e-4bed-bc5e-065b6fb7d1c4" ? "My Taken Devices" : "History") }</h2>
      <ListCards>
        {result.map((device: reservationData) => 
          <ReserveCard key={device.id} src={defaultPicture} title={device.device.model.name.slice(0,32)}  description={device.device.id} deviceId={device.device.id} id={device.id} start_date={device.start_date} end_date={device.expected_end_date}/>
        )}
      </ListCards>
    </Container>
    </>
  )
}

export default MyReservations
