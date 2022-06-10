import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Home } from '../pages/Home';

import { Login } from '../pages/Login'
import { MyReleases } from '../pages/lancamentos/MyReleases.';
import { UserRegister } from '../pages/UserRegister';
import { ReleaseRegister } from '../pages/lancamentos/ReleaseRegister';


const AutenticatedUser = () => {
    return localStorage.getItem("logged_user") ? true : false;
}

const PrivateRoute = ({ children, redirectTo}) => {
    return AutenticatedUser()
    ? 
    children 
    : 
    <Navigate to={redirectTo}/>
}

export function AppRoute() {

    return (
        <HashRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/cadastro-usuarios" element={<UserRegister/>}/> 
                
                <Route path="/home" element={<PrivateRoute redirectTo="/login">
                    <Home/>
                </PrivateRoute>}/>
                <Route path="/meus-lancamentos" element={<PrivateRoute redirectTo="/login">
                    <MyReleases/>
                </PrivateRoute>}/>
                <Route path="/cadastro-lancamento" element={<PrivateRoute redirectTo="/login">
                    <ReleaseRegister/> 
                </PrivateRoute>}>
                    <Route path="/cadastro-lancamento:id" element={<PrivateRoute redirectTo="/login">
                        <ReleaseRegister/>
                    </PrivateRoute>}/>
                </Route>
            </Routes>
        </HashRouter>
    )
}