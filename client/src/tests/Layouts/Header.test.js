import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../Components/Layouts/Header'
import {shallowWithRouter} from '../Helpers/mountWithRouter'

it('Header renders without crashing', () => {
    const wrapper = shallowWithRouter(<Header />);
   expect(wrapper).toMatchSnapshot()
});