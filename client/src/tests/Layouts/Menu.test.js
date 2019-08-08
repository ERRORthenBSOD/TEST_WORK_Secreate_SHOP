import {shallow} from "enzyme";
import Menu from "../../Components/Layouts/Menu/Menu";
import React from "react";

it('Menu renders without crashing', () => {
    const wrapper = shallow(<Menu />);
    expect(wrapper).toMatchSnapshot()
});
