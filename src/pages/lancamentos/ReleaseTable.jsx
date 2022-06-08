import React,{ useState } from 'react';

import currencyFormatter from 'currency-formatter';

export function ReleaseTable(props) {
   
    const rows = props.lancamentos.map( (lancamento, i) => {
        return (
            <tr key={i}>
                <td>{lancamento.mes}</td>
                <td>{lancamento.descricao}</td>
                <td>{lancamento.status}</td>
                <td>{lancamento.tipoLancamento}</td>
                <td>{currencyFormatter.format(lancamento.valor, {locale: 'pt-BR'}) }</td>
                {
                    !lancamento === null 
                    ? 
                        ''
                    :            
                    <td>
                        <button type="button"
                                title="Cancelar Status"
                                disabled={ lancamento.status !== "PENDENTE"}
                                className="btn btn-secondary"
                                onClick={e => props.modifyStatus(lancamento, "CANCELADO")}>
                            <i className="pi pi-times"></i>
                        </button>
                        <button type="button"
                                title="Efetivar Status"
                                disabled={ lancamento.status !== "PENDENTE"}
                                className="btn btn-success"
                                onClick={e => props.modifyStatus(lancamento, "EFETIVADO")}>
                            <i className="pi pi-check"></i> 
                        </button>
                        <button type="button" 
                                title="editar"
                                className="btn btn-primary"
                                onClick={e => props.editAction(lancamento)}>
                            <i className="pi pi-pencil"></i>
                        </button>
                        <button type="button" 
                                title="deletar"
                                className="btn btn-danger"
                                onClick={e => props.deleteAction(lancamento)}>
                            <i className="pi pi-trash"></i>  
                        </button>
                    </td> 
                }
            </tr>
        )
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <td>Mês</td>
                    <td>Descrição</td>
                    <td>Situação</td>
                    <td>Tipo</td>
                    <td>Valor</td>
                    <td>Ações</td>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}