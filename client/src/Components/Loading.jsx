import React from 'react';
import {CircularProgress} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    logo: {
        height: 100,
        margin: 'auto',
        display: 'flex',
        marginTop: '15%'
    },
    loadingUserCard:{
        display: 'flex',
        justifyContent: 'center',
    }
}));


function Loading() {
    const classes = useStyles();
    return (
        <>
            <img src='/images/logo.png' className={classes.logo} alt='logo'/>
            <div className={classes.loadingUserCard}>
                <CircularProgress className={'loadingUserCardProgress'}/>
                <h2>&nbsp; загрузка...</h2>
            </div>
        </>
    );
}

export default Loading;