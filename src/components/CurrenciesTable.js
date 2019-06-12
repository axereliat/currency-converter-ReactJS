import React from 'react';
import ThemeContext from "../context/theme-context";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const CurrenciesTable = ({currencies, selectCurrency, toggleModal}) => (
    <ThemeContext.Consumer>
        {context => (
            <table className={"table " + context.theme}>
                <thead>
                <tr>
                    <th scope="col">Currency</th>
                    <th scope="col">Euro Rate</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {currencies ? currencies.map(currency => (
                    <tr>
                        <td>
                            <img src={currency.countryFlagUrl} alt="No image..."/>
                            {' ' + currency.code + ' ' + currency.name}
                        </td>
                        <td>{currency.euroRate}</td>
                        <td>
                            <button className="btn btn-primary" onClick={() => {
                                toggleModal();
                                selectCurrency(currency)
                            }}>
                                <FontAwesomeIcon icon="chart-line" size="lg"/>
                            </button>
                        </td>
                    </tr>
                )) : null}
                </tbody>
            </table>
        )}
    </ThemeContext.Consumer>
);

export default CurrenciesTable;
