import React from 'react';
import ReactDOM from 'react-dom';
import Routes from '../Routes';
import Index from '../index';

it('Routes render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Routes />, div);
  ReactDOM.unmountComponentAtNode(div);
});


it('renders without crashing', () => {
  expect(JSON.stringify(
      Object.assign({}, Index, { _reactInternalInstance: 'censored' })
  )).toMatchSnapshot();
});