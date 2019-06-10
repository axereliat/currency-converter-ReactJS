import React from 'react';
import ThemeContext from "../context/theme-context";

const CurrenciesTable = ({currencies}) => (
    <ThemeContext.Consumer>
        {context => (
            <table className={"table " + context.theme}>
                <thead>
                <tr>
                    <th scope="col">Currency</th>
                    <th scope="col">Euro Rate</th>
                </tr>
                </thead>
                <tbody>
                {currencies.map(currency => (
                    <tr>
                        <td>
                            <img src={currency.countryFlagUrl} alt="No image..."/>
                            {' ' + currency.code + ' ' + currency.name}
                        </td>
                        <td>{currency.euroRate}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        )}
    </ThemeContext.Consumer>
);

export default CurrenciesTable;
