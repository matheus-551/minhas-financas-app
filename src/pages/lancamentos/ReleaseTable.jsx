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
                                className="btn btn-primary"
                                onClick={e => props.editAction(lancamento)}>

                            Editar
                        </button>
                        <button type="button" 
                                className="btn btn-danger"
                                onClick={e => props.deleteAction(lancamento)}>
                            Deletar
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