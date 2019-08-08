import React from 'react';
import { shallow } from 'enzyme';
import Loading from '../Components/NotFound'

it('Loading page renders without crashing', () => {
    const wrapper = shallow(<Loading />);
    expect(wrapper).toMatchSnapshot()
});