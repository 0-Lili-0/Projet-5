//----------------------------------------------------------Partie Panier------------------------------------------------------------------------------------------------------
// recupérer les données du local storage
let item = localStorage.cart
JSON.parse(localStorage.cart)
console.log(item) 
// recupérer des données des produits du panier depuis l'api
for (let elements of item) {
  fetch(`http://localhost:3000/api/products/${elements._id}`)
    .then (response => response.json())
    .then (item => {
        console.log(item)
        displayItem(item)
    });
  }
/* <!--  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="../images/product01.jpg" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>Nom du produit</h2>
                    <p>Vert</p>
                    <p>42,00 €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article> --> */


// affichage des produits
function displayItem(item) {
    const article = createArticle(item)
    const div = createImage(item)
    const cartItemContent = createCartItemContent(item)
    const cartItemSetting = createCartItemSetting(setting)
    const cartItemDelete = deleteItem(item)

    displayArticle(article)
    createImage(item)

    article.appendChild(div)
    article.appendChild(cartItemContent)
    article.appendChild(cartItemSetting)
    article.appendChild(cartItemDelete)
    
}
// creation balise article
function createArticle(item) {
    const article = document.createElement("article")
    article.classList.add("cart__item");
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}
// affichage de l'article
function displayArticle(article) {
    document.querySelector("#cart__item").appendChild(article)
}
// creation balise image produit
function createImage(item) {
    const div = document.createElement("div")
    const image = document.createElement('img')
    image.src = imageUrl
    image.alt = altTxt
    div.classList.add(".cart__item__img")
    div.appendChild(image)
    return div
}
// creation balise div cart item content
function createCartItemContent(item) {
    const div = document.createElement("div")
    const description = document.createElement("div")
    const h2 = document.createElement("h2")
    const p = document.createElement("p")
    const pPrice = document.createElement("p")

    div.classList.add("cart__item__content")
    description.classList.add("cart__item__content__description")
    h2.textContent = item.name
    p.textContent = item.color
    pPrice.textContent = item.price + "€"

    div.appendChild(description)
    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(pPrice)
    return div
}
// creation balise div cart item setting
function createCartItemSetting () {
  const setting = document.createElement("div")
  
  setting.classList.add("cart__item__content__settings")
  addQuantity(setting)

  return setting
}
// creation de l'ajout des quantité avec le input
function addQuantity(setting, item) {
  const quantity = document.createElement("div")
  const p = document.createElement("p")
  const input = document.createElement("input")

  quantity.classList.add("cart__item__content__settings__quantity")
  p.textContent = "Qté : "
  quantity.appendChild(p)

  input.type = "number"
  input.classList.add("itemQuantity")
  input.name = "itemQuantity"
  input.min ="1"
  input.max ="100"
  input.value = item.quantity

  setting.appendChild(input)
}
// creation boutton supprimer un article
function deleteItem() {
  const div = document.createElement("div")
  const p = document.createElement("p")

  div.classList.add("cart__item__content__settings__delete")
  p.classList.add("deleteItem")
  p.textContent = "Supprimer"

  return div
}

//----------------------------------------------------------------Partie formulaire -----------------------------------------------------------------------------------------------
// validation input du formulaire