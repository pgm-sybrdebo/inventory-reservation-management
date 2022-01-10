import React from 'react'
import styled from "styled-components";
import StyledButton from '../Button/StyledButton.style';
import { useNavigate } from "react-router-dom";
import {modelInfo} from '../../interfaces'
const ModelImage: React.FC<modelInfo> = ({name, quantity, description , specifications, tags}) => { 
  let navigate = useNavigate();

  return(
    <Wrapper>
      <div className="topic">
        <h2>{name}</h2>
        <h6>{quantity} Devices</h6>
      </div>
      <div className="desc">
        <h4>Description</h4>
        <p>{description}</p>
      </div>
      <div className="extra">
        <div className="speces">
          <h4>Specifications</h4>
          <ul>
            {specifications.map(specification => <li className="spec">{specification}</li>)}
          </ul>
        </div>
        <div className="tags">
          <h4>Tags</h4>
          <ul>
            {tags.map(tag => <li className="tag">{tag}</li>)}
          </ul>
        </div>
        
      </div>
      <div className="btns">
          <StyledButton 
            type="button" 
            text="Back" 
            color="white"
            width="48%"
            backgroundcolor="#ED1534"
            radius=".25rem"
            onClick = {()=> navigate("/models")}
          />
          <StyledButton 
            type="button" 
            text="Devices Overview" 
            color="white"
            width="48%"
            backgroundcolor="#F58732"
            radius=".25rem"
            
          />
        </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    width: 100%;
    & .topic{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;

      & h2{
        font-size:24px;
        font-weight: 700;
        color: #000;
      }
      & h6{
        font-size:18px;
        font-weight:600;
        color: #2E3939;
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
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 32px;

      & .speces, .tags{
        width: 100%;
        margin-bottom: 12px;
        @media(min-width:1023px){
           width: 45%;
           margin-bottom: 0;
        }
      }
      & h4{
        font-size:18px;
        font-weight:600;
        color: #2E3939;
        margin-bottom:8px;
      }
      & ul{
        & .spec, .tag{
          color:#859593;
          font-size:16px;
          margin-bottom:4px;
        }
        & .tag{
          font-weight:400;
          font-style: italic;
          text-transform:capitalize;
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
`;

export default ModelImage