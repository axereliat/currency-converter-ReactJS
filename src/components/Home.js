import React, {Component, Fragment} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ResettableTimer from "./ResettableTimer";
import './Home.css';
import ThemeContext from '../context/theme-context';
import {baseURL, Requester} from "../api/Requester";
import Footer from "./Footer";
import CurrenciesTable from "./CurrenciesTable";
import CurrencyGraphicsModal from "./CurrencyGraphicsModal";
import CurrencyDropdown from "./CurrencyDropdown";

export default class Home extends Component {

    state = {
        currencies: [],
        currencyFrom: '',
        currencyTo: '',
        result: '0.00',
        amount: '',
        selectedCurrency: null,
        graphicsModal: false,
        graphicsData: [],
        hasError: false,
        loading: false
    };

    isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    componentDidMount() {
        this.fetchCurrencies();
    }

    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true});
    }

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
                            currencyFrom: this.isJson(localStorage.getItem('currencyFrom')) ? JSON.parse(localStorage.getItem('currencyFrom')) : this.state.currencies[0],
                            currencyTo: this.isJson(localStorage.getItem('currencyTo')) ? JSON.parse(localStorage.getItem('currencyTo')) : this.state.currencies[0],
                            amount: localStorage.getItem('amount') || '',
                            result: localStorage.getItem('result') || '',
                            loading: false
                        })
                    })
                })
                .catch(err => {
                    console.log(err.response);
                    this.setState({loading: false, hasError: true});
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
            this.calculateResult(targetValue);
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

        const currencyFromEuroRate = this.state.currencyFrom.euroRate;
        const currencyToEuroRate = this.state.currencyTo.euroRate;

        const result = Math.round(currencyToEuroRate / currencyFromEuroRate * inputAmount * 100) / 100;
        console.log(result);

        localStorage.setItem('result', result);
        this.setState({result: result.toFixed(2)});
    };

    selectCurrency = currency => {
        Requester.fetchCurrenciesGraphicsData()
            .then(res => {
                const graphicsData = [];
                for (const item of res.data) {
                    for (const innerItem of item.cube.filter(x => x.currency === currency.code)) {
                        graphicsData.push({
                            x: new Date(item.time),
                            y: +innerItem.rate
                        });
                    }
                }
                this.setState({
                    graphicsData,
                    selectedCurrency: currency
                });
            })
            .catch(err => {
                console.log(err.response);
                this.setState({hasError: true});
            })
    };

    toggleModal = () => {
        this.setState({
            graphicsModal: !this.state.graphicsModal
        });
    };

    dropDownChangeState = (c, currency) => {
        this.setState({
            [c]: currency,
        }, () => {
            localStorage.setItem(c, JSON.stringify(currency));
            this.calculateResult(this.state.amount);
        });
    };

    downloadPdf = () => {
        window.open(baseURL + 'download-currencies', '_blank');
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="jumbotron">
                    <h1 className="text-center">Something went wrong :(</h1>
                </div>
            );
        }

        return (
            <ThemeContext.Consumer>
                {context => (
                    <Fragment>
                        <h1 className="text-center mt-2">Currency Converter</h1>
                        <hr/>
                        <ResettableTimer seconds={60}
                                         color="#000"
                                         alpha={0.9}
                                         size={80}
                                         fetchCurrencies={this.fetchCurrencies}/>
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
                                            <CurrencyDropdown currencies={this.state.currencies}
                                                              type={'currencyFrom'}
                                                              currencySelection={this.state.currencyFrom}
                                                              dropDownChangeState={this.dropDownChangeState}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="amount1"><h3>Amount</h3></label>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" id="basic-addon1">
                                                        <img src={this.state.currencyFrom.countryFlagUrl} width="30px"
                                                             alt="No image..."/>
                                                    </span>
                                                </div>
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
                                            <CurrencyDropdown currencies={this.state.currencies}
                                                              type={'currencyTo'}
                                                              currencySelection={this.state.currencyTo}
                                                              dropDownChangeState={this.dropDownChangeState}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="amount2"><h3>Result</h3></label>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" id="basic-addon1">
                                                        <img src={this.state.currencyTo.countryFlagUrl} width="30px"
                                                             alt="No image..."/>
                                                    </span>
                                                </div>
                                                <input type="number"
                                                       className="form-control form-control-lg amountInput"
                                                       id="amount2" value={this.state.result} disabled/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <h2 className="text-center text-muted">Currencies Table</h2>
                        <button className="btn btn-primary" onClick={this.downloadPdf}>Download PDF</button>
                        <CurrenciesTable currencies={this.state.currencies}
                                         selectCurrency={this.selectCurrency}
                                         toggleModal={this.toggleModal}/>
                        <Footer/>
                        <CurrencyGraphicsModal currency={this.state.selectedCurrency}
                                               selectCurrency={this.selectCurrency}
                                               isModalOpen={this.state.graphicsModal}
                                               toggleModal={this.toggleModal}
                                               graphicsData={this.state.graphicsData}/>
                    </Fragment>
                )}
            </ThemeContext.Consumer>
        );
    }
}
