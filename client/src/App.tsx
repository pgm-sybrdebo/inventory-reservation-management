import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {GlobalStyles} from './GeneralStyles.style';
import * as ROUTES from "./routes";
import {
  HomePage,
  Login,
  Register
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
