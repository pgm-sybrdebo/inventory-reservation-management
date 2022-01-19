import React from 'react'
import styled from "styled-components";
import { ModelCardPic } from '../../interfaces'
import CardBtn from '../CardBtn/CardBtn';
import useStore from '../../store';
import moment from 'moment';
import { useMutation } from '@apollo/client';
import { SOFT_REMOVE_RESERVATION, TAKEN_CONFIRMED, UPDATE_RESERVATION } from '../../graphql/reservations';
import { UPDATE_DEVICE } from '../../graphql/devices';
import { useNavigate } from "react-router-dom";

const ReserveCard : React.FC<ModelCardPic>= ({src, title, start_date, end_date, description, id, deviceId}) => {
  let navigate = useNavigate();
  const store = useStore();
  let dt = Date.now();

  //TAKEN_CONFIRMED

  const [TakenConfirmed] = useMutation(TAKEN_CONFIRMED, {
    onCompleted: (response: any) => {
      
      console.log(response)
      navigate(0)
    },
    onError: (error) => {
      console.log(`GRAPHQL ERROR: ${error.message}`);
    }
  });
  // SOFT_REMOVE_RESERVATION

  const [delete_reservation] = useMutation(SOFT_REMOVE_RESERVATION, {
    onCompleted: (response: any) => {
      
      console.log(response)
      navigate(0)
    },
    onError: (error) => {
      console.log(`GRAPHQL ERROR: ${error.message}`);
    }
  });

  const [UpdateReservation] = useMutation(UPDATE_RESERVATION, {
    onCompleted: (response: any) => {
      
      console.log(response)
    },
    onError: (error) => {
      console.log(`GRAPHQL ERROR: ${error.message}`);
    }
  });

  const [UpdateDevice] = useMutation(UPDATE_DEVICE, {
    onCompleted: (response: any) => {
      console.log(response)
      navigate(0)
    },
    onError: (error) => {
      console.log(`GRAPHQL ERROR: ${error.message}`);
    }
  });

  const handleDelete = () => {
    delete_reservation({ 
      variables: {
        id:id
      }
    })
  }
  const handleConfirm = () => {
    TakenConfirmed({ 
      variables: {
        id:id
      }
    })
  }
  const handleReturn = async()=>{
    await UpdateReservation({
      variables: {
        id:id,
        reservationStateId: "45e2e05a-f498-4be1-9a58-d29219f6bbea",
        end_date: dt
      }
    })

    UpdateDevice({
      variables: {
        id:deviceId,
        deviceStatusId: "ec2ed711-e4a3-42f6-b441-0e91f98f31ba",
        userId: null,
      }
    })
  }
  return(
    <BigCard>
    <div className="bg">
      <img src={src} alt="model" />
    </div>
    <div className="info">
      <div className="top">
        <h2>{title}</h2>
      </div>
      <div className="text">
        <div className="desc">{description}</div>
        <div className="dates">
          <span>Starts on: {moment(start_date!).format("YYYY-MM-DD")}</span>
          <span>Return Before: {moment(end_date!).format("YYYY-MM-DD")}</span>
        </div>
        
        
      </div>
    </div>
    
      {
        (store.selectionReserv==="b89fe2ec-f5b8-4461-943c-15073ac0438a"  && start_date && 
        <div className="btns">
        {start_date <= dt ?
        <CardBtn
          type="button" 
          text="Confirm Taking" 
          name="ct"
          onClick = {()=>{    
            if(window.confirm(`Confirm Taking This Device:  \nName : "${title}"`)){handleConfirm()}}
          }
        />
        :
        <CardBtn
          type="button" 
          text="Delete Reservation" 
          name="dr"
          onClick = {()=>{    
            if(window.confirm(`Confirm Deleting Reservation:  \nName : "${title}"`)){handleDelete()}}
          }
        />
          }
      </div>)
      ||
      (store.selectionReserv==="1d6e3e78-024e-4bed-bc5e-065b6fb7d1c4" &&
      <div className="btns">
      <CardBtn
        type="button" 
        text="Return" 
        name="rt"
        onClick = {()=>{   
          if(window.confirm(`Confirm Returning This Device:  \nName : "${title}"`)){handleReturn()}}
        }
      />
    </div>

    )}
  </BigCard>
  )
}

const BigCard = styled.div`
  width: 100%;
  @media(min-width:500px){
    width: 90%;
    margin-right: 5%;
    margin-left: 5%;
  }
  @media(min-width:650px) and (max-width:1049px){
    width: 48%;
    margin-right: 1%;
  margin-left: 1%;
  }
  @media(min-width:1050px){
    width: 31%;
  margin-right: 1.15%;
  margin-left: 1.15%;
  }
  @media(min-width:1300px){
    width: 23%;
    margin-right: 1%;
  margin-left: 1%;
  }
  height: 320px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, .2);
  border-radius: .25rem;
  margin-bottom:32px ;
  & .bg{
    height: 50%;
    & img{
      width: 100%;
      height: 100%;
      aspect-ratio: 16 / 9;
      border-radius: .25rem .25rem 0 0 ;
      object-fit: cover;
    }
  }
  & .info{
    height: 30%;
    padding: 16px;
    & .text{
      margin-bottom:8px
      display: flex;
      flex-direction: column;
      & .desc{
        margin-top:8px;
      }
      & .dates{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top:8px;
        & span{
          font-size:12px;
          font-weight:600;
        }
      }

    }
    & .top{
     
      & h2{
        font-size:18px;
        font-weight: 600;
        color: #000;
        width: 100%;
      }
      & h6{
        color:#2E3939;
        font-size:16px;
        font-weight:400;
      }
    }

  }
  & .btns{
    padding: 16px 8px;
    height: 20%;
    width: 100%;
    display:flex;
    @media (min-width:375px){
      padding: 16px;
    }

    & button{
      margin-right:8px;
      @media (min-width:375px){
        margin-right:16px;
    }
    }
  }
  
`;

export default ReserveCard
