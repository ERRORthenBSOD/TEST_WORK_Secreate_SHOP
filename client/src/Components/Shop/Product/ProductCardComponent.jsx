import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'
import {addProduct} from '../../../Actions/productsActions'
import {
    CardContent,
    Typography,
    CardActions,
    Card,
    Button,
    IconButton,
    CardMedia,
    CardHeader
} from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'block',
        textAlign: 'center'
    },
    price:{
        fontWeight: 600,
        paddingTop: 0,
    },
    quantity:{
        display: 'inline',
        verticalAlign: 'middle'
    }
}));

function releaseDay(id){
    return moment().subtract(id, 'days').calendar(null,{
        sameDay: '[Сегодня]',
        lastDay: '[Вчера]',
        lastWeek: '[На прошлой неделе]',
        sameElse: 'DD/MM/YYYY'
    })
}

const ProductCard = props => {
    const { product, refs, addProduct } = props;
    const classes = useStyles();


    const [quantity, changeQuantity] = useState(0);
    return (
        <Card
            className={classes.root}
            ref={refs[product.id]}
        >
            <CardHeader
                title={product.title}
                subheader={`Дата выхода: ${releaseDay(product.id)}`}
            />
            <CardMedia
                className={classes.media}
                image={product.src}
                title={product.title}
            />
            <CardContent>
                <Typography variant="body1" color="textSecondary" component="p">
                    {product.desc}
                </Typography>
                <br/>
                <Typography
                    align={"center"}
                    className={classes.price}
                    variant="h3"
                >
                    Цена: {product.price}$
                </Typography>
            </CardContent>
            <CardActions className={classes.actions}>
                <div>
                    <IconButton color="secondary" className={classes.button} onClick={()=>{
                        if(quantity !== 0) changeQuantity(quantity-1)
                    }}>
                        <Remove/>
                    </IconButton>
                        <Typography variant="h3"  align={"center"} className={classes.quantity}>
                            {quantity}
                        </Typography>
                    <IconButton color="secondary" className={classes.button} onClick={()=>changeQuantity(quantity+1)}>
                        <Add/>
                    </IconButton>
                </div>
                <div>
                    <Button variant={"contained"} disabled={!(quantity > 0)} color={"primary"} onClick={() => {
                        addProduct(product, quantity);
                        changeQuantity(0)
                    }}>
                        <Typography variant="button" display="block" gutterBottom>
                            Добавить в корзину
                        </Typography>
                    </Button>

                </div>
            </CardActions>
        </Card>
    );
};

ProductCard.propTypes = {
    className: PropTypes.string,
    product: PropTypes.object.isRequired,
    addProduct: PropTypes.func,
    removeProduct: PropTypes.func,
};

export default connect(null, {addProduct})(ProductCard);