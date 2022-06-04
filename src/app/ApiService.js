import axios from 'axios';

const HttpClient = axios.create({
    baseURL: "http://localhost:8080"
});

class ApiService {

    constructor(ApiUrl) {
        this.ApiUrl = ApiUrl;
    }

    get = (url) => {
        const requestUrl = `${this.ApiUrl}${url}`;
        return HttpClient.get(requestUrl);
    }

    post = (url, obj) => {
        const requestUrl = `${this.ApiUrl}${url}`;
        return HttpClient.post(requestUrl, obj);
    }

    put = (url, obj) => {
        const requestUrl = `${this.ApiUrl}${url}`;
        return HttpClient.put(requestUrl, obj);
    }

    delete = (url) => {
        const requestUrl = `${this.ApiUrl}${url}`;
        return HttpClient.delete(requestUrl);
    }
}

export default ApiService;