import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Signup from "./signupPage/Signup";
import Login from "./signupPage/Login";
import { ToastContainer } from "react-bootstrap";
import Profile from "./signupPage/Profile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
