import React, { useState } from 'react'
import styled from "styled-components";
import StyledButton from '../Button/StyledButton.style';
import { useNavigate } from "react-router-dom";
import {InfoDevice, TokenInfo} from '../../interfaces'
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_DEVICE_BY_ID, UPDATE_DEVICE } from '../../graphql/devices';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CREATE_RESERVATION } from '../../graphql/reservations';
//import { addDays } from "date-fns";
import jwt_decode from "jwt-decode"
import moment from 'moment';


const DeviceInfoReserve: React.FC<InfoDevice> = ({name, description , damages}) => { 
  let dt = Date.now();
  const token = localStorage.getItem('token');  
  const userData = jwt_decode<TokenInfo>(token!);

  const [UpdateDevice] = useMutation(UPDATE_DEVICE, {
    onCompleted: (response: any) => {
      console.log(response)
      navigate(-1)
    },
    onError: (error) => {
      console.log(`GRAPHQL ERROR: ${error.message}`);
    }
  });
  
  const [CreatReservation] = useMutation(CREATE_RESERVATION, {
    onCompleted: (response: any) => {
      
      console.log(response)
    },
    onError: (error: { message: string; }) => {
      console.log(`GRAPHQL ERROR: ${error.message}`);
    }
  });
  const getDaysArray = (start: number, end: number) => {
    for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
};
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates: any[]) => {
    const [start, end] = dates;
    if(start){
      setStartDate(start);
    }
    if(end){
      setEndDate(end);
    }
  };
  let navigate = useNavigate();
  let { id } = useParams();
  const { loading, error, data } = useQuery(GET_DEVICE_BY_ID, {
    variables: { id },
  });
  if(loading) {return <div className="loading"><h1 className="loading__text">Loading...</h1></div>}
  if(error) {return <div className="loading"><h1 className="loading__text">Error {error.message}</h1></div>}
  let result;
  let datesToExclude: any[] = [];
  if(data){
    result = data.getDeviceById;
    result.reservations.map((r: { start_date: number; expected_end_date: number; }) => {
      return datesToExclude.push(getDaysArray(r.start_date, r.expected_end_date));
    });
  }
  console.log("s",Date.parse(startDate!))
  console.log("d",dt)
  console.log(datesToExclude);

  
  const handleCreateFuture = async() => {
    await CreatReservation({
      variables:{
        deviceId: id,
        reservationStateId: "b89fe2ec-f5b8-4461-943c-15073ac0438a",
        userId: userData.sub,
        start_date: moment(startDate!).format("YYYY-MM-DD HH:mm:ss.SSS"),
        expected_end_date: moment(endDate!).format("YYYY-MM-DD HH:mm:ss.SSS")
      }
    })
    navigate(-1)
  }
  const handleCreateNow = async() => {
    await CreatReservation({
      variables:{
        deviceId: id,
        reservationStateId: "b89fe2ec-f5b8-4461-943c-15073ac0438a",
        userId: userData.sub,
        start_date: moment(startDate!).format("YYYY-MM-DD HH:mm:ss.SSS"),
        expected_end_date: moment(endDate!).format("YYYY-MM-DD HH:mm:ss.SSS")
      }
    })
    UpdateDevice({
      variables: {
        id:id,
        userId: userData.sub,
      }
    })
  }
  console.log(moment(startDate!).format("YYYY-MM-DD HH:mm:ss.SSS"))
  return(
    <Wrapper>
      <div className="topic">
        <h2>{name}</h2>
        <h6>{id}</h6>
      </div>
      <div className="desc">
        <h4>Description</h4>
        <p>{description}</p>
      </div>
      <div className="extra">
        <div className="speces">
          <h4>Damages</h4>
          <ul>
            {damages.map((damage, index) => <li key={index} className="spec">{damage.title}: {damage.description}</li>)}
          </ul>
        </div>
      </div>
      <DatePicker
        //dateFormat="yyyy-mm-dd HH:mm:ss.SSS"
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        excludeDates={datesToExclude.flat()}
        selectsRange
        placeholderText="Start Date - End Date"
        closeOnScroll={true}
        minDate={new Date()}
      />
      <div className="btns">
          <StyledButton 
            type="button" 
            text="Cancel" 
            color="white"
            width="48%"
            backgroundcolor="#ED1534"
            radius=".25rem"
            onClick = {()=> navigate(-1)}
          />
          <StyledButton 
            type="button" 
            text="Apply" 
            color="white"
            width="48%"
            backgroundcolor="#F58732"
            radius=".25rem"
            onClick = {()=>{
              if(Date.parse(startDate!) <= dt){
                handleCreateNow()
              }else{
                handleCreateFuture()
              }
            }}
          />
        </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    width: 100%;
    & .topic{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      margin-bottom: 16px;
      & h2{
        font-size:21px;
        font-weight: 700;
        color: #000;
        margin-bottom:8px;
      }
      & h6{
        font-size:16px;
        font-weight:400;
        color: #2E3939;
        font-style: italic;
      }
    }

    & .desc{
      margin-bottom: 12px;
      & h4{
        font-size:18px;
        font-weight:600;
        color: #2E3939;
        margin-bottom:8px;
      }
      & p{
        color:#859593;
        font-size:16px;
        font-weight: 600;
        line-height:1.5;
      
      }
    }

    & .extra{
      margin-bottom: 32px;

      & .speces{
        width: 100%;

      }
      & h4{
        font-size:18px;
        font-weight:600;
        color: #2E3939;
        margin-bottom:8px;
      }
      & ul{
        & .spec
          color:#859593;
          font-size:16px;
          margin-bottom:4px;
        }
        & .spec{
          font-weight:600;
          font-style: normal;
        }
      }
    }
    & .btns{
      margin-left:0;
      justify-content:center;
      width: 100%;
      display:flex;
      flex-direction: column-reverse;
      align-items: center;
      @media(min-width:1023px){
        flex-direction: row;
        margin-left: -8px;
      }
    }
    @media(min-width:1023px){
    width: 48%;
    }
    & .react-datepicker-wrapper{
      & .react-datepicker__input-container{
        margin: 16px auto !important;
        & input{
          padding:16px 8px !important;
          width: 98% !important;
          border-color: #F58732 !important;
          outline: none !important;
          text-align: center !important;
          border-radius: .25rem !important;
        }
      }
    }
`;

export default DeviceInfoReserve