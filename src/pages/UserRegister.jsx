import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import { Card } from '../components/Card';
import { FormGroup } from '../components/FormGroup';
import { ErrorMessage, SuccessMessage } from '../components/toastr';

import UserService from '../app/service/UserService';

export function UserRegister() {
    const userService = new UserService();
    
    const navegate = useNavigate();

    const [user, setUser] = useState({
        nome: '',
        email: '',
        senha: '',
        repeticaoSenha: ''
    });

    // método responsável por alterar o valor do state
    const handleDataChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUser(values => ( {...values, [name]: value} ))
    }

    // método responsável por fazer o cadastro do usuário
    const sendRegisterUser = () => {
        const { nome, email, senha, repeticaoSenha} = user;

        const usuario = {
            nome,
            email,
            senha,
            repeticaoSenha
        }

        try {
            userService.validate(usuario);
        }catch (error) {
            const msgs = error.messages;
            msgs.forEach(message => ErrorMessage(message));
            return false;
        }

       userService.save(usuario).then( response => {
           SuccessMessage("Usuário cadastrado com sucesso !");
           navegate("/login");
       }).catch( error => {
           ErrorMessage(error.response.data);
       })
    }

    return (
        <Card title="Cadastro de usuário">
            <div className="row">
                <div className="col-lg-12">
                    <div className="bs-component">
                        <fieldset>
                            <FormGroup label="Nome: *" htmlFor="nome">
                                <input type="text"
                                    className="form-control"
                                    id="nome"
                                    name="nome"
                                    value={user.nome || ''} 
                                    onChange={handleDataChange}
                                    placeholder="Digite seu nome"/>
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="email">
                                <input type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={user.email || ''}
                                    onChange={handleDataChange}
                                    placeholder="Digite seu email"/>
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="senha">
                                <input type="password"
                                    className="form-control"
                                    id="senha"
                                    name="senha"
                                    value={user.senha || ''}
                                    onChange={handleDataChange}
                                    placeholder="Digite sua senha"/>
                            </FormGroup>
                            <FormGroup label="Repita a senha: *" htmlFor="repeticaoSenha">
                                <input type="password"
                                    className="form-control"
                                    id="repeticaoSenha"
                                    name="repeticaoSenha"
                                    value={user.repeticaoSenha || ''}
                                    onChange={handleDataChange}
                                    placeholder="Digite sua senha novamente"/>
                            </FormGroup>
  
                            <button onClick={sendRegisterUser} className="btn btn-success">Cadastrar</button>
                            <Link to="/login" className="btn btn-danger">Cancelar</Link>
                        </fieldset>
                    </div>
                </div>
            </div>
        </Card>
    )
}