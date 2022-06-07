import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import currencyFormatter from 'currency-formatter';

import UserService from '../app/service/UserService';

export function Home() {
    const userService = new UserService();
   
    const [balance, setBalance] = useState(0);

    // método que realiza a consulta do saldo do usuário
    useEffect(() => {
        const LoggedUser = localStorage.getItem("logged_user");
        const LoggedUserObj = JSON.parse(LoggedUser);

        userService.getBalance(LoggedUserObj.id)
        .then(response => {
            setBalance(response.data);
        }).catch(error => {
            console.error(error.response);
        })
    }, [])

    return (
        <div className="jumbotron">
            <h1 className="display-3">Bem vindx</h1>
            <p className="lead">Esse é seu sistema de finanças.</p>
            <p className="lead">Seu saldo para o mês atual é de  
            <span className="balance"> R$: {currencyFormatter.format(balance, {locale: 'pt-BR'}) }</span></p>

            <hr className="my-4"/>

            <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>

            <p className="lead">
                <a className="btn btn-primary btn-lg" 
                    href="#/cadastro-usuarios" 
                    role="button">
                        <i className="fa fa-users"></i>  
                    Ver perfil
                </a>

                <Link className="btn btn-danger btn-lg" 
                    to="/meus-lancamentos"
                    role="button">
                        <i className="fa fa-users"></i>  
                    Meus lançamentos
                </Link>
            </p>
        </div>
    )
}