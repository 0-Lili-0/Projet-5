//----------------------------------------------------------Partie Panier------------------------------------------------------------------------------------------------------
// recupérer les données du local storage
function getPanier() {
  let produitBasket = localStorage.getItem("basket")
  return JSON.parse(produitBasket)
  
}

// recupérer les info du produit dans le panier

const id = getPanier()[0].id
console.log("l'id du produit est : " + id)
const color = getPanier()[0].color
console.log("la couleur du produit est : "+ color)
const quantity = getPanier()[0].quantity
console.log("la quantité est : "+ quantity)


// recupérer des données des produits du panier depuis l'api avec l'id
function dataProduct() {
  fetch(`http://localhost:3000/api/products/${id}`)
    .then (response => response.json())
    .then (produit => {

        console.log(produit)
        
    });
}

// affichage des produits du panier
do {
  document.querySelector("#cart__items")
  document.innerHTML +=
  `<article class="cart__item" data-id="${id}" data-color="${color}">
      <div class="cart__item__img">
        <img src="${dataProduct().imageUrl}" alt="${dataProduct().altTxt}">
      </div>
      <div class="cart__item__content">
          <div class="cart__item__content__description">
              <h2>${dataProduct().name}</h2>
              <p>${color}</p>
              <p>${dataProduct().price}</p>
          </div>
          <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                  <p>Qté : + ${quantity} </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
              </div>
              <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
              </div>
          </div>
      </div>
    </article>`
  }
  while (dataProduct(produit).id == id)

//----------------------------------------------------------------Partie formulaire -----------------------------------------------------------------------------------------------
// validation input du formulaire
function validateForm(event)  {
  let formValid = document.getElementById("order");
  let prenom = document.getElementById("firstName").value;
  let nom = document.getElementById("lastName").value;
  let adresse = document.getElementById("address").value;
  let ville = document.getElementById("city").value;
  let email = document.getElementById("email").value;

  formValid.addEventListener('click', validation);

}

