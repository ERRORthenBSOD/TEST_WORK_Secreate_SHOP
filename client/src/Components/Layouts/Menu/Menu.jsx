import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom'
import menuItems from './menuItems'


import {SwipeableDrawer,} from '@material-ui/core';
import PropTypes from "prop-types";


const useStyles = makeStyles(theme => (
    {
        list: {
            width: 400,
            color: theme.palette.secondary.main,
        },
        fullList: {
            width: 'auto',

        },
        title: {
            textAlign: 'center',
            color: theme.palette.secondary.main,
            padding: 10,
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            // flexBasis: '33.33%',
            flexShrink: 0,
            fontWeight: 600
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
        menuList: {
            padding: 0,
            ...theme.typography.button,
            backgroundColor: theme.palette.background.paper,
        },
        listTitle: {
            fontWeight: 600
        },
        noPadding: {
            padding: '0 0 0 24px'
        }
    }
));

function Menu(props) {
    const classes = useStyles();
    const {toggleDrawer, menuOpened, logout} = props;

    return (
        <>
            <SwipeableDrawer
                open={menuOpened}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {menuItems(toggleDrawer, classes ,logout)}
            </SwipeableDrawer>
        </>
    );
}

export default withRouter(Menu);

Menu.propTypes = {
    toggleDrawer: PropTypes.func,
    menuOpened: PropTypes.bool,
    logout: PropTypes.func,
    history: PropTypes.object,
};