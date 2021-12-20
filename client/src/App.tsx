import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import {GlobalStyles} from './GeneralStyles.style';
import * as ROUTES from "./routes";
import {
  HomePage,
  Login,
  Register,
  Models,
} from "./pages";

function App() {
  return (
    <div className="app">
      <GlobalStyles />
      <Router>
        
        <Routes>
          <Route 
            path={ROUTES.LANDING} 
            element={<HomePage />} 
          />
          <Route path={ROUTES.HOME}  element={<Navigate to={ROUTES.LANDING} replace />} />
          <Route
            path={ROUTES.LOGIN}
            element={<Login />}
          />
          <Route
            path={ROUTES.REGISTER}
            element={<Register />}
          />
          <Route
            path={ROUTES.MODELS}
            element={<Models />}
          />
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
