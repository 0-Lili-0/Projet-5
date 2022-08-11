//----------------------------------------------------------Partie Panier------------------------------------------------------------------------------------------------------
//1 recupérer le panier dans le localStorage
//2 parcourir le tableau
//3 creer et inseré les elements dans la page

// recupérer les données du local storage
let basket = JSON.parse(localStorage.getItem("basket"))
console.table(basket)
total = []
 // recuperer les infos des produit present dans le panier depuis l'api
 for( let object of basket) {
    let objectId = object.id;
    let objectColor = object.color;
    let objectQuantity = object.quantity;
    //console.log(objectQuantity)
    // recuperation des infos de l'api
    fetch(`http://localhost:3000/api/products/${objectId}`)
    .then(response => response.json())
    .then(data => {
      const products = data;
      console.log(products);
    
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
      totalQuantityProducts = totalQuantityProducts + Number(totalProductQuantity)
  };
  totalQuantity.textContent = totalQuantityProducts;
  console.log(totalQuantityProducts);

  //afficher prix total
  const totalPriceUnit= document.querySelector("#totalPrice")
    //total= total + Number(objectQuantity)*productArticle.price
    total.push(Number(objectQuantity)*products.price)
   let resultat = 0
   for (let i of total) {
      resultat = resultat + i 
   }
    totalPriceUnit.textContent = resultat
    console.log(total)

  //changer quantités depuis la page panier

    productInput.addEventListener("change", ()=> {
      console.log(objectId)
      const productToUpdate = basket.find(item => item.id === objectId)
      console.log(productToUpdate)
      basket.push(productToUpdate)
      console.log(basket)
    })
 
    


 
// supprimer produit du panier





  });
 };



//----------------------------------------------------------------Partie formulaire -----------------------------------------------------------------------------------------------
// 1 afficher un message d'erreur si un champs n'est pas rempli correctement
      // 1.2 bien verifier les données saisie avec regex
      // 1.3 ne pas oublier le message d'erreur si necessaire
// 2 recuperer et analyser les donées saisie dans le formulaire
// 3 constituer un objet contact et un tableau de produits


const formValid = document.getElementById("order");
const prenom = document.getElementById("firstName");
const errorPrenom = document.getElementById("firstNameErrorMsg");
const nom = document.getElementById("lastName");
const errorNom = document.getElementById("lastNameErrorMsg")
const adresse = document.getElementById("address");
const errorAdresse = document.getElementById("adressErrorMsg")
const ville = document.getElementById("city");
const errorVille = document.getElementById("cityErrorMsg")
const email = document.getElementById("email");
const errorMail = document.getElementById("mailErrorMsg")

// verifier si champs sont rempli correctement et/ou non vide
const regexPrenom = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/
const regexNom = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/
const regexAdresse = /^[a-zA-Z0-9\s,'-]*$/
const regexVille = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/
const regexMail =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// validation du formulaire
function formCheck() {
  // verif prenom
  if (firstName.value == "" && regexPrenom.test(firstName.Value) == false ) {
    errorPrenom.textContent = "Veuillez indiquer votre prénom au bon foramt SVP";
    errorPrenom.style.color = "red";
    return false;
  }
  //verif nom
  if (lastName.value == "" && regexNom.test(lastName.Value) == false ) {
    errorNom.textContent = "Veuillez indiquer votre nom au bon foramt SVP";
    errorNom.style.color = "red";
    return false;
  }
  //verif adresse
  if (adress.value == "" && regexAdresse.test(adress.Value) == false ) {
  errorAdresse.textContent = "Veuillez indiquer votre adresse au bon foramt SVP";
  errorAdresse.style.color = "red";
  return false;
  }
  //verif ville
  if (city.value == "" && regexVille.test(city.Value) == false ) {
  errorVille.textContent = "Veuillez indiquer votre ville au bon foramt SVP";
  errorVille.style.color = "red";
  return false;
  }
  //verif email
  if (email.value == "" && regexMail.test(email.Value) == false ) {
  errorMail.textContent = "Veuillez indiquer votre adresse email au bon foramt SVP";
  errorMail.style.color = "red";
  return false;
  } else {
    return true
  }
}

//recupérer les données du formaulaire :
// creation objet contact
const contact = {
  prenom : firstName.value,
  nom : lastName.value,
  adresse : adresse.value,
  city : city.value,
  email : email.value
};
console.log(contact);

// creation tableau produits
const produits = basket.map(produits => produits.id )
console.log(produits);

//envoie des données dans une requête post
function validateForm() {
  if (formCheck() === true) {
    formValid.addEventListener("click", (e)=> {
      e.preventDefault();
      fetch(`http://localhost:3000/api/products/order`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body : JSON.stringify({
          contact,
          products
        })
      })
      .then(response => response.json())
      .then(data => console.log(data));
    });
  } else {
    alert("Le formulaire est non valide, merci de vérifier les informations.")
  }
}