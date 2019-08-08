import {ADD_PRODUCT, REMOVE_PRODUCT} from '../Constants/productsConstants'

export const addProduct= (product, quantity) => {
    return {
        type: ADD_PRODUCT,
        product,
        quantity
    }
};

export const removeProduct= (product) => {
    return {
        type: REMOVE_PRODUCT,
        product,
    }
};