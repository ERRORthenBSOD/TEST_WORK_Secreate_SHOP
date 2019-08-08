import {mount, shallow} from "enzyme";
import React from "react";
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom';
export const shallowWithRouter = node => shallow(<Router>{node}</Router>);
export const mountWithRouter = node => shallow(<Router>{node}</Router>);
