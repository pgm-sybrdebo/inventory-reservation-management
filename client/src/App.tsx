import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import {GlobalStyles} from './GeneralStyles.style';
import * as ROUTES from "./routes";
import {
  HomePage,
  Login,
  Register,
  Models,
  ModelDetail,
} from "./pages";

function RequireAuth() {
  const token = localStorage.getItem('token');
  let location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
}


function App() {
  return (
    <div className="app">
      <GlobalStyles />
      <Router>
        
        <Routes>
        <Route element={<RequireAuth />}>
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

          <Route
            path={ROUTES.LOGIN}
            element={<Login />}
          />
          <Route
            path={ROUTES.REGISTER}
            element={<Register />}
          />


        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
