import ApiService from "../ApiService";

class UserService extends ApiService {

    constructor() {
        super("api/usuarios");
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