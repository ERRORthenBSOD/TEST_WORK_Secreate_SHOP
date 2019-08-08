const express = require('express');
const Router = express.Router();
const db = require('../db/db');
const verifyToken = require('../helper/jwtHelper');


// Запрос на товары по количеству начиная с 6х
Router.get('/', verifyToken, async (req, res) => {
    const currencies = db.getData(`/shop/currencies`);
    return res.status(200).json({result: 'success', data:currencies})
});



module.exports = Router;