import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Link, Route } from "react-router-dom";
import HomePage from "./Homepage";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import MembersPage from "./MembersPage";
import LogoutPage from "./Logoutpage";
import EditUser from "./EditPage";
function App() {
  return (
    <div className="App" style={{ height: "100vh" }}>
      <BrowserRouter>
        <div className="link-div">
          <Link to="/register" className="link">
            Register
          </Link>
          <Link to="/login" className="link">
            Login
          </Link>
          <Link to="/logout" className="link">
            Logout
          </Link>
        </div>
        <Routes>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/members" element={<MembersPage />} />
          <Route path="/logout" element={<LogoutPage />}></Route>
          <Route path="/edit/:username" element={<EditUser />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
