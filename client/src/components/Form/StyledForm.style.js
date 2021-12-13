import styled from "styled-components";
import Form from "./Form.tsx";

const StyledForm = styled(Form)`

display: flex;
flex-wrap: wrap;
align-items: center;
justify-content: center;
width: 100%;
height: 100vh;


& .hero, .picture {
  display: none;
  @media (min-width:1023px){
    display: block;
    width: 70%;
    object-fit: cover;
    height: 100vh;

  }
}
& div{
  width: 100%;
  & div{
    width: 100%;
  }
  @media (min-width:1023px) {
    width: 30%;
  }
}



`;
export default StyledForm;