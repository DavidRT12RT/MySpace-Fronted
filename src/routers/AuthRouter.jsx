import React from 'react'
import { Route, Routes } from 'react-router-dom';

//Page's
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'


//Styles for all component's
import "../css/Auth.css";

export const AuthRouter = () => {
    return (
        <div className="authContainer">
            <Routes>
                <Route path="/login" element={<LoginPage/>}></Route>
                <Route path="/register" element={<RegisterPage/>}></Route>
            </Routes>
        </div>
    )
}
