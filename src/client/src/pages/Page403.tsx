import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import pic403 from '../assets/pic403.svg'
import StyledButton from '../components/Button/StyledButton.style';



const Page403 = () => {
  let navigate = useNavigate();

  return (

      <ClosedArea>
      <div className="pic">
        <img src={pic403} alt="illustratin 403 error" />
      </div>
      
      <StyledButton
        type="button" 
        text="Go Home" 
        name="backHome"
        color="white"
        width="50%"
        backgroundcolor="#F58732"
        radius = ".25rem"
        onClick = {()=> navigate("/")}
        />
    </ClosedArea>

    
  )
}
export default Page403;
const ClosedArea = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  padding: 16px !important;
  @media(min-width:767px){
    padding: 64px;
  }
  & .pic{
    width: 90vw;

    & img{
      width: 100%;
      max-height: 70vh;
      object-fit: contain;
    }
  }
  & button {
    position: absolute;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
  }
}

`;