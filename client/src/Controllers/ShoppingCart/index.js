import React, {PureComponent, lazy, Suspense} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MainLayout from "../../Components/Layouts/MainLayout";
import Loading from "../../Components/Loading";
import apiRequest from '../../Helpers/apiRequest';
import {CURRENCY} from "../../config";


class ShoppingCart extends PureComponent {
    state = {
        EUR: 0,
        USD: 0,
    };

    componentDidMount() {
        // Запрашиваем актуальные курсы валют
        apiRequest(CURRENCY, 'GET', {}, {}).then((res) => {
            this.setState({
                EUR: res.data.data.EUR,
                USD: res.data.data.USD,
            })
        }).catch((e) => {
            console.log(`Error on currency get ${e}`);
        })
    }


    render() {
    const ShoppingCartComponent = lazy(() => import('../../Components/Shop/ShoppingCart/ShoppingCartComponent'));
    const { EUR, USD} = this.state;
        return (
            <MainLayout>
                <Suspense fallback={<Loading/>}>
                    <ShoppingCartComponent
                        EUR={EUR}
                        USD={USD}
                    />
                </Suspense>
            </MainLayout>
        );
    }
}

const mapStateToProps = (state) => {
    return {products: state.products}
};

ShoppingCart.propTypes = {
    products: PropTypes.array
};

export default connect(mapStateToProps)(ShoppingCart);