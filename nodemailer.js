'use strict'
require('dotenv').config(); // подключаем конфигурацию dotenv, чтобы там писать логины и пароли где их не увидят никакие злодеи

const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Сервер исходящей почты (SMTP) из настроек Gmail
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL,   // тянется из .env
        pass: process.env.PASSWORD // тянется из .env
    }
});

const mailer = message => {
    transporter.sendMail(message, (err, info) =>{
        if(err) return console.log(err);
        console.log(`Email sent: `, info);
    })
};

module.exports = mailer;