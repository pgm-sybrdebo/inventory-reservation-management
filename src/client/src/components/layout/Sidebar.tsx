import React from "react";
import MenuItem from "../dashboard/MenuItem";
import styled from "styled-components";
import {
  Group,
  LocalOffer,
  Phonelink,
  Send,
  VerifiedUser,
  Category,
  CheckCircle,
  Dashboard,
  Work,
  Home,
  List,
  MenuBook,
  AssignmentTurnedIn,
  Class,
} from "@material-ui/icons";
import * as routes from "../../routes";

const Container = styled.div`
  flex: 1;
  height: calc(100vh - 90px);
  background-color: #f6fafd;
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
    icon: <Home />,
    url: routes.DASHBOARD_HOME,
  },
];

const submenuUsers = [
  {
    name: "All users",
    icon: <List />,
    url: routes.DASHBOARD_ALL_USERS,
  },
  {
    name: "Admins",
    icon: <VerifiedUser />,
    url: routes.DASHBOARD_ADMINS,
  },
  {
    name: "Staff",
    icon: <Work />,
    url: routes.DASHBOARD_STAFF,
  },
  {
    name: "Students",
    icon: <MenuBook />,
    url: routes.DASHBOARD_STUDENTS,
  },
];

const submenuDevices = [
  {
    name: "All devices",
    icon: <List />,
    url: routes.DASHBOARD_ALL_DEVICES,
  },
  {
    name: "Devices in check",
    icon: <AssignmentTurnedIn />,
    url: routes.DASHBOARD_CHECK_DEVICES,
  },
];

const submenuStatuses = [
  {
    name: "All statuses",
    icon: <List />,
    url: routes.DASHBOARD_ALL_STATUSES,
  },
];

const submenuModels = [
  {
    name: "All models",
    icon: <List />,
    url: routes.DASHBOARD_ALL_MODELS,
  },
];

const submenuTags = [
  {
    name: "All tags",
    icon: <List />,
    url: routes.DASHBOARD_ALL_TAGS,
  },
];

const Sidebar = () => {
  return (
    <Container>
      <Wrapper>
        <Menu>
          <MenuItem
            title={"Dashboard"}
            icon={<Dashboard />}
            submenu={submenuDashboard}
          />
          <MenuItem title={"Users"} icon={<Group />} submenu={submenuUsers} />
          <MenuItem title={"Models"} icon={<Class />} submenu={submenuModels} />
          <MenuItem
            title={"Devices"}
            icon={<Phonelink />}
            submenu={submenuDevices}
          />
          <MenuItem
            title={"Statuses"}
            icon={<Category />}
            submenu={submenuStatuses}
          />
          <MenuItem
            title={"Tags"}
            icon={<LocalOffer />}
            submenu={submenuTags}
          />
        </Menu>
      </Wrapper>
    </Container>
  );
};

export default Sidebar;
