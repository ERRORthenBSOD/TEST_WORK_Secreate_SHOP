import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
    Button,
    Typography,
    Grid,
} from '@material-ui/core';
import PropTypes from "prop-types";
import ProductCard from "./Product/ProductCardComponent";


const useStyles = makeStyles(theme => ({
        root: {
            padding: theme.spacing(3),
            marginBottom: 60,
        },
        dwnlBtn: {
            fontWeight: 600,
            transition: 'all .2s',
            margin: '25px 0 0 0',
            '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 1rem 2rem rgba($color-black,.2)',
                '&::after': {
                    transform: 'scaleX(1.4) scaleY(1.6)',
                    opacity: 0
                }
            },
        },
    }
));


const ShopComponent = props => {
    const {products, downloadMore, noProductsLeft} = props;
    const classes = useStyles();
//Создаем реф для каждого элемента
    const refs = products.reduce((acc, value) => {
        acc[value.id] = React.createRef();
        return acc;
    }, {});

    // Плавный скрол прт добавлении новых элементов
    useEffect(() => {
        if(Object.keys(refs).length > 6){
            setTimeout(() => {refs[products.length-1].current.scrollIntoView({
                behavior: 'smooth',
            });
            }, 250)
        }
    }, [refs, products.length]);

    return (
        <div className={classes.root}>
            {products.length > 0 ?
                <>
                    <Grid
                        container
                        spacing={3}
                    >
                        {products.map(product => (
                            <Grid
                                item
                                key={product.id}
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                <ProductCard product={product} refs={refs} />
                            </Grid>
                        ))}
                    </Grid>
                    {!noProductsLeft && <Grid container
                                              direction="row"
                                              justify="center"
                                              alignItems="center">
                        <Button color={"secondary"} variant={"contained"} className={classes.dwnlBtn} onClick={() => {
                            downloadMore()
                        }}>Загрузить еще</Button>
                    </Grid>}
                </> :
                <Typography variant="h5" component="h3" className={classes.textNotFound}>
                    Не найдено ни одного товара
                </Typography>
            }
        </div>
    );
};
ShopComponent.propTypes = {
    products: PropTypes.array,
    noProductsLeft: PropTypes.bool,
    deleteImage: PropTypes.func,
    downloadMore: PropTypes.func,
};

export default ShopComponent;