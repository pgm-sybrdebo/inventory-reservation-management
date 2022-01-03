import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import {GlobalStyles} from './GeneralStyles.style';
import * as ROUTES from "./routes";
import jwt_decode from "jwt-decode"
import {
  HomePage,
  Login,
  Register,
  Models,
  ModelDetail,
  Page403,
  Admin
} from "./pages";
<<<<<<< HEAD
import DashboardHome from "./pages/DashboardHome";
import DashboardUsers from "./pages/DashboardUsers";
import DashboardAdmins from "./pages/DashboardAdmins";
import DashboardStaff from "./pages/DashboardStaff";
import DashboardStudents from "./pages/DashboardStudents";
import DashboardStatuses from "./pages/DashboardStatuses";
import DashboardTags from "./pages/DashboardTags";
import DashboardDevices from "./pages/DashboardDevices";
import DashboardBorrowedDevices from "./pages/DashboardBorrowedDevices";
import DashboardStockDevices from "./pages/DashboardStockDevices";
import DashboardInCheckDevices from "./pages/DashboardInCheckDevices";
=======
import { TokenInfo, UserRole } from "./interfaces";

>>>>>>> e05de9584e840bccc75f20e42b00fb987d237fc2

const RequireAuth = ({availableRoles} : { availableRoles: UserRole[]}) => {
  const token = localStorage.getItem('token');  
  let location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  const data = jwt_decode<TokenInfo>(token);
  console.log(data);
  if (!availableRoles.filter(r => r === data.role).length) {
    return <Navigate to="/page403" state={{ from: location }} />;
  }

  return <Outlet />;
}

function App() {
  return (
    <div className="app">
      <GlobalStyles />
      <Router>        
        <Routes>
        <Route element={<RequireAuth availableRoles={[UserRole.Regular, UserRole.Admin]} />}>
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
        </Route>

        <Route element={<RequireAuth availableRoles={[UserRole.Admin]} />}>          
        <Route
            path={ROUTES.ADMIN}
            element={<Admin/>}
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


        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
