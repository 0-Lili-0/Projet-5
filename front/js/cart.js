//----------------------------------------------------------Partie Panier------------------------------------------------------------------------------------------------------
//1 recupérer le panier dans le localStorage
//2 parcourir le tableau
//3 creer et inseré les elements dans la page

// recupérer les données du local storage
let basket = localStorage.getItem("basket")
let produitBasket = JSON.parse(basket)

function getBasket() {
  // si panier est vide renvoie tableau vide
  if (basket === null) {
    return []
    //sinon renvoie le panier
  } else {
    return produitBasket
  }
} 
// faire console log pour voir le rendu du panier
console.log(produitBasket)
   
// recupérer des données des produits du panier depuis l'api avec l'id
function allProduct(basket) {
  const id = produitBasket[i].id
    fetch(`http://localhost:3000/api/products/${id}`)
      .then (response => response.json())
      .then (produit => {
        array.forEach(element => {
          console.log()
        });
          console.log(produit)
        })
};



//afficher les produits du panier
// Lieu d affichage du panier
const displayBasket = document.querySelector('#cart__items')

let structureBasket = []

for (let el = 0; el < produitBasket.length; el ++){

  structureBasket = structureBasket + `
  <article class="cart__item" date-id="${produitBasket[el].id}" date-color="${produitBasket[el].color}"
    <div class="cart__item__img">
      <img src="${}" alt="${}">
    </div>
    <div class="cart__item__content">
     <div class="cart__item__content__description">
      <h2>${}</h2>
      <p>${}</p>
      <p>${}</p>
     </div>
     <div class="cart__item__content__setting">
      <div class="cart__item__content__setting_quanity>
        <p>Qté :${produitBasket[el].quantity}</p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitBasket[el].quantity}">
      </div>
      <div class="cart__item__content__setting__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>
</article>`

displayBasket.innerHTML = structureBasket;
}

// supprimer produit du panier

// calcul quantité total de produit du panier


//calcul prix total du panier

/*// affichage des produits du panier
function displayProduit(Produit) {
  const cartItem = document.getElementById("cart__Items")

  cartItem = document.querySelector("#cart__items")

  // affichage article
  const article = document.getElementsByClassName("cart__item")
  const productArticle = document.createElement("article")

  article.appendChild("productArticle")
  productArticle.classList.add("cart__item")

  // affichage image
  const productImgContainer = document.getElementsByClassName("cart__item__img")
  const productImg = document.createElement("img")

  productImgContainer.appendChild("productImg")
  productImgContainer.classList.add("cart__item__img")

  productImg.setAttribute("src", produit.imageUrl)
  productImg.setAttribute("alt", produit.altTxt)

  // affichage description
  const productItemContainer = document.getElementsByClassName("cart__item__content")
  const productDescriptionContainer = document.createElement("div")
  const productH2 = document.createElement("h2")
  const productPColor = document.createElement("p")
  const productPPrice = document.createElement("p")

  productItemContainer = document.createElement("div")

  productDescriptionContainer.appendChild("productItemContainer")
  productDescriptionContainer.classList.add("cart__item__content__description")

  productH2.appendChild("productDescriptionContainer")
  productH2.textContent = produit.name

  productPColor.appendChild("productDescriptionContainer")
  productPColor.textContent = produit.color

  productPPrice.appendChild("productDescriptionContainer")
  productPPrice.textContent = produit.price

  // affichage setting

  const productsettingContainer = document.getElementsByClassName("cart__item__Content__setting")
  const productQuantity = document.createElement("div")
  const productPQuantity = document.createElement("p")
  const productInput = document.createElement("input")

  productsettingContainer = document.createElement("div")
  productsettingContainer.classList.add("cart__item__Content__setting")

  productQuantity.appendChild("productsettingContainer")
  productQuantity.classList.add("cart__item__content__setting__quantity")

  productPQuantity.appendChild("productQuantity")
  productPQuantity.textContent = "Qté :" + produit.quantity

  productInput.appendChild("productQuantity")
  productInput.classList.add("itemQuantity")

  // affichage delete
  const productDeleteContainer = document.getElementsByClassName("cart__item__content__settings__delete")
  const productPDelete = document.createElement("p")

  productDeleteContainer = document.createElement("div")
  productDeleteContainer.classList.add("cart__item__content__settings__delete")

  productPDelete.appendChild("productDeleteContainer")
  productPDelete.classList.add("deleteItem")
  productPDelete.textContent = "Supprimer"
  

}*/



//----------------------------------------------------------------Partie formulaire -----------------------------------------------------------------------------------------------
// validation input du formulaire
/*function validateForm(event)  {
  let formValid = document.getElementById("order");
  let prenom = document.getElementById("firstName").value;
  let nom = document.getElementById("lastName").value;
  let adresse = document.getElementById("address").value;
  let ville = document.getElementById("city").value;
  let email = document.getElementById("email").value;

  formValid.addEventListener('click', validation);

}*/

