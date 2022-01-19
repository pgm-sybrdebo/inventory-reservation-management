import React from 'react'
import { Container, Header } from '../components'
import { GET_RESERVATIONS_BY_USER_ID_AND_RESERVATIONSTATE_ID } from '../graphql/reservations';
import {useMutation } from '@apollo/client';
function MyReservations() {
  const [UpdateReservation] = useMutation(GET_RESERVATIONS_BY_USER_ID_AND_RESERVATIONSTATE_ID, {
    onCompleted: (response: any) => {
      
      console.log(response)
    },
    onError: (error) => {
      console.log(`GRAPHQL ERROR: ${error.message}`);
    }
  });

  return (
    <>
    <Header />
    <Container>
      <h2>My reservations</h2>
    </Container>
    </>
  )
}

export default MyReservations
