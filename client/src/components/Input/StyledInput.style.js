import styled from "styled-components";
import Input from "./Input.tsx";

const StyledInput = styled(Input)`
  
  display: flex;
  flex-direction: column;
  align-items: start;
  & label{
    font-size: 18px;
    color: #2E3939;
    margin-bottom: .5rem;
    font-weight: 600;

  }
  & input{
    margin-bottom: .75rem;
    width: 100%;
    height:40px;
    padding: .5rem;
    outline: none;
    border: 2px solid #859593 ;
    border-radius: .25rem;
  }
`;
export default  StyledInput ;