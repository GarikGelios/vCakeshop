'use strict'
const nodemailer = require('nodemailer')

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'mailbe05.hoster.by', // Сервер исходящей почты (SMTP) из настроек hoster.by
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL, // тянется из .env
    pass: process.env.PASSWORD // тянется из .env
  }
})

const mailer = message => {
  transporter.sendMail(message, (err, info) => {
    if (err) return console.log(err)
    console.log(`Email sent: `, info)
    transporter.on('token', token => {
      console.log('A new access token was generated')
      console.log('User: %s', token.user)
      console.log('Access Token: %s', token.accessToken)
      console.log('Expires: %s', new Date(token.expires))
    })
  })
}

module.exports = mailer
