import React from 'react'
import styled from "styled-components";

import {image} from '../../interfaces'
const ModelImage: React.FC<image> = ({src}) => (
  <Picture>
    <img src={src} alt="device" />
  </Picture>
)

const Picture = styled.div`
  width: 100%;
  margin: 32px 0;
  & img {
    object-fit: cover;
    width: 100%;
    height: 40vh;
    border-radius:.25rem
  }
  @media(min-width:1023px){
    width: 45%;
    & img {
    height: calc(100vh - 164px);
  }
  }
`;

export default ModelImage