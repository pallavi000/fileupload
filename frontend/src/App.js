import React from "react";
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import SignIn from "./components/auth/SignIn";
import Footer from "./components/global/Footer";
import Header from "./components/global/Header";
import Home from "./components/layouts/Home";
import axios from 'axios'
import SignUp from "./components/auth/SignUp";
import Dashboard from "./components/admin/dashboard/Dashboard";
import Protected from "./components/auth/Protected";
import Profile from "./components/admin/profile/Profile";
import EditProfile from "./components/admin/profile/EditProfile";
import Withdraw from "./components/layouts/Withdraw";
import FileUpload from "./components/layouts/FileUpload";
import Transaction from "./components/layouts/Transaction";
import Download from "./components/layouts/Download";
import Upload from "./components/layouts/Upload";

axios.defaults.baseURL="http://localhost:5000/api"


function App() {
  return (
   <Router>
   <Header/>
    <Routes>
    <Route exact path="/" element={<Home/>}/>
    <Route exact path="/sign-in" element={<SignIn/>}/>
    <Route exact path="/sign-up" element={<SignUp/>}/>
    <Route exact path="/dashboard" element={<Protected/>}>
        <Route exact path="/dashboard" element={<Dashboard/>}/>
    </Route>
    <Route exact path="/profile" element={<Protected/>}>
        <Route exact path="/profile" element={<Profile/>}/>
    </Route>
    <Route exact path="/edit-profile/:id" element={<Protected/>}>
        <Route exact path="/edit-profile/:id" element={<EditProfile/>}/>
    </Route>
    <Route exact path="/withdraw" element={<Protected/>}>
        <Route exact path="/withdraw" element={<Withdraw/>}/>
    </Route>
    <Route exact path="/my-drive" element={<Protected/>}>
        <Route exact path="/my-drive" element={<FileUpload/>}/>
    </Route>
    <Route exact path="/transaction" element={<Protected/>}>
        <Route exact path="/transaction" element={<Transaction/>}/>
    </Route>
    <Route exact path="/download/:id" element={<Protected/>}>
        <Route exact path="/download/:id" element={<Download/>}/>
    </Route>
    <Route exact path="/upload" element={<Protected/>}>
        <Route exact path="/upload" element={<Upload/>}/>
    </Route>
    </Routes>
    <Footer/>
   </Router>
  );
}

export default App;
