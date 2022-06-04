import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'

import { Card } from '../../components/Card';
import { FormGroup } from '../../components/FormGroup';
import { SelectMenu } from '../../components/SelectMenu';
import { ErrorMessage, SuccessMessage } from '../../components/toastr';

import LaunchService from '../../app/service/LaunchService';

export function ReleaseRegister() {
    const launchService = new LaunchService();

    const releaseTypes = launchService.releaseTypeList();
    const months = launchService.listMonths();

    const navigate = useNavigate();

    const [release, setRelease] = useState({
        id: null,
        descricao: '',
        mes: '',
        ano: '',
        valor: '',
        tiporelease: '',
        status: ''
    });

    //Método responsável por pegar os valores dos inputs e salva-los no state
    const handlerDataChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setRelease(values => ({...values, [name]: value}))
    }

    //Método que enviar o novo lançamento para o back-end
    const sendRegisterRelease = () => {
        const LoggedUser = JSON.parse(localStorage.getItem("logged_user"));
        
        const {ano, descricao, mes, valor, tiporelease} = release;
        
        const lancamento = {
            ano,
            descricao,
            mes,
            valor,
            usuario: LoggedUser.id,
            tipo: tiporelease
        }

        launchService.save(lancamento)
            .then(response => {
                SuccessMessage("Lançamento salvo com sucesso !");
                navigate("/meus-lancamentos");
            }).catch(error => {
                ErrorMessage(error.response.data)
            })
    }

    return (
        <Card title="Cadastro de lançamento">
            <fieldset>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup label="Descrição: *" htmlFor="descricao">
                            <input type="text" 
                                className="form-control"
                                id="descricao"
                                name="descricao"
                                value={release.descricao || ''}
                                onChange={handlerDataChange}
                                placeholder="Digite uma descrição"/>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup label="Ano: *" htmlFor="ano">
                            <input type="text" 
                                className="form-control"
                                id="ano"
                                name="ano"
                                value={release.ano}
                                onChange={handlerDataChange}
                                placeholder="Digite o ano"/>
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup label="Mês: *" htmlFor="mes">
                            <SelectMenu className="form-control" 
                                list={months}
                                id="mes"
                                name="mes"
                                value={release.mes || ''}
                                onChange={handlerDataChange}/>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup label="Valor: *" htmlFor="valor">
                            <input type="text"
                                className="form-control"
                                id="valor"
                                name="valor"
                                value={release.valor || ''}
                                onChange={handlerDataChange}
                                placeholder="R$"/>
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup label="Tipo: *" htmlFor="tiporelease">
                            <SelectMenu className="form-control" 
                                list={releaseTypes}
                                id="tiporelease"
                                name="tiporelease"
                                value={release.tiporelease}
                                onChange={handlerDataChange}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup label="Status: " htmlFor="status">
                            <input type="text" 
                                className="form-control"
                                id="status"
                                name="status"
                                value={release.status} 
                                disabled/>
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <button onClick={sendRegisterRelease} type="button" className="btn btn-success">Cadastrar</button>
                        <Link to="/meus-lancamentos" className="btn btn-danger">Cancelar</Link>
                    </div>
                </div>
            </fieldset>
        </Card>
    )
}