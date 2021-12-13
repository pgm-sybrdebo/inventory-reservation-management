import styled from "styled-components";
import Login from "./Login.tsx";

const StyledLogin = styled(Login)`
 
 height: 100vh;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  & form{
    width: 100%;
    & button{
      margin-top: 1.5rem !important;
    }
  }
  & div{
    margin: 0;
    padding: 0;
    width: 100%;
    & h2{
      font-size: 1.8rem !important;
      font-weight: 600;
      color:#000;
    }
  }

`;
export default StyledLogin;