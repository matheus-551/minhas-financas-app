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

    const validate = () => {
        const msgs = [];

        if(!user.nome) {
            msgs.push("O campo nome é obrigatório.")
        }

        if(!user.email) {
            msgs.push("O campo email é obrigatório.")
        }else if(!user.email.match(/^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-z]/)) {
            msgs.push("Informe um email válido.");
        }

        if(!user.senha || !user.repeticaoSenha) {
            msgs.push("Digite a senha 2x.")
        }else if(user.senha !== user.repeticaoSenha) {
            msgs.push("As senhas precisam ser identicas.")
        }

        return msgs;
    }

    // método responsável por fazer o cadastro do usuário
    const sendRegisterUser = () => {
       const msgs = validate();

       if(msgs && msgs.length > 0) {
           msgs.forEach( (msg, index) => {
                ErrorMessage(msg)
           });

           return false;
       }

       userService.save({
           "nome": user.nome,
           "email": user.email,
           "senha": user.senha
       }).then( response => {
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