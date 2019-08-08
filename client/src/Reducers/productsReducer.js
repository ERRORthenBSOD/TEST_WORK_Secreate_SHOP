import {ADD_PRODUCT, REMOVE_PRODUCT} from '../Constants/productsConstants'

// редюсер продуктов
export default function productsReducer(state = [], {type, product, quantity}) {
    switch (type) {
        case ADD_PRODUCT:
            if(state.some((prod) => prod.id === product.id )) {
                return state.map((prod) => prod.id === product.id ? { ...prod, quantity: prod.quantity + quantity } : prod);
            } else {
                let newObj = Object.assign({}, product);
                newObj['quantity'] = quantity;
                return state.concat([newObj]);
            }
        case REMOVE_PRODUCT:
            return state.filter((prod) => {
                return prod.id !== product.id
            });
        default:
            return state
    }
}
