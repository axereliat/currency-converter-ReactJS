import React from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";

let lastLetter = null;

const CurrencyDropdown = ({currencySelection, currencies, type, dropDownChangeState}) => (
    <UncontrolledDropdown size={'lg'}>
        <DropdownToggle caret color="light">
            <img src={currencySelection.countryFlagUrl}
                 alt="No image..."/>{' ' + currencySelection.name}
            <strong> {currencySelection.code}</strong>
        </DropdownToggle>
        <DropdownMenu right style={{maxHeight: '600px', overflow: 'auto'}}>
            {currencies.map((currency, index) => {
                const currentLetter = currency.name[0];
                let firstLetterJsx = null;
                if (currentLetter !== lastLetter) {
                    lastLetter = currentLetter;
                    firstLetterJsx = <strong className='ml-3'>{lastLetter}</strong>;
                }
                return (
                    <React.Fragment>
                        {firstLetterJsx}
                        <DropdownItem
                            onClick={() => dropDownChangeState(type, currency)}
                            key={currency.code}
                            style={{width: '400px'}}
                            active={currency.code === currencySelection.code}>
                            <img src={currency.countryFlagUrl}
                                 alt="No image..."/>{' ' + currency.name}
                            <strong className="float-right">{currency.code}</strong>
                        </DropdownItem>
                        <DropdownItem
                            divider={index < currencies.length - 1 && currency.code[0] !== currencies[index + 1].code[0]}/>
                    </React.Fragment>
                )
            })}
        </DropdownMenu>
    </UncontrolledDropdown>
);

export default CurrencyDropdown;
