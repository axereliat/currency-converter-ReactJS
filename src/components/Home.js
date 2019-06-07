import React, {Component, Fragment} from 'react';
import './Home.css';

export default class Home extends Component {

    render() {
        return (
            <Fragment>
                <div className="text-center">
                    <button className="btn btn-secondary btn-lg mt-3 mb-2">Toggle theme</button>
                </div>
                <div className="lightTheme">
                    <div className="jumbotron">
                        <form>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="currency1"><h3>Currency I have:</h3></label>
                                        <select className="form-control" id="currency1">
                                            <option>EUR</option>
                                            <option>CAD</option>
                                            <option>USD</option>
                                            <option>GBP</option>
                                            <option>AUD</option>
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
                                            <option>EUR</option>
                                            <option>CAD</option>
                                            <option>USD</option>
                                            <option>GBP</option>
                                            <option>AUD</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="amount2">Amount:</label>
                                        <input type="number" className="form-control form-control-plaintext"
                                               value="222222"
                                               id="amount2"/>
                                    </div>
                                </div>
                            </div>
                            {/*<button type="submit" className="btn btn-primary btn-lg btn-block">Convert</button>*/}
                        </form>
                    </div>
                </div>
            </Fragment>
        );
    }
}
