import React from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";

const CurrencyDropdown = ({currencySelection, currencies, type, dropDownChangeState}) => (
    <UncontrolledDropdown size={'lg'}>
        <DropdownToggle caret color="light">
            <img src={currencySelection.countryFlagUrl}
                 alt="No image..."/>{' ' + currencySelection.name}
            <strong> {currencySelection.code}</strong>
        </DropdownToggle>
        <DropdownMenu right>
            {currencies.map((currency, index) => (
                <React.Fragment>
                    {(index < currencies.length - 1 && currency.code[0] !== currencies[index + 1].code[0]) || index === 0 ?
                        <strong className='ml-3'>{currency.code[0]}</strong>
                        : null
                    }
                    <DropdownItem
                        onClick={() => dropDownChangeState(type, currency)}
                        key={currency.code}
                        style={{width: '400px'}}
                        active={currency.code === currencySelection.code}>
                        <img src={currency.countryFlagUrl}
                             alt="No image..."/>{' ' + currency.name}
                        <strong className="float-right">{currency.code}</strong>
                    </DropdownItem>
                    <DropdownItem divider={index < currencies.length - 1 && currency.code[0] !== currencies[index + 1].code[0]}/>
                </React.Fragment>
            ))}
        </DropdownMenu>
    </UncontrolledDropdown>
);

export default CurrencyDropdown;
