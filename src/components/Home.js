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
        loading: false
    };

    componentDidMount() {
        this.setState({loading: true}, () => {
            Requester.fetchCurrencies()
                .then(res => {
                    this.setState({
                        currencies: [...new Set(res.data.map(item => item.name))].sort((a, b) => a.localeCompare(b)),
                    }, () => {
                        this.setState({
                            currencyFrom: localStorage.getItem('currencyFrom') || this.state.currencies[0],
                            currencyTo: localStorage.getItem('currencyTo') || this.state.currencies[0],
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
        this.setState({
            [e.target.name]: e.target.value
        });
        localStorage.setItem(e.target.name, e.target.value);
    };

    swapCurrencies = e => {
        e.preventDefault();

        const {currencyFrom, currencyTo} = {...this.state};

        this.setState({
            currencyFrom: currencyTo,
            currencyTo: currencyFrom,
        });
        localStorage.setItem('currencyFrom', currencyTo);
        localStorage.setItem('currencyTo', currencyFrom);
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
                                                    <option value={currency} key={currency}>{currency}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="amount1">Amount:</label>
                                            <input type="number" className="form-control" id="amount1"
                                                   placeholder="Enter amount"/>
                                        </div>
                                    </div>
                                    <div className="col-md-2 text-center mt-md-5">

                                        <button className="btn btn-primary" onClick={this.swapCurrencies} disabled={this.state.loading}>
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
                                                    <option value={currency} key={currency}>{currency}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="amount2">Amount:</label>
                                            <input type="number" className="form-control form-control-plaintext"
                                                   id="amount2" disabled/>
                                        </div>
                                    </div>
                                </div>
                                {/*<button type="submit" className="btn btn-primary btn-lg btn-block">Convert</button>*/}
                            </form>
                        </div>
                    </Fragment>
                )}
            </ThemeContext.Consumer>
        );
    }
}
