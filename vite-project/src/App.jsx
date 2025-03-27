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
import Incompleteprofile from "./signupPage/Incompleteprofile";
import EditUserProfile from "./signupPage/EditUserProfile";
import ForgotPassword from "./signupPage/Forgot password";
import Dailyexpense from './dailyExpense/Dailyexpense'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/profile-completion" element={<Incompleteprofile />} />
        <Route path="/profile/edit/:userId" element={<EditUserProfile />} />
        <Route path="/forgot" element={<ForgotPassword/>}></Route>
        <Route path="/expense" element={<Dailyexpense/>}></Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
