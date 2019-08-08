const express = require('express');
const Router = express.Router();
const db = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Регистрация пользователей
Router.post('/register', async (req, res) => {
    if(!req.body || !req.body.email || !req.body.password ) return res.status(200).json({result: "error", data: 'no data received'});
    const {body} = req;
    const {email, password} = body;

    // Проверяем существует ли юзер если да то ошибка
    const userExist = Array.from(db.getData("/shop/users")).map((el) => el = el.email).includes(email);
    if(userExist) return res.status(200).json({result: 'error', data: 'User already exists'});


    //Хэшируем пароль
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds, (err, hash) => {
        if(err) return res.status(200).json({result: "error", data: 'error in storing hashed password'});

        // находим максимальный айди в базе чтобы добавить следующий по порядку
        let id = Math.max.apply(Math, db.getData("/shop/users").map((o) => { return o.id; })) + 1;
        const newUser = {id, email, password: hash };
        db.push("/shop/users[]", newUser, true); // Пушим нового пользователя
        return res.status(200).json({result: 'success', data: 'User created'})
    });
});


// Вход для пользователей
Router.post('/login', async (req, res) => {
    if(!req.body || !req.body.email || !req.body.password ) return res.status(200).json({result: "error", data: 'no data received'});
    const {body} = req;
    const {email, password} = body;
    // Проверяем существует ли юзер если да то ошибка
    let userIndex;
    const user = Array.from(db.getData("/shop/users")).find((user, index) => {
        userIndex = index;
        return user.email === email
    });
    if(!user) return res.status(200).json({result: 'error', data: 'Auth failed'});

    //записываем в переменные инфу о пользователе включая его индекс в массиве для обновления
    return bcrypt.compare(password, user.password,(err, result) => {
        if (result === true) {
            const token = jwt.sign(
                {
                    email: user.email,
                    userId: user.id
                },
                process.env.JWT_KEY
            );

            const newUser = {...user, token};
            db.delete(`/shop/users[${userIndex}]`);
            db.push("/shop/users[]", newUser, true);
            return res.status(200).json({result: 'success', data: 'Auth successful', token})
        } else {
            return res.status(200).json({result: 'error', data: 'Auth failed'});
        }
    });
});


module.exports = Router;