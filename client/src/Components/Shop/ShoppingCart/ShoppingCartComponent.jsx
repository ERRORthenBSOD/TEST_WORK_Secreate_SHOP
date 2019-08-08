import React, {useState} from 'react';
import {
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";

const useStyles = makeStyles(theme => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: '700',
    },
    title: {
        marginTop: theme.spacing(2),
    },
    layout: {
        width: 'auto',

        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginBottom: 115,
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: 115,
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    formControl:{
        marginTop: 10,
        display: 'flex',
        justifyContent: 'center'
    }
}));





function ShoppingCartComponent(props) {
    const classes = useStyles();
    const {products, EUR, USD} = props;
    const [currency, setCurrency] = useState('$');
    function currencyPrice(price){
        switch (currency) {
            case 'руб.' :
                return Math.round(parseInt(price,10) * USD);
            case '\u20ac':
                return Math.round(parseInt(price,10) * (USD / EUR));
            case '$' :
                return price;
            default:
                return price;
        }
    }
    return (
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h4" align="center">
                    Чек
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Ваш заказ
                </Typography>
                <List disablePadding>
                    {products.map(product => (
                        <ListItem className={classes.listItem} key={product.id}>
                            <ListItemText primary={product.title} secondary={
                                <>
                                    <p>{`Количество: ${product.quantity}`}</p>

                                    <p>{`Цена за один: ${currencyPrice(product.price)}${currency}`}</p>
                                </>
                            }/>

                            <Typography variant="body2">{`Всего: ${currencyPrice(product.price * product.quantity)}${currency}`}</Typography>
                        </ListItem>
                    ))}
                    <ListItem className={classes.listItem}>
                        <ListItemText primary="Итого: " />
                        <Typography variant="subtitle1" className={classes.total}>
                            {currencyPrice(products.reduce((acc, val)=> acc += (val.price * val.quantity),0))}{currency}
                        </Typography>
                    </ListItem>
                </List>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="currency">
                        Валюта
                    </InputLabel>
                    <Select
                        value={currency}
                        onChange={(e) => {setCurrency(e.target.value)}}
                        input={<OutlinedInput  labelWidth={55} name="currency" id="currency" />}
                    >
                        <MenuItem value={'$'}>Доллары</MenuItem>
                            <MenuItem value={'\u20ac'}>Евро</MenuItem>
                        <MenuItem value={'руб.'}>Рубли</MenuItem>
                    </Select>
                </FormControl>

            </Paper>
        </main>
    );
}

const mapStateToProps = (state) => {
    return {products: state.products}
};

export default connect(mapStateToProps)(ShoppingCartComponent);

ShoppingCartComponent.propTypes = {
    products: PropTypes.array,
};
