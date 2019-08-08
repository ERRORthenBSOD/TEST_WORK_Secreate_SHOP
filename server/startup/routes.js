const productsRouter = require('../routes/products');
const usersRouter = require('../routes/users');
const currencyRouter = require('../routes/currencies');
const config = require('../connectors/config');

module.exports = (app) => {
	app.use(`${config.get('express:prefix')}/products`, productsRouter); // роутер товаров
	app.use(`${config.get('express:prefix')}/user`, usersRouter); // роутер пользователей
	app.use(`${config.get('express:prefix')}/currency`, currencyRouter); // роутер пользователей
};
