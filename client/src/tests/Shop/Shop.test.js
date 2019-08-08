import React from 'react';
import { shallow } from 'enzyme';
import Shop from '../../Controllers/Shop'
import ShoppingCart from '../../Controllers/ShoppingCart'
import {shallowWithRouter} from '../Helpers/mountWithRouter'

it('Shop page renders without crashing', () => {
    const wrapper = shallowWithRouter(<Shop />);
    expect(wrapper).toMatchSnapshot()
});

it('Shop page renders without crashing', () => {
    const wrapper = shallowWithRouter(<ShoppingCart />);
    expect(wrapper).toMatchSnapshot()
});