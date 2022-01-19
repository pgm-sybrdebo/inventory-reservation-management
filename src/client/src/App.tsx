import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet, useNavigate } from "react-router-dom";
import {GlobalStyles} from './GeneralStyles.style';
import * as ROUTES from "./routes";
import jwt_decode from "jwt-decode";
import {
  HomePage,
  Login,
  Register,
  Models,
  ModelDetail,
  Page403,
  Admin,
  EditProfile,
  Devices,
  DashboardHome,
  DashboardUsers,
  DashboardAdmins,
  DashboardStaff,
  DashboardStudents,
  DashboardStatuses,
  DashboardTags,
  DashboardDevices,
  DashboardBorrowedDevices,
  DashboardStockDevices,
  DashboardInCheckDevices,
  ReturnDevice,
  TakeOrReserveDevice,
} from "./pages";

import { TokenInfo, UserRole } from "./interfaces";
import DashboardModels from "./pages/DashboardModels";
// import { useQuery } from "@apollo/client";
// import { GET_DEVICE_BY_ID } from "./graphql/devices";


const RequireAuth = ({availableRoles} : { availableRoles: UserRole[]}) => {
  let navigate = useNavigate();
  const token = localStorage.getItem('token');  
  let location = useLocation();
  // const routeDetail = location.pathname.split( '/' );
  // console.log(routeDetail);
  // const deviceId = routeDetail[3];
  // const {data:deviceData} = useQuery(GET_DEVICE_BY_ID, {
  //   variables: {id: deviceId}
  // })
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  const userData = jwt_decode<TokenInfo>(token);
  console.log(userData.sub);
  if (userData.exp  < Date.now() / 1000) {
    localStorage.removeItem('token');
    navigate("/login");
  }
  if (!availableRoles.filter(r => r === userData.role).length) {
    return <Navigate to="/page403" state={{ from: location }} />;
  }


  /// console.log("d:",deviceData)
  // if(location.pathname === ROUTES.ReturnDevice || location.pathname === ROUTES.TAKE_OR_RESERVE_DEVICE){
  //   console.log("match");
  //   if(userData.sub !== deviceData.getDeviceById.userId) {
  //     return <Navigate to={`/device/take-or-reserve/${deviceId}`}  state={{ from: location }} />;
  //   }
  //   else{
  //     return <Navigate to={`/device/return/${deviceId}`}  state={{ from: location }} />;
  //   }

  //   }
  return <Outlet />;
}

function App() {
  return (
    <div className="app">
      <GlobalStyles />
      <Router>        
        <Routes>
        <Route element={<RequireAuth availableRoles={[UserRole.Regular, UserRole.Admin, UserRole.SuperAdmin]} />}>
          <Route path={ROUTES.HOME}  element={<Navigate to={ROUTES.LANDING} replace />} />
          <Route 
            path={ROUTES.LANDING} 
            element={<HomePage />} 
          />
          <Route
            path={ROUTES.MODELS}
            element={<Models />}
          />  
          <Route
            path={ROUTES.MODEL_DETAILS}
            element={<ModelDetail />}
          /> 
          <Route
            path={ROUTES.DEVICES}
            element={<Devices />}
          /> 
          <Route
            path={ROUTES.ReturnDevice}
            element={<ReturnDevice />}
          /> 
          <Route
            path={ROUTES.TAKE_OR_RESERVE_DEVICE}
            element={<TakeOrReserveDevice />}
          /> 
          <Route
            path={ROUTES.EDIT_PROFILE}
            element={<EditProfile />}
          />       
        </Route>

        <Route element={<RequireAuth availableRoles={[UserRole.Admin, UserRole.SuperAdmin]} />}>          
        <Route
            path={ROUTES.ADMIN}
            element={<Admin/>}
          />

          <Route
            path={ROUTES.DASHBOARD_HOME}
            element={<DashboardHome />}
          />

          <Route
            path={ROUTES.DASHBOARD_ALL_USERS}
            element={<DashboardUsers />}
          />

          <Route
            path={ROUTES.DASHBOARD_ADMINS}
            element={<DashboardAdmins />}
          />
          <Route
            path={ROUTES.DASHBOARD_STAFF}
            element={<DashboardStaff />}
          />
          <Route
            path={ROUTES.DASHBOARD_STUDENTS}
            element={<DashboardStudents />}
          />
          <Route
            path={ROUTES.DASHBOARD_ALL_STATUSES}
            element={<DashboardStatuses />}
          />
          <Route
            path={ROUTES.DASHBOARD_ALL_TAGS}
            element={<DashboardTags />}
          />

          <Route
            path={ROUTES.DASHBOARD_ALL_MODELS}
            element={<DashboardModels />}
          />
          <Route
            path={ROUTES.DASHBOARD_ALL_DEVICES}
            element={<DashboardDevices />}
          />
          <Route
            path={ROUTES.DASHBOARD_BORROWED_DEVICES}
            element={<DashboardBorrowedDevices />}
          />
          <Route
            path={ROUTES.DASHBOARD_STOCK_DEVICES}
            element={<DashboardStockDevices />}
          />
          <Route
            path={ROUTES.DASHBOARD_CHECK_DEVICES}
            element={<DashboardInCheckDevices />}
          />
        </Route>

        <Route
          path={ROUTES.LOGIN}
          element={<Login />}
        />
        <Route
          path={ROUTES.REGISTER}
          element={<Register />}
        />
        <Route
          path={ROUTES.PAGE403}
          element={<Page403 />}
        />


        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
