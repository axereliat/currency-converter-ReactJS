import React, {Component, Fragment} from 'react';
import './Home.css';
import ThemeContext from '../context/theme-context';
import {Requester} from "../api/Requester";

export default class Home extends Component {

    state = {
        currencies: []
    };

    componentDidMount() {
        Requester.fetchCurrencies()
            .then(res => {
                this.setState({
                    currencies: res.data
                })
            })
            .catch(err => {
                console.log(err.response);
            });
    }

    render() {
        return (
            <ThemeContext.Consumer>
                {context => (
                    <Fragment>
                        <div className="text-center">
                            <button className={"btn btn-secondary btn-lg mt-3 mb-2 " + (context.theme === 'darkTheme' ? 'lightTheme' : 'darkTheme')}
                                    onClick={() => context.toggleTheme()}>
                                {context.theme === 'darkTheme' ? 'Switch to light mode' : 'Switch to dark mode'}
                            </button>
                        </div>
                        <div className={"jumbotron " + context.theme}>
                            <form>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="currency1"><h3>Currency I have:</h3></label>
                                            <select className="form-control" id="currency1">
                                                {this.state.currencies.map(currency => (
                                                    <option value={currency.name}>{currency.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="amount1">Amount:</label>
                                            <input type="number" className="form-control" id="amount1"
                                                   placeholder="Enter amount"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="currency2"><h3>Currency I want:</h3></label>
                                            <select className="form-control" id="currency2">
                                                {this.state.currencies.map(currency => (
                                                    <option value={currency.name}>{currency.name}</option>
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
