import ApiService from "../ApiService";

import ValidationError from '../exception/ValidationError';

class UserService extends ApiService {

    constructor() {
        super("api/usuarios");
    }

    validate(user) {
        const errors = [];

        if(!user.nome) {
            errors.push("O campo nome é obrigatório.")
        }

        if(!user.email) {
            errors.push("O campo email é obrigatório.")
        }else if(!user.email.match(/^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-z]/)) {
            errors.push("Informe um email válido.");
        }

        if(!user.senha || !user.repeticaoSenha) {
            errors.push("Digite a senha 2x.")
        }else if(user.senha !== user.repeticaoSenha) {
            errors.push("As senhas precisam ser identicas.")
        }

        if(errors && errors.length > 0) {
            throw new ValidationError(errors);
        }
    }

    save(user) {
        return this.post("/", user);
    } 

    authenticate(credentials) {
        return this.post("/autenticar", credentials);
    }

    getBalance(id) {
        return this.get(`/${id}/saldo`);
    }
}

export default UserService;