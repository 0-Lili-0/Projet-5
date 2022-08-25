//----------------------------------------------------------Partie Panier------------------------------------------------------------------------------------------------------
//1 recupérer le panier dans le localStorage
//2 parcourir le tableau
//3 creer et inseré les elements dans la page

// recupérer les données du local storage
let basket = JSON.parse(localStorage.getItem("basket"))
console.log(basket)

// creation d'un tableau pour stocker les prix total de chaque article du panier pour la partie prix total Panier
total = [] 
 // recuperer les infos des produit present dans le panier depuis l'api
for( let object of basket) {
  let objectId = object.id;
  let objectColor = object.color;
  let objectQuantity = object.quantity;
  
  // recuperation des infos de l'api
  fetch(`http://localhost:3000/api/products/${objectId}`)
  .then(response => response.json())
  .then(data => {
    const apiProductsInBasket = data;
      
    displayProduit(apiProductsInBasket, objectId, objectColor, objectQuantity)
    totalQuantityOfBasket()
    totalOfBasket(apiProductsInBasket, objectQuantity)
    changeQuantityOfBasket(objectId, objectColor)
    deleteProductOfBasket(objectId, objectColor)

  })
};
  // affichage des produits du panier
function displayProduit(productsInBasket,fObjectId, fObjectColor, fObjectQuantity) {
  // affichage article
  const productArticle = document.createElement("article");

  document.querySelector("#cart__items").appendChild(productArticle);
  productArticle.classList.add("cart__item");
  productArticle.setAttribute("data-id", fObjectId);
  productArticle.setAttribute("data.color", fObjectColor);
  
  // div cart item image
  const divImg = document.createElement("div");

  productArticle.appendChild(divImg);
  divImg.classList.add("cart__item__img");

  // affichage image
  const productImg = document.createElement("img");

  divImg.appendChild(productImg);
  productImg.setAttribute("src", productsInBasket.imageUrl);
  productImg.setAttribute("alt", productsInBasket.altTxt);

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
  productH2.textContent = productsInBasket.name;
  // affichage P pour la couleur
  divCartItemContentDescription.appendChild(productPColor);
  productPColor.textContent = fObjectColor;
  // affichage du p pour le prix
  divCartItemContentDescription.appendChild(productPPrice);
  productPPrice.textContent = productsInBasket.price + " €";

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
  productInput.value = fObjectQuantity;

  // affichage div cart item content setting delete
  const divCartItemContentSettingDelete = document.createElement("div");

  divCartItemContentSetting.appendChild(divCartItemContentSettingDelete);
  divCartItemContentSettingDelete.classList.add("cart__item__content__settings__delete");

  // affichage element p delete item
  const productPDelete = document.createElement("p");

  divCartItemContentSettingDelete.appendChild(productPDelete);
  productPDelete.classList.add("deleteItem");
  productPDelete.textContent = "Supprimer";

  /*totalQuantityOfBasket();
  totalOfBasket();*/
};
//affichage et calcul total quantity
function totalQuantityOfBasket (){
  let totalQuantityProducts = 0;
  const totalQuantity = document.querySelector("#totalQuantity");
  // pour tout les objet du panier
  for ( let object of basket) {
    const totalProductQuantity = object.quantity;
    // on additionne toute les quantité d'article
    totalQuantityProducts = totalQuantityProducts + Number(totalProductQuantity);
  };
  totalQuantity.textContent = totalQuantityProducts;
};

