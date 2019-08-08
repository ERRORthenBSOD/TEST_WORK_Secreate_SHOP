import React, {useState} from 'react';
import Header from './Header';
import Footer from './Footer';
import Menu from "./Menu/Menu";
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

// Обертка для всех компонентов с хедером и футером

// и Компонент меню причем на мобилках он свайпается
function MainLayout(props) {
    const { history, children } = props;
    const [menuOpened, triggerMenu] = useState(false);
    const toggleDrawer = (open, path = null) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
        if(!path) return triggerMenu(open);
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user)return window.location.replace(`${window.location.origin}/login`);
        triggerMenu(open);
        if(history.location.pathname === `/${path}`) return triggerMenu(open);
        else history.push(`/${path}`)
    };
    const logout = () => {
        localStorage.clear();
        history.push(`/login`)
    };


    return (
        <>
            <Menu
                toggleDrawer={toggleDrawer}
                triggerMenu={triggerMenu}
                menuOpened={menuOpened}
                logout={logout}
            />
            <Header
                toggleDrawer={toggleDrawer}
                logout={logout}
            />
                {children}
            <Footer/>
        </>
    );
}

export default withRouter(MainLayout);

MainLayout.propTypes = {
    history: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ])
};
