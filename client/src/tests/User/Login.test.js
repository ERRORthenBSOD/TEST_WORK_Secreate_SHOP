import React from 'react';
import Login from '../../Controllers/User/Login/';
import LoginComponent from '../../Components/User/Login/LoginComponent';
import { shallow } from 'enzyme';
import {shallowWithRouter} from '../Helpers/mountWithRouter'


const handleSubmit = jest.fn();
it('Login renders without crashing', () => {
    const wrapper = shallow(<LoginComponent handleSubmit={handleSubmit}/>);
    expect(wrapper).toMatchSnapshot();
});

test("User enters login details", () => {
    const onSubmit = jest.fn();
    const email ='example@domain.com';
    const password ='12345';
    const emailEvent = {target: { value: email }};
    const passwordEvent = {target: { value: password }};
    const controller = shallowWithRouter(<Login onSubmit={onSubmit}/>).dive().dive().dive().dive().dive();
    const component = controller.find('LoginComponent').dive();
    component.find('#email').props().onChange(emailEvent);
    component.find('#password').props().onChange(passwordEvent);
    expect(controller.state().email).toEqual(email);
    expect(controller.state().password).toEqual(password);
});

test("No info was submitted on login", () => {
    const preventDef = jest.fn();
    const onSubmit = jest.fn();
    const controller = shallowWithRouter(<Login onSubmit={onSubmit}/>).dive().dive().dive().dive().dive();
    const component = controller.find('LoginComponent').dive();
    component.find('#loginForm').props().onSubmit(preventDef);
    expect(component).toMatchSnapshot();
});
