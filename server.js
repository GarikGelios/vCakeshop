'use strict'
const express = require(`express`) // фреймворк веб-приложений Node.js
const path = require('path') // модуль Node js path используется для обработки и преобразования путей к файлам
const mailer = require('./nodemailer')

const app = express() // присвоили express к переменной app

app.set('port', 3000) // присвоили к переменной port значение порта 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', express.static(path.join(__dirname, '/dist'))) // указали использовать билд файлов VueJS

app.post('/', (req, res) => {
  const content = () => { // функция для сбора товаров из корзины и сознания письма 
    let arrItems = ['<li> Cake1 </li>', '<li> Cake2 </li>']
// вот это неработает, при первом прохоже Cannot read property 'title_0' of undefined
    for ( let i = 0; req.body.typesOfCakeInCart; i++) {
      arrItems.push('<li>' + req.body.this["title_" + i] + '</li>')
    }
// 
    let listItems = arrItems.join('') // склеиваем массив в одну строку

    let emailTemplate = `
<p>You have a new message from vCakeShop:</p>
<p>HELLO</p>
${ req.body.typesOfCakeInCart }
<ul>
${ listItems }
</ul>
<p> ${ req.body.text } </p>
`
    return emailTemplate
  }

  const message = {
    from: 'vCakeShop <transfercompanion@gmail.com>', // sender address
    to: `garikgelios@gmail.com`, // list of receivers
    subject: 'Тема сообщения', // Subject line
    html: content()
  }
  mailer(message)
  res.redirect('/')
})

app.listen(app.get('port'), () => {
  console.log(`[OK] Server is running on localhost:${app.get('port')}`)
})
