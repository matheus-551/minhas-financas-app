import React from 'react';

import { NavbarItem } from './NavItem';

export function Navbar() {

    const AuthenticatedUser = () => {
        return localStorage.getItem("logged_user")
        ? 
        true
        :
        false;
    }

    const signOut = () => {
        localStorage.removeItem("logged_user")
    }

    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand">Minhas Finanças</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">                  
                    <ul className="navbar-nav">
                        <NavbarItem render={false} href="#/home" label="Home"/>
                        <NavbarItem render={false} href="#/meus-lancamentos" label="Lançamentos"/>
                        <NavbarItem render={false} click={signOut} href="#/login" label="Sair"/>
                        <NavbarItem render={true} href="#/login" label="Login"/>
                        <NavbarItem render={true} href="#/cadastro-usuarios" label="Cadastro"/>
                    </ul>
                </div>
            </div>
        </div>
    )
}