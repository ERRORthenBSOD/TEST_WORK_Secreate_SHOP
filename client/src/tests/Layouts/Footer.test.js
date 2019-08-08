import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../Components/Layouts/Footer'

it('Footer renders without crashing', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toMatchSnapshot()
});