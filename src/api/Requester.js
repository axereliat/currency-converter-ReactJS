import axios from 'axios';

export const baseURL = 'http://localhost:8080/';

export class Requester {

    static fetchCurrencies() {
        return axios.get(baseURL + 'fetch/.....');
    }
}
