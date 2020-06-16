'use strict'
const express = require(`express`) // фреймворк веб-приложений Node.js
const path = require('path') // модуль Node js path используется для обработки и преобразования путей к файлам

const app = express() // присвоили express к переменной app

app.set('port', 3000) // присвоили к переменной port значение порта 3000

app.use(express.json()) 
app.use(express.urlencoded({ extended: false }))
app.use('/', express.static(path.join(__dirname, '/dist'))); // указали использовать билд файлов VueJS

app.listen(app.get('port'), () => {
    console.log(`[OK] Server is running on localhost:${app.get('port')}`)
  })
