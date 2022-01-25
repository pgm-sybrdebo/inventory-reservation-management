import React from "react";
import defaultPicture from "../assets/device.jpg";
import {
  Container,
  Header,
  ListCards,
  ModelCard,
  ReserveCard,
  TopicMyReservation,
} from "../components";
import { GET_RESERVATIONS_BY_USER_ID_AND_RESERVATIONSTATE_ID } from "../graphql/reservations";
import { useQuery } from "@apollo/client";
import { reservationData, TokenInfo } from "../interfaces";
import jwt_decode from "jwt-decode";
import useStore from "../store";
import "dotenv/config";

function MyReservations() {
  const store = useStore();
  const token = localStorage.getItem("token");
  const userData = jwt_decode<TokenInfo>(token!);

  const { error, loading, data } = useQuery(
    GET_RESERVATIONS_BY_USER_ID_AND_RESERVATIONSTATE_ID,
    {
      variables: {
        userId: userData.sub,
        reservationStateId: store.selectionReserv,
      },
    }
  );
  if (loading) {
    return (
      <div className="loading">
        <h1 className="loading__text">Loading...</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div className="loading">
        <h1 className="loading__text">Error {error.message}</h1>
      </div>
    );
  }
  let result;
  if (data) {
    result = data.reservationsByUserIdAndReservationState;
  }
  return (
    <>
      <Header />
      <TopicMyReservation />
      <Container>
        <h2 style={{ marginTop: "32px" }}>
          {(store.selectionReserv ===
            `${process.env.REACT_APP_RESERVED_STATE}` &&
            "My Reserved Devices") ||
            (store.selectionReserv === `${process.env.REACT_APP_TAKEN_STATE}`
              ? "My Taken Devices"
              : "History")}
        </h2>
        <ListCards>
          {result.map((device: reservationData) => (
            <ReserveCard
              key={device.id}
              src={defaultPicture}
              title={device.device.model.name.slice(0, 32)}
              description={device.device.id}
              deviceId={device.device.id}
              id={device.id}
              start_date={device.start_date}
              end_date={device.expected_end_date}
            />
          ))}
        </ListCards>
      </Container>
    </>
  );
}

export default MyReservations;
