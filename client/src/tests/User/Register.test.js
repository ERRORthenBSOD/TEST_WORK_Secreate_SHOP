import React from 'react';
import { shallow } from 'enzyme';

import RegistrationComponent from '../../Components/User/Registration/RegistrationComponent';
import Registration from '../../Controllers/User/Registration/';
import {shallowWithRouter} from "../Helpers/mountWithRouter";


it('Registration components renders without crashing', () => {
    const wrapper = shallow(<Registration />);
    const wrapper2 = shallow(<RegistrationComponent />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper2).toMatchSnapshot();
});

test("User enters registration details", () => {
    const onSubmit = jest.fn();
    const email ='example123@domain.com';
    const password ='123456';
    const repeatPassword ='123456';
    const emailEvent = {target: { value: email }};
    const passwordEvent = {target: { value: password }};
    const repeatPasswordEvent = {target: { value: repeatPassword }};
    const controller = shallowWithRouter(<Registration onSubmit={onSubmit}/>).dive().dive().dive().dive().dive();
    const component = controller.find('RegistrationComponent').dive();
    component.find('#email').props().onChange(emailEvent);
    component.find('#password').props().onChange(passwordEvent);
    component.find('#repeatPassword').props().onChange(repeatPasswordEvent);
    expect(controller.state().email).toEqual(email);
    expect(controller.state().password).toEqual(password);
    expect(controller.state().repeatPassword).toEqual(repeatPassword);
});

test("No info was submitted on registration", () => {
    const preventDef = jest.fn();
    const onSubmit = jest.fn();
    const controller = shallowWithRouter(<Registration onSubmit={onSubmit}/>).dive().dive().dive().dive().dive();
    const component = controller.find('RegistrationComponent').dive();
    component.find('#registrationForm').props().onSubmit(preventDef);
    expect(component).toMatchSnapshot();
});

test("Should submit valid info", () => {
    const email ='example123@domain.com';
    const password ='123456';
    const repeatPassword ='123456';
    const onSubmit = jest.fn();
    onSubmit(email,password);
    const controller = shallowWithRouter(<Registration onSubmit={onSubmit}/>).dive().dive().dive().dive().dive();
    controller.setState({email,password,repeatPassword});
    expect(onSubmit).toHaveBeenLastCalledWith(email, password)
});