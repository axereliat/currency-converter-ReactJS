import React, {Component, Fragment} from 'react';
import './Home.css';
import ThemeContext from '../context/theme-context';
import {Requester} from "../api/Requester";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
        this.setState({loading: true}, () => {
            Requester.fetchCurrencies()
                .then(res => {
                    this.setState({
                        currencies: [...new Set(res.data.map(item => item.name))]
                            .map(name => res.data.find(item => item.name === name))
                            .sort((a, b) => a.name.localeCompare(b.name))
                    }, () => {
                        this.setState({
                            currencyFrom: localStorage.getItem('currencyFrom') || this.state.currencies[0],
                            currencyTo: localStorage.getItem('currencyTo') || this.state.currencies[0],
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
        const targetValue = e.target.value;

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

        const currencyToEuroRate = this.state.currencies.find(item => item.name === this.state.currencyTo).euroRate;
        const currencyFromEuroRate = this.state.currencies.find(item => item.name === this.state.currencyFrom).euroRate;

        const result = Math.round(currencyToEuroRate / currencyFromEuroRate * inputAmount * 100) / 100;

        localStorage.setItem('result', result);
        this.setState({result: result.toFixed(2)});
    };

    render() {
        return (
            <ThemeContext.Consumer>
                {context => (
                    <Fragment>
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
                                            <label htmlFor="currencyFrom"><h3>Currency I have:</h3></label>
                                            <select className="form-control"
                                                    id="currencyFrom"
                                                    name="currencyFrom"
                                                    onChange={this.handleChange}
                                                    value={this.state.currencyFrom}>
                                                {this.state.currencies.map(currency => (
                                                    <option value={currency.name}
                                                            key={currency.name}>{currency.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="amount1">Amount:</label>
                                            <input type="number"
                                                   className="form-control"
                                                   id="amount1"
                                                   placeholder="Enter amount"
                                                   name="amount"
                                                   onChange={this.handleChange}
                                                   value={this.state.amount}/>
                                        </div>
                                    </div>
                                    <div className="col-md-2 text-center mt-md-5">

                                        <button className="btn btn-primary swapBtn" onClick={this.swapCurrencies}
                                                disabled={this.state.loading}>
                                            {!this.state.loading ? <FontAwesomeIcon icon="exchange-alt" size="3x"/> :
                                                <FontAwesomeIcon icon="spinner" size="3x" spin/>}
                                        </button>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="currencyTo"><h3>Currency I want:</h3></label>
                                            <select className="form-control"
                                                    id="currencyTo"
                                                    name="currencyTo"
                                                    onChange={this.handleChange}
                                                    value={this.state.currencyTo}>
                                                {this.state.currencies.map(currency => (
                                                    <option value={currency.name}
                                                            key={currency.name}>{currency.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="amount2">Amount:</label>
                                            <input type="number" className="form-control form-control-plaintext"
                                                   id="amount2" value={this.state.result} disabled/>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Fragment>
                )}
            </ThemeContext.Consumer>
        );
    }
}
