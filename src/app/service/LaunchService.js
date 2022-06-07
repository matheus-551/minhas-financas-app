import ApiService from '../ApiService';

import ValidationError from '../exception/ValidationError';

class LaunchService extends ApiService {

    constructor() {
        super("api/lancamentos");
    }

    listMonths() {
        return [
            { label: "Selecione...", value: '' },
            { label: "Janeiro", value: 1 },
            { label: "Fevereiro", value: 2 },
            { label: "Março", value: 3 },
            { label: "Abril", value: 4 },
            { label: "Maio", value: 5 },
            { label: "Junho", value: 6 },
            { label: "Julho", value: 7 },
            { label: "Agosto", value: 8 },
            { label: "Setembro", value: 9 },
            { label: "Outubro", value: 10 },
            { label: "Novembro", value: 11 },
            { label: "Dezembro", value: 12 }
        ]
    }

    releaseTypeList() {
        return [
            {label: "Selecione...", value: ""},
            {label: "RECEITA" , value: "RECEITA"},
            {label: "DESPESA" , value: "DESPESA"}
        ]
    }

    findById(id) {
        return this.get(`/${id}`)
    }

    validate(release) {
        const errors = [];

        if(!release.ano) {
            errors.push("O campo Ano é obrigatório");
        }

        if(!release.mes) {
            errors.push("O campo Mês é obrigatório");
        }

        if(!release.descricao) {
            errors.push("O campo Descrição é obrigatório");
        }

        if(!release.valor) {
            errors.push("O campo Valor é obrigatório");
        }

        if(!release.tipo) {
            errors.push("Defina o tipo de lançamento");
        }

        if(errors && errors.length > 0) {
            throw new ValidationError(errors);
        }
    }

    save(release) {
        return this.post("/", release);
    }

    changeStatus(id, status) {
        return this.put(`/${id}/atualiza-status`, { status })
    }

    update(release) {
        return this.put(`/${release.id}`, release);
    }

    userReleaseList(id) {
        return this.get(`/${id}/lista-lancamentos`)
    }

    deleteRelease(id) {
        return this.delete(`/${id}`);
    }
    
    consult(lancamentoFiltro) {
        let params = `?ano=${lancamentoFiltro.ano}`;

        if(lancamentoFiltro.descricao) {
            params = `${params}&descricao=${lancamentoFiltro.descricao}`
        }

        if(lancamentoFiltro.mes) {
            params = `${params}&mes=${lancamentoFiltro.mes}`;
        }

        if(lancamentoFiltro.tipoLancamento) {
            params = `${params}&tipoLancamento=${lancamentoFiltro.tipoLancamento}`;
        }

        if(lancamentoFiltro.usuario) {
            params = `${params}&usuario=${lancamentoFiltro.usuario}`
        }

        return this.get(params)
    }
}

export default LaunchService;