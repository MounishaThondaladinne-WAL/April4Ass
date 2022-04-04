import React from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Users from "./Users";
import Members from "./Members";
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Link to='/reglog'>Register</Link>
        <Link to='/members'>Members</Link>

        <Routes>
          <Route path='/reglog' element={<Users />} />
          <Route path='/members' element={<Members />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
