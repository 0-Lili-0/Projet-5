//----------------------------------------------------------Partie Panier------------------------------------------------------------------------------------------------------
//1 recupérer le panier dans le localStorage
//2 parcourir le tableau
//3 creer et inseré les elements dans la page

// recupérer les données du local storage et les trier par ID avec la fonction sort(compare)
let basket = JSON.parse(localStorage.getItem("basket"));

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
      
    displayProduit(apiProductsInBasket, objectId, objectColor, objectQuantity);
    totalQuantityOfBasket();
    totalOfBasket(apiProductsInBasket, objectQuantity);
    changeQuantityOfBasket();
    deleteProductOfBasket();
    basket.sort(compare);
  });

};

  // affichage des produits du panier
function displayProduit(productsInBasket,fObjectId, fObjectColor, fObjectQuantity) {
  // affichage article
  const productArticle = document.createElement("article");

  document.querySelector("#cart__items").appendChild(productArticle);
  productArticle.classList.add("cart__item");
  productArticle.setAttribute("data-id", fObjectId);
  productArticle.setAttribute("data-color", fObjectColor);
  
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
function changeQuantityOfBasket() {
  const currentQuantity = document.querySelectorAll(".itemQuantity");
  for ( let quantity of currentQuantity) {
    quantity. addEventListener("change", (q) => {
      q.preventDefault();
      // on remonte au parent
      let quantityToChange = quantity.closest("article");
      // on cherche l'id et la couleur
      let dataIdToQuantityChange = quantityToChange.getAttribute("data-id");
      let dataColorQuantityChange = quantityToChange.getAttribute("data-color");
      // on recupere la quantite dans le local storage
      const itemToUpdate = basket.find((item) => item.id === dataIdToQuantityChange && item.color === dataColorQuantityChange);
      // on recupere la quantite à modifier dans le panier
      const inputValue = quantity.value;
      let quantyModifValue = inputValue;
      // on cherche dans le local storage si la quantite est différente du panier
      itemToUpdate.quantity = quantyModifValue;
      // on enregistre la nouvelle valeur dans le local storage
      localStorage.setItem("basket", JSON.stringify(basket));
      totalQuantityOfBasket();
      window.location.reload();
      return;
    });
  }; 
}; 
   
// fonction supprimer 1 produit du panier
function deleteProductOfBasket() {
  const deleteProduct = document.querySelectorAll(".deleteItem");
  for (let dItem of deleteProduct) {    
    dItem.addEventListener("click", (e)=> {
    e.preventDefault();
    // on remonte jsuqu'au parent
    let Item2Delete = dItem.closest(".cart__item");
    //on cherche l'id et la couleur du produit cible
    let DataIdToDelete = Item2Delete.getAttribute("data-id");
    let DataColorToDelete = Item2Delete.getAttribute("data-color");
    // filtre les produits du panier pour ne garder que ceux que l'on veut acheter
    const idToDeleteFind = basket.filter(p => p.id !== DataIdToDelete || p.color !== DataColorToDelete);
    // enregistre dans le local storage
    localStorage.setItem("basket", JSON.stringify(idToDeleteFind));
    // rafraichi la page automatiquement
    window.location.reload();
    return
    });
  };  
};

//----------------------------------------------------------------Partie formulaire -----------------------------------------------------------------------------------------------
// 1 afficher un message d'erreur si un champs n'est pas rempli correctement
      // 1.2 bien verifier les données saisie avec regex
      // 1.3 ne pas oublier le message d'erreur si necessaire
// 2 recuperer et analyser les donées saisie dans le formulaire
// 3 constituer un objet contact et un tableau de produits
// 4 envoyer requête post et recuperer orderId
// 5 supprimer local storage et envoyer sur page confirmation

const form = document.getElementsByClassName("cart__order__form");
const btnOrder = document.getElementById("order");

// validation prenom
function validFirstName() {
  const prenom = document.getElementById("firstName").value;
  const errorFirstName = document.getElementById("firstNameErrorMsg");
  let regexFirstName = /^[a-zA-z ,.'-]+$/ // a-zA-Z n'importe quelle caractere entre a et z en minuscule ou majuscule |.'- un seul caractère de la liste |+ nombre de fois illimité

  if( regexFirstName.test(prenom) == false) {
    errorFirstName.textContent = "Veuillez indiquer votre prénom avec une chaîne de caractère SVP";
    errorFirstName.style.color = "red";
    return false;
  } 
  if( prenom.value == "") {
    errorFirstName.textContent = "Veuillez indiquer votre prénom avec une chaîne de caractère SVP";
    errorFirstName.style.color = "red";
    return false;
  } else {
    errorFirstName.textContent = "Votre prénom est au bon format";
    errorFirstName.style.color = "green";
    return true;
  }
}

// validation nom 
function validName() {
  const nom = document.getElementById("lastName").value;
  const errorLastName = document.getElementById("lastNameErrorMsg");
  let regexLastName = /^[a-zA-Z ,.'-]+$/ // a-zA-Z n'importe quelle caractere entre a et z en minuscule ou majuscule |.'- un seul caractère de la liste |+ nombre de fois illimité

  if(regexLastName.test(nom) == false ) {
    errorLastName.textContent = "Veuillez indiquer votre nom avec une chaîne de caractère SVP";
    errorLastName.style.color = "red";
    return false;
  } 
  if(nom.value == "") {
    errorLastName.textContent = "Veuillez indiquer votre nom avec une chaîne de caractère SVP";
    errorLastName.style.color = "red";
    return false;
  }else {
    errorLastName.textContent = "Votre nom est au bon format";
    errorLastName.style.color = "green";
    return true;
  }
}

// validation adresse
function validAddress() {
  const adresse = document.getElementById("address").value;
  const errorAdress = document.getElementById("addressErrorMsg");
  let regexAddress = /^\s*\S+(?:\s+\S+){2}/ //\s* = n'importe caractèrer espace blanc | \S+ = n'importe quel caractère espace non blanc |(?:\s+\S+){2}= n'importe quel caractère espace non blanc 2 fois 

  if(regexAddress.test(adresse) == false) {
    errorAdress.textContent = "Veuillez indiquer votre adresse au bon format '26 rue exemple' SVP";
    errorAdress.style.color = "red";
    return false;
  } 
  if(adresse.value == "") {
    errorAdress.textContent = "Veuillez indiquer votre adresse au bon format '26 rue exemple' SVP";
    errorAdress.style.color = "red";
    return false;
  }
  else {
    errorAdress.textContent = "Votre adresse est au bon format";
    errorAdress.style.color = "green";
    return true;
  }
}

// validation ville
function validCity() {
  const ville = document.getElementById("city").value;
  const errorCity = document.getElementById("cityErrorMsg");
  let regexCity = /^([0-9]{5}) ?([a-zA-Z]*)$/ // ([0-9]{5})= chiffre entre 0-9 5fois de suite | ?([a-A-Z]*)= des caractère minuscule ou majuscule autant que voulu

  if(regexCity.test(ville) == false) {
    errorCity.textContent = `Veuillez indiquer votre ville au bon format "codePostal et ville" SVP`;
    errorCity.style.color = "red";
    return false;
  } 
  if(ville.value =="") {
    errorCity.textContent = `Veuillez indiquer votre ville au bon format "codePostal et ville" SVP`;
    errorCity.style.color = "red";
    return false;
  }
  else {
    errorCity.textContent = "Votre ville est au bon format";
    errorCity.style.color = "green";
    return true;
  }
}

// validation email
function validEmail() {
  const email = document.getElementById("email").value;
  const errorMail = document.getElementById("emailErrorMsg");
  let regexEmail = /^[^@]+@[^@]+\.[^@]+$/ // [^@]=n'importe quel caractere sauf @ | +@[^@]=@ obligatoire et n'importe quel caractère sauf @ | +\.[^@]= un . suivi de n'importe quel caractère sauf @ 

  if(regexEmail.test(email) == false) {
    errorMail.textContent = "Veuillez indiquer votre email au bon format 'exemple@test.com' SVP";
    errorMail.style.color = "red";
    return false;
  }
  if(email.value =="") {
    errorMail.textContent = "Veuillez indiquer votre email au bon format 'exemple@test.com' SVP";
    errorMail.style.color = "red";
    return false;
  }
  else {
    errorMail.textContent = "Votre email est correcte";
    errorMail.style.color = "green";
    return true;
  }
};
function checkForm() {
    if (validFirstName() === false || validName() === false || validAddress() === false || validCity() === false || validEmail() === false) {
      alert("formulaire invalide")
      return false;
    }
    else{
      alert("Votre commande est validée")
      return true;
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
const products = basket.map(produits => produits.id);

  try {
    e.preventDefault();
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
        localStorage.clear()
        window.location.href = `confirmation.html?commande=${data.orderId}`
    } else {
      // sinon message d'alerte
      alert("Le formulaire est incomplet, merci de le compléter");
    }   
  })  
}
}
  catch(error){
    console.log("erreur");
  }
})

 
  
 






