import React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


import { FormGroup } from '../../components/FormGroup';
import { SelectMenu } from '../../components/SelectMenu';
import { ReleaseTable } from './ReleaseTable';
import { ErrorMessage, SuccessMessage } from '../../components/toastr';

import LaunchService from '../../app/service/LaunchService';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

export function MyReleases() {
    const lauchService = new LaunchService();

    // Lista dos tipos de lançamentos para o form de filtro
    const releaseTypes = lauchService.releaseTypeList();
    // Lista dos meses para o form de filtro
    const months = lauchService.listMonths();

    // Lista de todos os lançamentos
    const [lancamentos, setLancamentos] = useState([{}]);
    // State de lançamento que será filtrado 
    const [lancamentoAFiltrar, setLancamentoAFiltrar] = useState({
        descricao: "",
        ano: "",
        mes: "",
        tipoLancamento: "",
    });

    // Lista dos lançamentos filtrados
    const [lancamentosFiltrados, setLancamentosFiltrados] = useState([{}]);

    // Lançamento para deletar 
    const [releaseToDelete, setreleaseToDelete] = useState({});
    
    // State que define se o modal de deleção esta visivel 
    const [isVisible, setIsVisible] = useState(false);
    // State que define se o modal de filtro de lançamento esta visivel
    const [isOpenFormFilter, setIsOpenFormFilter] = useState(false)


    const handlerDataChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setLancamentoAFiltrar(values => ({...values, [name]: value}) );
    }

    // Método que trás a lista de todos os lançamentos
    useEffect(() => {
        const LoggedUser = JSON.parse(localStorage.getItem("logged_user"));

        lauchService.userReleaseList(LoggedUser.id)
        .then( response => {
            setLancamentos(response.data)
        }).catch( error => {
            console.log(error);
        })
    }, [])

    const editRelease = (lancamento) => {
        console.log("editando lançamento" + " "  + lancamento.id);
    }

    const handleDeletionConfirmation = (lancamento) => {
        setIsVisible(true);
        setreleaseToDelete(lancamento);
    }

    const cancelDeletion = () => {
        setIsVisible(false);
        setreleaseToDelete({});
    }

    const delRelease = () => {

        lauchService.deleteRelease(releaseToDelete.id)
        .then( response => {
            const releaseList = lancamentos;
            const identificate = releaseList.indexOf(releaseToDelete);
            releaseList.splice(identificate, 1);
            
            setLancamentos( (preven) => setLancamentos(releaseList) );
            setIsVisible(!isVisible);

            SuccessMessage("Lançamento deletado com sucesso");
        }).catch( error => {
            ErrorMessage("Ocorreu um erro ao tentar deletar o lançamento");
        })
    }

    // Método que realiza a filtragem de lançamento
    const sendSearch = () => {
        const LoggedUser = JSON.parse(localStorage.getItem("logged_user"));

        const { descricao, ano, mes, tipoLancamento} = lancamentoAFiltrar;

        const lancamentoFiltro = {
            descricao,
            ano,
            mes,
            tipoLancamento,
            usuario: LoggedUser.id
        }

        lauchService.consult(lancamentoFiltro)
        .then( response => {
            setLancamentosFiltrados(response.data);
        }).catch( error => {
            console.log(error.response.data);
        })
    }

    const footerDialog = () => {
        return (
            <div>
                <Button label="Confirmar" icon="pi pi-check" className="p-button-danger" onClick={delRelease}></Button>
                <Button label="Cancelar" icon="pi pi-times" className="p-button-secondary" onClick={cancelDeletion}></Button>
            </div>
        )
    }

    return (
        <div className="jumbotron">
            <div className="header-component">
                <h1>Meus Lançamentos</h1>
                <div className="button-group">
                    <button type="button" 
                        className="btn btn-secondary"
                        onClick={() => setIsOpenFormFilter(!isOpenFormFilter)}
                        >
                        Filtrar lançamento</button>
                    <Link className="btn btn-success"
                        to="/cadastro-lancamento">
                        Cadastrar Lançamento
                    </Link>
                </div>
            </div>

            <div className="container-table">
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <ReleaseTable lancamentos={lancamentos}
                                editAction={editRelease}
                                deleteAction={handleDeletionConfirmation}/>
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Filtro de Lançamento"
                            visible={isOpenFormFilter}
                            style={{width: '60vw'}}
                            modal={true}
                            onHide={() => setIsOpenFormFilter(false)}>
                        <div className="row">
                            <div className="col-md-12">
                                <FormGroup label="Descrição: " htmlFor="descricao">
                                    <input type="text"
                                        className="form-control"
                                        id="descricao"
                                        name="descricao"
                                        value={lancamentoAFiltrar.descricao || ""}
                                        onChange={handlerDataChange}/>
                                </FormGroup>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <FormGroup label="Ano: *" htmlFor="ano">
                                    <input type="text"
                                        className="form-control"
                                        id="ano"
                                        name="ano"
                                        value={lancamentoAFiltrar.ano || ""}
                                        onChange={handlerDataChange}/>    
                                </FormGroup>
                            </div>
                            <div className="col-md-4">
                                <FormGroup label="Mês: " htmlFor="mes">
                                    <SelectMenu list={months}
                                        className="form-control"
                                        id="mes"
                                        name="mes"
                                        value={lancamentoAFiltrar.mes || ""}
                                        onChange={handlerDataChange}/>
                                </FormGroup>
                            </div>
                            <div className="col-md-4">
                                <FormGroup label="Tipo de lançamento:" htmlFor="tipoLancamento">
                                    <SelectMenu list={releaseTypes}
                                        className="form-control"
                                        id="tipoLancamento"
                                        name="tipoLancamento"
                                        value={lancamentoAFiltrar.tipoLancamento || ""}
                                        onChange={handlerDataChange}/>
                                </FormGroup>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6" style={{marginTop: '10px'}}>
                                <button onClick={sendSearch} type="button" className="btn btn-success">Buscar</button>
                                <button onClick={() => setIsOpenFormFilter(false)} type="button" className="btn btn-danger">Cancelar</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="bs-component">
                                    <ReleaseTable lancamentos={lancamentosFiltrados}
                                        editAction={editRelease}
                                        deleteAction={handleDeletionConfirmation}/>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </div>
                <div>
                    <Dialog header="Confirmação de ação"
                            visible={isVisible}
                            style={{width: '50vw'}}
                            footer={footerDialog}
                            modal={true}
                            onHide={() => setIsVisible(false)}>
                        Tem certeza de que deseja excluir este lançamento ? 
                    </Dialog>
                </div>
            </div>
        </div>
    )
}