//fonction afficher et calcul prix total du panier
function totalOfBasket(productsInBasket, fObjectQuantity) {
  let resultat = 0 // variable pour stocké le resultat
  const totalPriceUnit = document.querySelector("#totalPrice"); // la où apparaitra le total sur la page html
  // on envoie dans le tableau total les prix total de chaque article 
  total.push(Number(fObjectQuantity) * productsInBasket.price);
  // pour chaque ligne du tableau total
  for (let i of total) {
    resultat = resultat + i; // on fait la somme de tout le tableau
  };
  totalPriceUnit.textContent = resultat; //on renvoie le total du panier dans le html
};
//fonction changer quantités depuis la page panier
function changeQuantityOfBasket(fObjectId, fObjectColor) {
  const currentQuantity = document.querySelectorAll(".itemQuantity");
   
  for (let quantity of currentQuantity) {
    quantity.addEventListener("change", (d)=> {
      const idToQuantityChange = basket.filter(p => p.id !== fObjectId && p.color !== fObjectColor);
      console.log(idToQuantityChange)
      localStorage.setItem("basket", JSON.stringify(idToQuantityChange));
      window.location.reload();
    });
  };
 
};
   /* const currentQuantity = document.getElementById(objectId+objectColor)
    //evenement pour modifier la valeur de l'input
    currentQuantity.addEventListener("change", (e)=> {
    // on recupere la quantité modifier dans le panier
      let quantyModifValue = currentQuantity.valueAsNumber;
      console.log("La quantité modifier depuis le panier est " + quantyModifValue);
      // on recherche dans le local storage si la quantité est différente de celle du dom
      const resultFind = basket.find((el)=> el.id === objectId && el.color === objectColor);
      console.log("contenue :" +resultFind['id'] +resultFind['color'] );
      resultFind.quantity = quantyModifValue;
      // on enregistre la nouvelle valeur dans le local storage
      localStorage.setItem("basket", JSON.stringify(basket))
      window.location.reload();
      console.log("Le nouveau panier est " + JSON.parse(localStorage.getItem("basket")))
    }) */
   

// fonction supprimer 1 produit du panier
function deleteProductOfBasket(fObjectId, fObjectColor) {
  const deleteProduct = document.querySelectorAll(".deleteItem");
  for (let item of deleteProduct) {
    item.addEventListener("click", (e)=> {
      e.preventDefault();
      /*const idToDeleteFind = basket.filter(p => p.id !== fObjectId && p.color !== fObjectColor);
      localStorage.setItem("basket", JSON.stringify(idToDeleteFind));*/
      /*const IdItemDelete = deleteProduct.closest(data-id);
      const ColorItemDelete = deleteProduct.closest(data.color);
      alert(IdItemDelete);
      alert(ColorItemDelete);*/
      // rafraichir la page automatiquement
      window.location.reload();
    });
  };
  
};

//----------------------------------------------------------------Partie formulaire -----------------------------------------------------------------------------------------------
// 1 afficher un message d'erreur si un champs n'est pas rempli correctement
      // 1.2 bien verifier les données saisie avec regex
      // 1.3 ne pas oublier le message d'erreur si necessaire
// 2 recuperer et analyser les donées saisie dans le formulaire
// 3 constituer un objet contact et un tableau de produits

const form = document.getElementsByClassName("cart__order__form")
const btnOrder = document.getElementById("order");

