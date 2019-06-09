import React from 'react';
import {shallow} from 'enzyme';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from "./Home";

configure({adapter: new Adapter()});

it('fetches currencies in componentDidMount', () => {
    setTimeout(() => {
        const HomeComponent = shallow(<Home/>);
        expect(HomeComponent.state('currencies').length).toBeGreaterThan(0);
    }, 0);
});

it('swaps currencyFrom and currencyTo', () => {
    setTimeout(() => {
        const HomeComponent = shallow(<Home/>);

        HomeComponent.setState({currencyTo: 'BGN', currencyFrom: 'EUR'});

        HomeComponent.find('.swapBtn').simulate('click');
        expect(HomeComponent.state('currencyFrom')).toEqual('BGN');
        expect(HomeComponent.state('currencyTo')).toEqual('EUR');
    }, 0);
});
