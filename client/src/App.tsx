import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as ROUTES from "./routes";
import {
  HomePage,
  Login,
  Register
} from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.LANDING} element={<HomePage />} />
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
  );
}

export default App;
