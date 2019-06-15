import axios from 'axios';

//export const baseURL = 'http://localhost:8080/';
export const baseURL = 'https://codexio-currency-converterapp.herokuapp.com/';

export class Requester {

    static fetchCurrencies() {
        return axios.get(baseURL + 'fetch/currencies-table');
    }

    static fetchCurrenciesGraphicsData() {
        return axios.get(baseURL + 'fetch/currencies-history');
    }
}
