//----------------------------------------------------------Partie Panier------------------------------------------------------------------------------------------------------
//1 recupérer le panier dans le localStorage
//2 parcourir le tableau
//3 creer et inseré les elements dans la page

// recupérer les données du local storage
let basket = JSON.parse(localStorage.getItem("basket"))
console.table(basket)

 // recuperer les infos des produit present dans le panier depuis l'api
 for( let object of basket) {
  let objectId = object.id;
  let objectColor = object.color;
  let objectQuantity = object.quantity;
  // recuperation des infos de l'api
  fetch(`http://localhost:3000/api/products/${objectId}`)
  .then(response => response.json())
  .then(data => {
    const products = data;
    console.table(products);
    
  // affichage des produits du panier
  // affichage article
  const productArticle = document.createElement("article");

  document.querySelector("#cart__items").appendChild(productArticle);
  productArticle.classList.add("cart__item");
  productArticle.setAttribute("data-id", objectId);
  productArticle.setAttribute("data.color", objectColor);
  
  // div cart item image
  const divImg = document.createElement("div");

  productArticle.appendChild(divImg);
  divImg.classList.add("cart__item__img");

  // affichage image
  const productImg = document.createElement("img");

  divImg.appendChild(productImg);
  productImg.setAttribute("src", products.imageUrl);
  productImg.setAttribute("alt", products.altTxt);

  // affichage div cart item content 
  const divCartItemContent = document.createElement("div");

  productArticle.appendChild(divCartItemContent);
  divCartItemContent.classList.add("cart__item__content");

  //affichage div cart item content description
  const divCartItemContentDescription = document.createElement("div");
  
  divCartItemContent.appendChild(divCartItemContentDescription);
  divCartItemContentDescription.classList.add("cart__item__content__description");

  // affichage des elements description
  const productH2 = document.createElement("h2");
  const productPColor = document.createElement("p");
  const productPPrice = document.createElement("p");

  // affichage h2
  divCartItemContentDescription.appendChild(productH2);
  productH2.textContent = products.name;
  // affichage P pour la couleur
  divCartItemContentDescription.appendChild(productPColor);
  productPColor.textContent = objectColor;
  // affichage du p pour le prix
  divCartItemContentDescription.appendChild(productPPrice);
  productPPrice.textContent = products.price + " €";

  // affichage div cart item content setting
  const divCartItemContentSetting = document.createElement("div");

  productArticle.appendChild(divCartItemContentSetting);
  divCartItemContentSetting.classList.add("cart__item__Content__setting");

  // affichage div cart item content setting quantity
  const divItemContentSettingQuantity = document.createElement("div");

  divCartItemContentSetting.appendChild(divItemContentSettingQuantity);
  divItemContentSettingQuantity.classList.add("cart__item__content__setting__quantity");

  // affichage element div cart item setting quantity
  const productPQuantity = document.createElement("p");
  const productInput = document.createElement("input");

  divItemContentSettingQuantity.appendChild(productPQuantity);
  productPQuantity.textContent = "Qté :" ;

  divItemContentSettingQuantity.appendChild(productInput);
  productInput.classList.add("itemQuantity");
  productInput.type = "number";
  productInput.name = "itemQuantity";
  productInput.min = "1";
  productInput.max = "100";
  productInput.value = objectQuantity;

  // affichage div cart item content setting delete
  const divCartItemContentSettingDelete = document.createElement("div");

  divCartItemContentSetting.appendChild(divCartItemContentSettingDelete);
  divCartItemContentSettingDelete.classList.add("cart__item__content__settings__delete");

  // affichage element p delete item
  const productPDelete = document.createElement("p");

  divCartItemContentSettingDelete.appendChild(productPDelete);
  productPDelete.classList.add("deleteItem");
  productPDelete.textContent = "Supprimer";

  //affichage total quantity
  let totalQuantityProducts = 0;
  const totalQuantity = document.querySelector("#totalQuantity");
  for ( let object of basket) {
    const totalProductQuantity = object.quantity
    totalQuantityProducts = Number(totalQuantityProducts) + Number(totalProductQuantity)
    totalQuantity.textContent = totalQuantityProducts;
  };
  console.log(totalQuantityProducts);

  //afficher prix total
  let total = 0;
  const totalPrice = document.querySelector("#totalPrice");
  for (let object of basket) {
      const totalPriceUnit = products.price * Number(object.quantity)
      total = total + totalPriceUnit
      totalPrice.textContent = total
    };
  console.log(total);
  });
 };
//changer quantités depuis la page panier


// supprimer produit du panier
/*document.getElementByClassName("deleteItem").addEventListener("click", function removeProduct() {
  localStorage.removeItem("basket")
}*/

// calcul quantité total de produit du panier
/*function totalQuantity() {
  const totalQuantity = document.querySelectorAll("#totalQuantity");
  totalQuantity.textContent = 
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

