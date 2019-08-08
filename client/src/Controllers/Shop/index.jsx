import React, {PureComponent, lazy, Suspense} from 'react';
import MainLayout from '../../Components/Layouts/MainLayout'
import apiRequest from '../../Helpers/apiRequest'
import {PRODUCTS} from '../../config'
import Swal from "sweetalert2";
import Loading from "../../Components/Loading";

class Shop extends PureComponent {
    state = {
        products: [],
        totalProducts: 0,
        alreadyDownloaded: 0,
        ref: null,
        noProductsLeft: false,
    };


    componentDidMount() {
        apiRequest(`${PRODUCTS}/6`,'GET',{}, {}).then(({data}) => {
            if(data.result === 'success') this.setState({products: data.data, totalProducts: data.totalProducts, alreadyDownloaded: 6})
        })
    }
    

    // загружаем по 6 ведя учёт количества загрузок alreadyDownloaded
    downloadMore = async () => {
        apiRequest(`${PRODUCTS}/${this.state.alreadyDownloaded+6}`,'GET', {}, {}).then(({data}) => {
            if(data.result === 'success') {
                // Проверка остались ли еще картинки в бд
                if(JSON.stringify(data.data) !== JSON.stringify(this.state.products)){
                    console.log(data.data);
                    this.setState({products: data.data, totalProducts: data.totalProducts, alreadyDownloaded: this.state.alreadyDownloaded+6})
                }else{
                    Swal.fire({
                        confirmButtonColor: '#ff3366',
                        titleText: 'Внимание!',
                        text: 'Больше нет товаров',
                        type: 'warning'
                    });
                    this.setState({noProductsLeft: true})
                }

            }
        })
    };

    render() {
        const ShopComponent = lazy(() => import('../../Components/Shop/ShopComponent'));
        const {products, totalProducts,noProductsLeft,} = this.state;
        return (
            <MainLayout>
                <Suspense fallback={<Loading/>}>
                    <ShopComponent
                        products={products}
                        totalProducts={totalProducts}
                        noProductsLeft={noProductsLeft}
                        downloadMore={this.downloadMore}
                        addProduct={this.props.addProduct}
                        removeProduct={this.props.removeProduct}
                    />
                </Suspense>
            </MainLayout>
        );
    }
}



export default Shop;

