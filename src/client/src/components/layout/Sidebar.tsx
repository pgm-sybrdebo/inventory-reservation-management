import React from 'react'
import MenuItem from '../dashboard/MenuItem';
import styled from "styled-components";
import { Group, LocalOffer, Phonelink, Send, VerifiedUser, Category, CheckCircle, Dashboard, Work, Home, List, MenuBook, AssignmentTurnedIn  } from "@material-ui/icons";


const Container = styled.div`
  flex: 1;
  height: calc(100vh - 90px);
  background-color: #F6FAFD;
  position: sticky;
  top: 90px;
`;
const Wrapper = styled.div`
  padding: 1.5rem;
`;
const Menu = styled.ul`
  margin-bottom: 1rem;
`;

const submenuDashboard = [
  {
    name: "Home",
    icon: <Home />
  }
];

const submenuUsers = [
  {
    name: "All users",
    icon: <List />
  },
  {
    name: "Admins",
    icon: <VerifiedUser />
  },
  {
    name: "Staff",
    icon: <Work />
  },
  {
    name: "Students",
    icon: <MenuBook />
  }
];

const submenuDevices = [
  {
    name: "All devices",
    icon: <List />
  },
  {
    name: "Borrowed devices",
    icon: <Send />
  },
  {
    name: "Devices in stock",
    icon: <CheckCircle />
  },
  {
    name: "Devices in check",
    icon: <AssignmentTurnedIn />
  }
];

const submenuStatuses = [
  {
    name: "All statuses",
    icon: <List />
  }
];

const submenuTags = [
  {
    name: "All tags",
    icon: <List />
  }
];


const Sidebar = () => {
  return (
    <Container>
      <Wrapper>
        <Menu>
          <MenuItem title={"Dashboard"} icon={<Dashboard />} submenu={submenuDashboard}/>
          <MenuItem title={"Users"} icon={<Group />} submenu={submenuUsers}/>
          <MenuItem title={"Devices"} icon={<Phonelink />} submenu={submenuDevices}/>
          <MenuItem title={"Statuses"} icon={<Category />} submenu={submenuStatuses}/>
          <MenuItem title={"Tags"} icon={<LocalOffer />} submenu={submenuTags}/>
        </Menu>
      </Wrapper>
    </Container>
  )
}

export default Sidebar
