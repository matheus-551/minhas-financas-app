import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home';

import { Login } from '../pages/Login'
import { MyReleases } from '../pages/lancamentos/MyReleases.';
import { UserRegister } from '../pages/UserRegister';
import { ReleaseRegister } from '../pages/lancamentos/ReleaseRegister';

export function AppRoute() {

    return (
        <HashRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/cadastro-usuarios" element={<UserRegister/>}/> 
                <Route path="/meus-lancamentos" element={<MyReleases/>}/>
                <Route path="/cadastro-lancamento" element={<ReleaseRegister/>}/>
            </Routes>
        </HashRouter>
    )
}