'use strict'
const nodemailer = require('nodemailer')



// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: 'Gmail', // настройки уже описаны в \node_modules\nodemailer\lib\well-known\services.json
  auth: {
    type: 'OAuth2',
    user: process.env.VUE_APP_EMAIL, // тянется из .env
    refreshToken: process.env.VUE_APP_EMAIL_REFRESH_TOKEN,
    clientId: process.env.VUE_APP_EMAIL_CLIENT_ID,
    clientSecret: process.env.VUE_APP_EMAIL_CLIENT_SECRET,
    accessUrl: 'https://oauth2.googleapis.com/token'
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
