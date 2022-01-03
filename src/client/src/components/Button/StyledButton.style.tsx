import styled from "styled-components";
import Button from "./Button";

type Props = {
  width: string;
  backgroundcolor: string;
  color: string;
  radius: string;
};

const StyledButton = styled(Button)<Props>`
  width:95%;
  max-width: 95%;
  height:50px;
  color: ${props=>props.color};
  font-weight: bold;
  border: 2px solid transparent;
  outline: none;
  border-radius: ${props=>props.radius};
  display: block;
  background-color: ${props=>props.backgroundcolor};
  transition: all 0.2s ease-in-out;
  margin: 0 auto 16px;
  font-size: 1.25rem;
  text-decoration: none;
  cursor: pointer;
  font-weight: 600;

  @media(min-width:1023px){
    width:${props=>props.width};
  }
  &:hover{
    background-color: ${props=>props.color};
    color: ${props=>props.backgroundcolor};
    border: 2px solid ${props=>props.backgroundcolor};
  }

`;
export default StyledButton;