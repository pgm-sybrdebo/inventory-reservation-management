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
import { TokenInfo, UserRole } from "./interfaces";


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


        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
