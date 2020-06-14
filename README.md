# vCakeShop

**[Design](https://www.behance.net/gallery/86218617/zozhCake-landing-page-of-healthy-desserts-and-cakes)**
**[ColorScheme](https://colorscheme.ru/#5w11T7V--w0w0)**

- Project setup `npm install`

- Compiles and hot-reloads for development `npm run serve`

- Compiles and minifies for production `npm run build`

- Lints and fixes files `npm run lint`

- Customize configuration See [Configuration Reference](https://cli.vuejs.org/config/).

```js
"dependencies": {
    "axios": "^0.19.2",
    "core-js": "^3.6.5",
    "vue": "^2.6.11",
    "vue-router": "^3.2.0",
    "vuex": "^3.4.0"
  },
```

> Используя пресет с _vuex_ и _vue-router_ они сами создадут нужные папки и импортируют функции. Установить _axios_ надо самостоятельно

> Используй **Prettier-Standard - JavaScript formatter** плагин, чтобы успокоить eslint

## Google Drive вместо админки

1. Создал [папку](https://drive.google.com/drive/folders/10HQGzpGkPiUL1OgSpdZWzRZPTxSYxsni?usp=sharing) которая содержит картинки продукции и таблицу данные которой доступны из [json](https://spreadsheets.google.com/feeds/list/1PVWNPVPAZ8lPTJW4CkW95ybnRxT6G_SSX3RNNDdkWgg/1/public/full?alt=json)

2. Создал раздельную файловыю структуру для _store_ и импортировал всё в его главный файл _store/index.js_

3. В файле _store/actions/api-request.js_ делаю запрос в Google Таблицы, отправляю полученное в мутаци, где прокидываем дополнительно полученные данные из запроса

4. В файле _store/mutations/mutations.js_ принимаю экшен и записываю полученные данные в массив _spreadsheets: []_

5. В файле _store/getters/getters.js_ запрос реактивно получает данные из массива spreadsheets: [], который в state

6. Вывел в компонент представление _Home_ добавил компонент _v-catalog_

   6.2. чтобы из компонента сработал вызов api добавляю его метод из _vuex_ `methods: { ...mapActions(['GET_SPREADSHEETS_FROM_API']) }`

   6.1. как только компонент загружен, сразу вызываем api запрос на получение json из Google Таблиц `mounted () { this.GET_SPREADSHEETS_FROM_API() }`

   6.3. чтобы получать доступ к данным в шаблоне компонента добавляю его геттер в вычисляемые свойства `computed: { ...mapGetters(['SPREADSHEETS']) }`

7. Создал метод перебора массив с помощью метода *map*, чтобы получить толко нужную информацию с красивыми именами ключей и передал результат в *store* `this.ACT_PROCESSED_SPREADSHEETS_TO_STORE(arr)`

## Отслеживать изменения размера экрана в VUEX

1. В исходном компонете *App* объяви переменные в *data*

```js
    windowWidth: 1200, // ширина экрана
    windowType: ''     // тип экрана
```

2. Опиши размеры и типы  в *mounted()*, чтобы сразу при его отрисовке использовались

```js
    function switchWindowType(ww) { // сопоставляем размеры и тип
      if (ww >= 1200) {
        return "Extra large";
      } else if (ww >= 992 && ww <= 1199) {
        return "Large";
      } else if (ww >= 768 && ww <= 991) {
        return "Medium";
      } else if (ww >= 576 && ww <= 767) {
        return "Small";
      } else {
        return "Extra small";
      }
    }
```

3. Опиши фунцию, которая будет присваивать значения переменным и вызывать экшен. Вызови её при загрузке странице и запиши вызов при каждом изменении размера окна

```js
   function listenWindowSize() { //функция, которая будет измерять экран
      vm.windowWidth = window.innerWidth;
      vm.windowType = switchWindowType(vm.windowWidth); //имея размер определяем тип через функцию, где сопаставлены размеры и тип
      vm.WINDOW_SIZE(vm.windowType); //обращаемся к экшену и передаём ему тип
    }

    listenWindowSize(); //сразу вызываем написанную выше фунцию

    window.addEventListener("resize", function() { //запускаем всегда слушать изменения размера окна
      listenWindowSize();
    });
```

4. импортируй ``import { mapActions } from "vuex";`` и подключи для использования экшен ``...mapActions(["WINDOW_SIZE"])``

5. Экшен приниает название типа окна и передаёт его в мутацию ``WINDOW_SIZE({commit}, size) { commit('CHANGE_WINDOW_SIZE', size) } ``

6. Мутация принимает экшен и изменяет *store* ``CHANGE_WINDOW_SIZE(state, size) { state.windowSize = size; }``

7. Выведи значение типа экрана в *getters* ``WINDOW_TYPE(state) { return state.windowSize; } ``, чтобы использовать его в компонентах, прим. ``<small>window size: {{ this.WINDOW_TYPE }}</small>``

## Подключение Sass

1. Укажи настройки в корневом файле **vue.config.js**

```js
module.exports = {
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "~@/assets/styles/styles.scss";`
            },
        }
    }
};
```

2. Сделай импорт в файл **main.js** `import './assets/styles/styles.scss'`

3. В компоненте в блоке ``<style>`` укажи атрибут ``lang="scss"`` и можно писать стили сразу в scss

## Вывод каталога

1. Создай новый массив с уникальными значениями категорий — их используй в меню `<div v-for="category in this.productCategories" :key="category"> {{ category }} </div>`

```js
productCategories () {
  return [
    ...new Set(
      this.GET_PROCESSED_SPREADSHEETS.map(({ category }) => category)
    )
  ]
}
```

2. Создал в каталоге массив `sortedProducts: []` в который попадают товары по переданному параметру из компонента *v-catalog-menu* через принятие в родителе `@select="selectCategory"`

3. Создал в *store* массив `cart: []` в который передаются уникальные значения по уникальному *id*

4. Добавил кнопки управления товаром в корзине: увеличить, уменьшить и удалить — из конкрентного товара передаю событие в родитель, т.к. нужен *index* с которым перебераем массив

## Nodemailer — ошибка с dns

> Vue это клиентский фреймворк, а отправка должна идти с серверной стороны... пока не разобрался

1. Установи необходимые пакеты `npm i body-parser -S`, `npm i dotenv -S` и сам `npm i nodemailer -S`

2. Импортируй установленные пакеты в *main.js* `import bodyParser from '@/../node_modules/body-parser'` и `import mailer from '@/../node_modules/nodemailer'`

3. настрой отправку сообщений в *main.js*:

```js
Vue.use(bodyParser.urlencoded({ extend: false }));
// app.use(bodyParser.json());
Vue.post('/', (req, res) => {
  // console.log(req.body);
  const message = {
    from: 'Имя отправителя <почта@отправителя.com>', // sender address
    to: `почта@получателя.com`, // list of receivers
    subject: 'Тема сообщения', // Subject line
    html: `<table style="max-width:580px">
      <td colspan="3">${req.body.text}</td>
    </tr>
    </table>`
  }
  mailer(message);
  res.redirect('/');
})
```

4. Оберни форму в тег *form* с атрибутами `method="POST" action="/"` и кнопку вызова метода

5. Cоздай файл *.env* и укажи там логи и пароль от почты: `PASSWORD=пароль EMAIL=логин`

6. создай файл *nodemailer.js* и заполни (пример для Gmail):

```js
'use strict'
require('dotenv').config();

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
```

> ...ошибка с dns. Если установишь npm пакет dns ляснется всё

варианты:

- https://getsimpleform.com/
- https://github.com/eahefnawy/lambda-mailer#envelope-lambda-mailer
- https://www.emailjs.com/
- https://github.com/dwyl/learn-to-send-email-via-google-script-html-no-server
- https://www.digitalocean.com/community/tutorials/how-to-build-a-lightweight-invoicing-app-with-vue-and-node-jwt-authentication-and-sending-invoices
- https://habr.com/ru/post/457580/