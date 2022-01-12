import styled from "styled-components";
import DeviceCard from "./DeviceCard";

type Props = {
  backgroundcolor: string;
};

const StyledDeviceCard = styled(DeviceCard)<Props>`
  width: 100%;

@media(min-width:500px) and (max-width:767px){
  width: 45%;
}
@media(min-width:768px) and (max-width:1049px){
  width: 30%;
}
@media(min-width:1050px) {
  width: 22%;
}
height: 80px;
box-shadow: 0px 4px 8px rgba(0, 0, 0, .2);
border-radius: .25rem;
margin-bottom:32px ;
position: relative;
transition: all 0.2s ease-in-out;
cursor:pointer;

&:hover{
  transform: scale(1.05);
}
& .content{
  display:flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size:14px;
  padding: 0 16px 0 46px;
}
& .status{
  position: absolute;
  bottom: 28px;
  left:-30px;
  width: 80px;
  background-color: ${props=>props.backgroundcolor};
  transform: rotate(270deg);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: .25rem .25rem 0 0;
  font-size:12px;
  height: 25px;
  padding: 0 4px;
}
`;
export default StyledDeviceCard;