const express = require('express');
const Router = express.Router();
const db = require('../db/db');
const verifyToken = require('../helper/jwtHelper');


// Запрос на товары по количеству начиная с 6х
Router.get('/:id', verifyToken, async (req, res) => {
    let count;
    if(!req.params.id) count = 6;
    else count = req.params.id;
    let data = [];
    db.reload();
    const dbProductsArr = Array.from(db.getData(`/shop/products`));
    const totalProducts = dbProductsArr.length;
    for(let i = 0; i < count; i++){
        if(dbProductsArr.indexOf(dbProductsArr[i]) !== -1){
            data.push(dbProductsArr[i]);
        }
    }
    return res.status(200).json({result: 'success', data, totalProducts})
});



module.exports = Router;