import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, IconButton, Toolbar, Typography, Menu, MenuItem, Badge} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Clear from '@material-ui/icons/Clear';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import {removeProduct} from '../../Actions/productsActions'
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import {connect} from 'react-redux'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontWeight: 600,
    },
    redText: {
        color: 'red',
        fontWeight: 600,
    },
    greenText: {
        color: '#4BB543',
        fontWeight: 600,
    },
    favColor:{
        color: theme.palette.favorite,
    },
    cartMenu: {
        display: 'flex',
        margin: 'auto',
        width: '100%',
        justifyContent: 'center'
    },
    cartTitle:{
        marginRight: 10,
        color: theme.palette.white,
    },
    badge:{
        color: theme.palette.white,
    },
    menuItem:{
        display: 'flex',
        justifyContent: 'space-between'
    },
    goToCart:{
        fontWeight:600,
        color:theme.palette.favorite,
    }
}));





const Header = props => {
    const {toggleDrawer, logout, products, removeProduct} = props;
    const classes = useStyles();
    const userLocal = JSON.parse(localStorage.getItem('user'));


    const [anchorEl, setAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);

    function handleCartMenuOpen(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleCartMenuClose() {
        setAnchorEl(null);
    }

    function goToCart() {
        props.history.push('/cart')
    }

    // Мини корзина в хедере
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            id='cartMenu'
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleCartMenuClose}
        >
            {products.length > 0 && products.map((product) => (
                // Math.random в ключе тут не так страшен
                <MenuItem key={Math.random()}  className={classes.menuItem}>
                    {product.title} X{product.quantity}
                    <IconButton color="secondary" className={classes.button} onClick={() => {handleCartMenuClose();removeProduct(product)}}>
                        <Clear className={classes.favColor}/>
                    </IconButton>
                </MenuItem>
            ))}
            <MenuItem className={classes.goToCart}>Общая стоймость {products.reduce((acc, val)=> acc += (val.price * val.quantity),0)}$</MenuItem>
            <MenuItem onClick={goToCart} className={classes.goToCart}>Перейти в корзину</MenuItem>
        </Menu>
    );

    return (
        <div className={classes.root}>
            <AppBar position="static" color={"primary"}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} id="menuOpen" color="inherit" aria-label="Menu"
                                onClick={toggleDrawer(true)}>
                        <MenuIcon className={classes.favColor}/>
                    </IconButton>
                    <Typography variant="h4"  className={classes.title}>
                        {props.location.pathname === '/shop' && 'Магазин'}
                        {props.location.pathname === '/cart' && 'Корзина покупок'}
                    </Typography>
                    {props.location.pathname !== '/cart' &&
                        <div className={classes.cartMenu}>
                            <IconButton
                                edge="end"
                                aria-label="shop cart of current user"
                                aria-controls={'cartMenu'}
                                aria-haspopup="true"
                                onClick={handleCartMenuOpen}
                                color="inherit"
                            >
                                <Typography variant="h4" className={classes.cartTitle}>Корзина</Typography>
                                <Badge badgeContent={products.length} className={classes.badge}>
                                    <ShoppingCart/>
                                </Badge>
                            </IconButton>
                        </div>
                    }
                    {renderMenu}
                    <Grid>
                        {userLocal && <>
                        <Typography variant="h6" className={classes.title}>
                            {userLocal.email.split('@')[0]}
                        </Typography></>}
                    </Grid>
                    <IconButton color="secondary" className={classes.button} onClick={logout}>
                        <ExitToApp className={classes.favColor}/>
                        <Typography className={classes.favColor}>Выход</Typography>
                    </IconButton>
                </Toolbar>
            </AppBar>

        </div>
    );
};

const mapStateToProps = (state) => {
    return {products: state.products}
};

export default connect(mapStateToProps,{removeProduct})(withRouter(Header));

Header.propTypes = {
    toggleDrawer: PropTypes.func,
    history: PropTypes.object,
    logout: PropTypes.func,
    removeProduct: PropTypes.func,
    products: PropTypes.array,
};