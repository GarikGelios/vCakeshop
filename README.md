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

7. Перебрал массив с помощью метода *map*, чтобы получить толко нужную информацию с красивыми именами ключей
