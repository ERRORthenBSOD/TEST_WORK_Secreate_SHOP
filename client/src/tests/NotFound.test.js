import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../Components/NotFound'

it('NotFoundPage renders without crashing', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper).toMatchSnapshot()
});