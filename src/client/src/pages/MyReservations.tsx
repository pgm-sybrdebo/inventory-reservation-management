import React from 'react'
import { Container, Header, TopicMyReservation } from '../components'
import { GET_RESERVATIONS_BY_USER_ID_AND_RESERVATIONSTATE_ID } from '../graphql/reservations';
import { useQuery } from '@apollo/client';
import { TokenInfo } from '../interfaces';
import jwt_decode from "jwt-decode";
import useStore from '../store';


function MyReservations() {
  const store = useStore();
  const token = localStorage.getItem('token');  
  const userData = jwt_decode<TokenInfo>(token!);
  const { loading } = useQuery(GET_RESERVATIONS_BY_USER_ID_AND_RESERVATIONSTATE_ID, {
    variables: { 
      userId: userData.sub, 
      reservationStateId: store.selectionReserv
     },
    onCompleted: (response: any) => {
      console.log(response);
    },
    onError: (error) => {
      console.log(`GRAPHQL ERROR: ${error.message}`);
    }
  }); 
  if(loading) {return <div className="loading"><h1 className="loading__text">Loading...</h1></div>}
  return (
    <>
    <Header />
    <TopicMyReservation />
    <Container>
      <h2 style={{marginTop:"32px"}}>{store.selectionReserv === "b89fe2ec-f5b8-4461-943c-15073ac0438a" ? "My Reserved Devices" : (store.selectionReserv === "1d6e3e78-024e-4bed-bc5e-065b6fb7d1c4" ? "My Taken Devices" : "History") }</h2>
    </Container>
    </>
  )
}

export default MyReservations
