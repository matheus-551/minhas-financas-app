import React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import LaunchService from '../../app/service/LaunchService';
import { ReleaseTable } from './ReleaseTable';
import { ErrorMessage, SuccessMessage } from '../../components/toastr';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

export function MyReleases() {
    const lauchService = new LaunchService();

    const [lancamentos, setLancamentos] = useState([{}]);
    const [releaseToDelete, setreleaseToDelete] = useState({});
    
    const [isVisible, setIsVisible] = useState(false);

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
                        className="btn btn-secondary">Filtrar lançamento</button>
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