// validation prenom
function validFirstName() {
  const prenom = document.getElementById("firstName").value.length
  const errorFirstName = document.getElementById("firstNameErrorMsg")
  let regexFirstName = /^[a-zA-z ,.'-]+$/ // a-zA-Z n'importe quelle caractere entre a et z en minuscule ou majuscule |.'- un seul caractère de la liste |+ nombre de fois illimité

  if( regexFirstName.test(prenom)) {
    errorFirstName.textContent = "Veuillez indiquer votre prénom avec une chaîne de caractère SVP";
    errorFirstName.style.color = "red";
    return false
  } 
  if( prenom == "") {
    errorFirstName.textContent = "Veuillez indiquer votre prénom avec une chaîne de caractère SVP";
    errorFirstName.style.color = "red";
    return false
  } else {
    errorFirstName.textContent = "Votre prénom est au bon format";
    errorFirstName.style.color = "green";
    return true
  }
}

// validation nom 
function validName() {
  const nom = document.getElementById("lastName").value.length
  const errorLastName = document.getElementById("lastNameErrorMsg")
  let regexLastName = /^[a-zA-Z ,.'-]+$/ // a-zA-Z n'importe quelle caractere entre a et z en minuscule ou majuscule |.'- un seul caractère de la liste |+ nombre de fois illimité

  if( regexLastName.test(nom)) {
    errorLastName.textContent = "Veuillez indiquer votre nom avec une chaîne de caractère SVP";
    errorLastName.style.color = "red";
    return false
  } 
  if( nom == "") {
    errorLastName.textContent = "Veuillez indiquer votre nom avec une chaîne de caractère SVP";
    errorLastName.style.color = "red";
    return false
  }else {
    errorLastName.textContent = "Votre nom est au bon format";
    errorLastName.style.color = "green";
    return true
  }
}

// validation adresse
function validAddress() {
  const adresse = document.getElementById("address").value.length
  const errorAdress = document.getElementById("addressErrorMsg")
  let regexAddress = /^\s*\S+(?:\s+\S+){2}/ //\s* = n'importe caractèrer espace blanc | \S+ = n'importe quel caractère espace non blanc |(?:\s+\S+){2}= n'importe quel caractère espace non blanc 2 fois 

  if( regexAddress.test(adresse)) {
    errorAdress.textContent = "Veuillez indiquer votre adresse au bon format '26 rue exemple' SVP";
    errorAdress.style.color = "red";
    return false
  } 
  if( adresse == "") {
    errorAdress.textContent = "Veuillez indiquer votre adresse au bon format '26 rue exemple' SVP";
    errorAdress.style.color = "red";
    return false
  }
  else {
    errorAdress.textContent = "Votre adresse est au bon format";
    errorAdress.style.color = "green";
    return true
  }
}

// validation ville
function validCity() {
  const ville = document.getElementById("city").value.length
  const errorCity = document.getElementById("cityErrorMsg")
  let regexCity = /^([0-9]{5}) ?([a-zA-Z]*)$/ // ([0-9]{5})= chiffre entre 0-9 5fois de suite | ?([a-A-Z]*)= des caractère minuscule ou majuscule autant que voulu

  if( regexCity.test(ville)) {
    errorCity.textContent = `Veuillez indiquer votre ville au bon format "codePostal et ville" SVP`;
    errorCity.style.color = "red";
    return false
  } 
  if( ville =="") {
    errorCity.textContent = `Veuillez indiquer votre ville au bon format "codePostal et ville" SVP`;
    errorCity.style.color = "red";
    return false
  }
  else {
    errorCity.textContent = "Votre ville est au bon format";
    errorCity.style.color = "green";
    return true
  }
}

// validation email
function validEmail() {
  const email = document.getElementById("email").value.length
  const errorMail = document.getElementById("emailErrorMsg")
  let regexEmail = /^[^@]+@[^@]+\.[^@]+$/ // [^@]=n'importe quel caractere sauf @ | +@[^@]=@ obligatoire et n'importe quel caractère sauf @ | +\.[^@]= un . suivi de n'importe quel caractère sauf @ 

  if( regexEmail.test(email)) {
    errorMail.textContent = "Veuillez indiquer votre email au bon format 'exemple@test.com' SVP";
    errorMail.style.color = "red";
    return false
  }
  if( email =="") {
    errorMail.textContent = "Veuillez indiquer votre email au bon format 'exemple@test.com' SVP";
    errorMail.style.color = "red";
    return false
  }
  else {
    errorMail.textContent = "Votre email est correcte";
    errorMail.style.color = "green";
    return true
  }
};
function checkForm() {
  if (validFirstName() === false) {
    alert("formulaire invalide")
    form.firstName.focus()
    return false
  }
  if (validName() === false) {
    alert("formulaire invalide")
    form.lastName.focus()
    return false
  }
  if (validAddress() === false) {
    alert("formulaire invalide")
    form.address.focus()
    return false
  }
  if (validCity() === false) {
    alert("formulaire invalide")
    form.city.focus()
    return false
  }
  if (validEmail() === false) {
    alert("formulaire invalide")
    form.email.focus()
    return false
  } else {
    return true
  }
}

//envoie des données dans une requête post
btnOrder.addEventListener("click", (e)=> {
  // creation objet contact
  const contact = {
  firstName : document.getElementById("firstName").value,
  lastName : document.getElementById("lastName").value,
  address : document.getElementById("address").value,
  city : document.getElementById("city").value,
  email : document.getElementById("email").value
};

// creation tableau produits
const products = basket.map(produits => produits.id)

  try {
    e.preventDefault()
    if (checkForm() === true) {
      // envoie requete post
      fetch(`http://localhost:3000/api/products/order`,{
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
      .then((response) => response.json())
      .then((data) => {
        
      // obtenir le numero de commande depuis l'api
        let orderId = data.orderId;
      
        //si envoie ok recupérer numero commande et envoie sur la page confirmation en effacant le localStorage
        if (orderId) {
        //localStorage.clear()
        window.location.href = `confirmation.html?commande=${data.orderId}`
    } else {
      // sinon message d'alerte
      alert("Le formulaire est incomplet, merci de le compléter")
    }   
  })
  
}
}
  catch(error){
    console.log("erreur")
  }
})

 
  
 






