import React from 'react';
import ThemeContext from "../context/theme-context";

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
                        <td><button className="btn btn-primary" onClick={() => {toggleModal(); selectCurrency(currency)}}>View Graphics</button></td>
                    </tr>
                )) : null}
                </tbody>
            </table>
        )}
    </ThemeContext.Consumer>
);

export default CurrenciesTable;
