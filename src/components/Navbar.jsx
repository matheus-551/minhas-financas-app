import React from 'react';

import { NavbarItem } from './NavItem'

export function Navbar() {

    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand">Minhas Finanças</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavbarItem href="#/home" label="Home"/>
                        <NavbarItem href="#/login" label="Login"/>
                        <NavbarItem href="#/cadastro-usuarios" label="Cadastro"/>
                        <NavbarItem href="#/meus-lancamentos" label="Lançamentos"/>
                    </ul>
                </div>
            </div>
        </div>
    )
}