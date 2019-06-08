import axios from 'axios';

const baseURL = 'http://localhost:8080/';

export class Requester {

    static fetchCurrencies() {
        return axios.get(baseURL + 'fetch/.....');
    }
}
