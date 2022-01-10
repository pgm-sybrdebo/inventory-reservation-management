import React from 'react'
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ModelCardPic } from '../../interfaces'
import CardBtn from '../CardBtn/CardBtn';


const ModelCard : React.FC<ModelCardPic>= ({src, title, quantity, description, id}) => {
  let navigate = useNavigate();
  return(
    <BigCard>
    <div className="bg">
      <img src={src} alt="model" />
    </div>
    <div className="info">
      <div className="top">
        <h2>{title}</h2>
        <h6>{quantity} pieces</h6>
      </div>
      <div className="text">
        {description}
      </div>
    </div>
    <div className="btns">
    <CardBtn
      type="button" 
      text="Learn More" 
      name="lm"
      onClick = {()=> navigate(`/models/detail/${id}`)}
    />
    <CardBtn
      type="button" 
      text="Devices Overview" 
      name="do"
    />
    </div>
  </BigCard>
  )
}

const BigCard = styled.div`
  width: 100%;

  @media(min-width:767px) and (max-width:1049px){
    width: 48%;
  }
  @media(min-width:1050px){
    width: 30%;
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
    & .top{
      display:flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 8px;
      & h2{
        font-size:18px;
        font-weight: 600;
        color: #000;
        width: 80%;
      }
      & h6{
        color:#2E3939;
        font-size:16px;
        font-weight:400;
      }
    }

  }
  & .btns{
    padding: 16px;
    height: 20%;
    width: 100%;
    display:flex;

    & button{
      margin-right:32px;
    }
  }
  
`;

export default ModelCard
