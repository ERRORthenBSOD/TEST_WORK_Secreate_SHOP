import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import "core-js";
import React from 'react';
import {render} from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './Styles/main.css';
import {MuiThemeProvider} from '@material-ui/core/styles'
import theme from './Theme';
import Routes from './Routes';
import {CssBaseline} from "@material-ui/core";
import {Provider} from 'react-redux';
import rootReducer from './Reducers';
import {createStore } from "redux";
import { devToolsEnhancer  } from 'redux-devtools-extension';

const store = createStore(rootReducer, devToolsEnhancer() );

// Обернем наши компоненты в MuiThemeProvider для того чтобы тема всегда была с нами
const App = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline/>
            <Provider store={store}>
                <Routes/>
            </Provider>
        </MuiThemeProvider>
    )
};


render(<App/>, document.getElementById('root') || document.createElement('div'));

// if (module.hot) {
//     module.hot.accept(App, () => {
//         const NextApp = require('./index.jsx').default;
//         render(NextApp);
//     });
// }

serviceWorker.unregister();


export default App;


