import React from 'react'
import { Container, Header, ListCards, StyledDeviceCard } from '../components'

function Devices() {
  return (
    <>
      <Header />
      <Container>
        <ListCards>
          <StyledDeviceCard availability="In Stock" deviceId="123456" backgroundcolor="#F58732" onClick={()=> console.log("clicked")}/>
          <StyledDeviceCard availability="In Stock" deviceId="123456" backgroundcolor="#F58732" onClick={()=> console.log("clicked")}/>
          <StyledDeviceCard availability="In Stock" deviceId="123456" backgroundcolor="#F58732" onClick={()=> console.log("clicked")}/>
          <StyledDeviceCard availability="In Stock" deviceId="123456" backgroundcolor="#F58732" onClick={()=> console.log("clicked")}/>
          <StyledDeviceCard availability="In Stock" deviceId="123456" backgroundcolor="#F58732" onClick={()=> console.log("clicked")}/>
          <StyledDeviceCard availability="In Stock" deviceId="123456" backgroundcolor="#F58732" onClick={()=> console.log("clicked")}/>

          <StyledDeviceCard availability="In Stock" deviceId="123456" backgroundcolor="#F58732" onClick={()=> console.log("clicked")}/>
          <StyledDeviceCard availability="In Stock" deviceId="123456" backgroundcolor="#F58732" onClick={()=> console.log("clicked")}/>
          <StyledDeviceCard availability="In Stock" deviceId="123456" backgroundcolor="#F58732" onClick={()=> console.log("clicked")}/>
          <StyledDeviceCard availability="In Stock" deviceId="123456" backgroundcolor="#F58732" onClick={()=> console.log("clicked")}/>
          <StyledDeviceCard availability="In Stock" deviceId="123456" backgroundcolor="#F58732" onClick={()=> console.log("clicked")}/>
          <StyledDeviceCard availability="In Stock" deviceId="123456" backgroundcolor="#F58732" onClick={()=> console.log("clicked")}/>
        </ListCards>
      </Container>
    </>
  )
}

export default Devices
