import React,{ useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Card } from '../components/Card';
import { FormGroup } from '../components/FormGroup';
import { ErrorMessage, SuccessMessage } from '../components/toastr';

import UserService from '../app/service/UserService';

export function Login() {
    //Instanciando a classe do usuario service
    const userService = new UserService();
    
    const navegate = useNavigate();
 
    const [user, setUser] = useState({
        email: '',
        senha: ''
    });

    //método responsável por alterar o valor do state 
    const handleDataChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUser(values => ( {...values, [name]: value} ))
    }
    
    //método responsável por fazer o login
    const sendLogin = () => {

        if(user.email == '' && user.senha == '') {
            ErrorMessage("Preencha os campos para realizar o login");
            return false;
        }

        const credentials = {
            email: user.email,
            senha: user.senha,
        }

        userService.authenticate(credentials)
        .then( response => {
            localStorage.getItem("logged_user", JSON.stringify(response.data));
            SuccessMessage("Usuário logado com sucesso !");
            navegate("/home");
        }).catch( error => {
            ErrorMessage(error.response.data);
        })
    }

    return (
        <Card title="Login">
            <div className="row">
                <div className="col-lg-12">
                    <div className="bs-component">
                        <fieldset>
                            <FormGroup label="Email: *"  htmlFor="email">
                                <input type="text"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={user.email || ''}
                                    onChange={handleDataChange}
                                    aria-describedby="emailHelp"
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

                            <button onClick={sendLogin} className="btn btn-success"><i className="pi pi-sign-in"></i> Entrar</button>
                            <Link to="/cadastro-usuarios" className="btn btn-danger"><i className="pi pi-plus"></i> Cadastrar</Link>
                        </fieldset>
                    </div>
                </div>
            </div>
        </Card>
    )
}