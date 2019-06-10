import React, {Component, Fragment} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ReactCountdownClock from "react-countdown-clock";
import ResettableTimer from "./ResettableTimer";
import './Home.css';
import ThemeContext from '../context/theme-context';
import {Requester} from "../api/Requester";
import Footer from "./Footer";
import CurrenciesTable from "./CurrenciesTable";

export default class Home extends Component {

    state = {
        currencies: [],
        currencyFrom: '',
        currencyTo: '',
        result: '0.00',
        amount: '',
        loading: false
    };

    componentDidMount() {
        this.fetchCurrencies();

        setInterval(this.fetchCurrencies, 1.08e+7);
    };

    fetchCurrencies = () => {
        this.setState({loading: true}, () => {
            Requester.fetchCurrencies()
                .then(res => {
                    this.setState({
                        currencies: [...new Set(res.data.map(item => item.code))]
                            .map(code => res.data.find(item => item.code === code))
                            .sort((a, b) => a.code.localeCompare(b.code))
                    }, () => {
                        this.setState({
                            currencyFrom: localStorage.getItem('currencyFrom') || this.state.currencies[0].code,
                            currencyTo: localStorage.getItem('currencyTo') || this.state.currencies[0].code,
                            amount: localStorage.getItem('amount') || '',
                            result: localStorage.getItem('result') || '',
                            loading: false
                        })
                    })
                })
                .catch(err => {
                    console.log(err.response);
                    this.setState({loading: false});
                });
        });
    };

    handleChange = e => {
        const targetName = e.target.name;
        const targetValue = e.target.value.split(' ')[0];

        this.setState({
            [targetName]: targetValue
        }, () => {
            localStorage.setItem(targetName, targetValue);
            this.calculateResult(this.state.amount);
        });
    };

    swapCurrencies = e => {
        e.preventDefault();

        const {currencyFrom, currencyTo} = {...this.state};

        this.setState({
            currencyFrom: currencyTo,
            currencyTo: currencyFrom,
        }, () => {
            localStorage.setItem('currencyFrom', currencyTo);
            localStorage.setItem('currencyTo', currencyFrom);

            this.calculateResult(this.state.amount);
        });
    };

    calculateResult = inputAmount => {
        if (isNaN(inputAmount)) return;

        const currencyToEuroRate = this.state.currencies.find(item => item.code === this.state.currencyTo).euroRate;
        const currencyFromEuroRate = this.state.currencies.find(item => item.code === this.state.currencyFrom).euroRate;

        const result = Math.round(currencyToEuroRate / currencyFromEuroRate * inputAmount * 100) / 100;

        localStorage.setItem('result', result);
        this.setState({result: result.toFixed(2)});
    };

    render() {
        return (
            <ThemeContext.Consumer>
                {context => (
                    <Fragment>
                        <h1 className="text-center mt-2">Currency Converter</h1>
                        <hr/>
                        <ResettableTimer seconds={10}
                                             color="#000"
                                             alpha={0.9}
                                             size={80}
                                             fetchCurrencies={this.fetchCurrencies} />
                        <div className="text-center">
                            <button
                                className={"btn btn-secondary btn-lg mt-3 mb-2 " + (context.theme === 'darkTheme' ? 'lightTheme' : 'darkTheme')}
                                onClick={() => context.toggleTheme()}>
                                {context.theme === 'darkTheme' ? 'Switch to light mode' : 'Switch to dark mode'}
                            </button>
                        </div>
                        <div className={"jumbotron " + context.theme}>
                            <form>
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="currencyFrom">Currency I have</label>
                                            <select className="form-control"
                                                    id="currencyFrom"
                                                    name="currencyFrom"
                                                    onChange={this.handleChange}
                                                    value={this.state.currencyFrom}>
                                                {this.state.currencies.map(currency => (
                                                    <option value={currency.code}
                                                            key={currency.code}>{`${currency.code} (${currency.name})`}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="amount1"><h3>Amount</h3></label>
                                            <input type="number"
                                                   className="form-control form-control-lg amountInput"
                                                   id="amount1"
                                                   placeholder="Enter amount"
                                                   name="amount"
                                                   autoFocus
                                                   onChange={this.handleChange}
                                                   value={this.state.amount}/>
                                        </div>
                                    </div>
                                    <div className="col-md-2 text-center mt-md-5">

                                        <button className="btn btn-success swapBtn" onClick={this.swapCurrencies}
                                                disabled={this.state.loading}>
                                            {!this.state.loading ? <FontAwesomeIcon icon="exchange-alt" size="3x"/> :
                                                <FontAwesomeIcon icon="spinner" size="3x" spin/>}
                                        </button>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="currencyTo">Currency I want</label>
                                            <select className="form-control"
                                                    id="currencyTo"
                                                    name="currencyTo"
                                                    onChange={this.handleChange}
                                                    value={this.state.currencyTo}>
                                                {this.state.currencies.map(currency => (
                                                    <option value={currency.code}
                                                            key={currency.code}>{`${currency.code} (${currency.name})`}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="amount2"><h3>Result</h3></label>
                                            <input type="number" className="form-control form-control-lg amountInput"
                                                   id="amount2" value={this.state.result} disabled/>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <CurrenciesTable currencies={this.state.currencies}/>
                        <Footer/>
                    </Fragment>
                )}
            </ThemeContext.Consumer>
        );
    }
}
