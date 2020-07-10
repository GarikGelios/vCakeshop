module.exports = function content(cart){ // функция для сбора товаров из корзины и сознания письма
  let arrItems = [] // массив в который собираем каждую позицию из корзины
  for (let i = 0; i < cart.typesOfCakeInCart; i++) {
    arrItems.push('<li>' + cart['category_' + i] + ' "' + cart['title_' + i] + '" — ' + cart['price_' + i] + '€ * ' + cart['quantity_' + i] + ' pcs. = ' + cart['price_' + i] * cart['quantity_' + i] + '€ </li>')
  }
  let listItems = arrItems.join('') // склеиваем массив в одну строку

  let emailTemplate = `
<p>You have a new message from vCakeShop:</p>
<p>HELLO</p>
${cart.typesOfCakeInCart} type of cake
<ul>
${listItems}
</ul>
<p> ${cart.name} : ${cart.phone} </p>
<p> ${cart.comment} </p>
`
  return emailTemplate
}
