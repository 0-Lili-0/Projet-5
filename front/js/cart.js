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
    //console.log(objectQuantity)
    // recuperation des infos de l'api
    fetch(`http://localhost:3000/api/products/${objectId}`)
    .then(response => response.json())
    .then(data => {
      const productsInBasket = data;
      console.log(productsInBasket);
    
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
    productPColor.textContent = objectColor;
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
    productInput.value = objectQuantity;
    productInput.id = objectId+objectColor;

    
  

  // affichage div cart item content setting delete
    const divCartItemContentSettingDelete = document.createElement("div");

    divCartItemContentSetting.appendChild(divCartItemContentSettingDelete);
    divCartItemContentSettingDelete.classList.add("cart__item__content__settings__delete");

  // affichage element p delete item
    const productPDelete = document.createElement("p");

    divCartItemContentSettingDelete.appendChild(productPDelete);
    productPDelete.classList.add("deleteItem");
    productPDelete.textContent = "Supprimer";
    productPDelete.id = "delete"+objectId+objectColor;


  //affichage total quantity
    let totalQuantityProducts = 0;
    const totalQuantity = document.querySelector("#totalQuantity");
    // pour tout les objet du panier
    for ( let object of basket) {
      const totalProductQuantity = object.quantity
      // on additionne toute les quantité d'article
      totalQuantityProducts = totalQuantityProducts + Number(totalProductQuantity)
    };
    totalQuantity.textContent = totalQuantityProducts;
    //console.log(totalQuantityProducts);

  //afficher prix total
    let resultat = 0 // variable pour stocké le resultat
    const totalPriceUnit = document.querySelector("#totalPrice") // la où apparaitra le total sur la page html
    // on envoie dans le tableau total les prix total de chaque article 
    total.push(Number(objectQuantity) * productsInBasket.price) 
    // pour chaque ligne du tableau total
    for (let i of total) {
      resultat = resultat + i // on fait la somme de tout le tableau
    }
    totalPriceUnit.textContent = resultat //on renvoie le total du panier dans le html
    //console.log(total)

  //changer quantités depuis la page panier
    
    const currentQuantity = document.getElementById(objectId+objectColor)
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
      console.log("Le nouveau panier est " + JSON.parse(localStorage.getItem("basket")))
    }) 
   

// supprimer produit du panier
    const deleteProduct = document.getElementById("delete"+objectId+objectColor);
  
   deleteProduct.addEventListener("click", (f)=> {
      let totalProductToRemove = basket.length
      console.log("il y a :" + totalProductToRemove)
      //si il n'y a qu'un produit on vide le local storage
      if ( totalProductToRemove == 1) {
        localStorage.removeItem("basket")
        // rafraichir la page automatiquement
        window.location.reload();
      } else {
        //si il y a plus de 1 produit on filtre avec l id et la couleur et on sauvegarde le nouveau local storage
        const idToDeleteFind = basket.filter(p => p.id !== objectId && p.color !== objectColor);
        console.log("voici" + ['id'])
        localStorage.setItem("basket", JSON.stringify(idToDeleteFind))
        // rafraichir la page automatiquement
        window.location.reload();
      }
    })  

  });
}



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
  const prenom = document.getElementById("firstName").value
  const errorFirstName = document.getElementById("firstNameErrorMsg")
  let regexFirstName = /^[a-zA-z ,.'-]+$/ // a-zA-Z n'importe quelle caractere entre a et z en minuscule ou majuscule |.'- un seul caractère de la liste |+ nombre de fois illimité

  if( regexFirstName.test(prenom) === false) {
    errorFirstName.textContent = "Veuillez indiquer votre prénom avec une chaîne de caractère SVP";
    errorFirstName.style.color = "red";
  } else {
    errorFirstName.textContent = "Votre prénom est au bon format";
    errorFirstName.style.color = "green";
    return true
  }
}

// validation nom 
function validName() {
  const nom = document.getElementById("lastName").value
  const errorLastName = document.getElementById("lastNameErrorMsg")
  let regexLastName = /^[a-zA-Z ,.'-]+$/ // a-zA-Z n'importe quelle caractere entre a et z en minuscule ou majuscule |.'- un seul caractère de la liste |+ nombre de fois illimité

  if( regexLastName.test(nom) === false) {
    errorLastName.textContent = "Veuillez indiquer votre nom avec une chaîne de caractère SVP";
    errorLastName.style.color = "red";
  } else {
    errorLastName.textContent = "Votre nom est au bon format";
    errorLastName.style.color = "green";
    return true
  }
}

// validation adresse
function validAddress() {
  const adresse = document.getElementById("address").value
  const errorAdress = document.getElementById("addressErrorMsg")
  let regexAddress = /^\s*\S+(?:\s+\S+){2}/

  if( regexAddress.test(adresse) === false) {
    errorAdress.textContent = "Veuillez indiquer votre adresse au bon format '26 rue exemple' SVP";
    errorAdress.style.color = "red";
  } else {
    errorAdress.textContent = "Votre adresse est au bon format";
    errorAdress.style.color = "green";
    return true
  }
}

// validation ville
function validCity() {
  const ville = document.getElementById("city").value
  const errorCity = document.getElementById("cityErrorMsg")
  let regexCity = /^([0-9]{5}) ?([a-zA-Z]*)$/

  if( regexCity.test(ville) === false) {
    errorCity.textContent = `Veuillez indiquer votre ville au bon format "codePostal et ville" SVP`;
    errorCity.style.color = "red";
  } else {
    errorCity.textContent = "Votre ville est au bon format";
    errorCity.style.color = "green";
    return true
  }
}

// validation email
function validEmail() {
  const email = document.getElementById("email").value
  const errorMail = document.getElementById("emailErrorMsg")
  let regexEmail = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/

  if( regexEmail.test(email) === false) {
    errorMail.textContent = "Veuillez indiquer votre email au bon format 'exemple@test.com' SVP";
    errorMail.style.color = "red";
  } else {
    errorMail.textContent = "Votre email est correcte";
    errorMail.style.color = "green";
    return true
  }
}
function checkForm() {
  if (validFirstName() === false) {
    return
  }
  if (validName() === false) {
    return
  }
  if (validAddress() === false) {
    return
  }
  if (validCity() === false) {
    return
  }
  if (validEmail() === false) {
    return false
  } else {
    return true
  }
}
// validation du formulaire

//recupérer les données du formaulaire :




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
console.log(contact);

// creation tableau produits
const products = basket.map(produits => produits.id)
console.log(products)

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
        console.log(data);
      // obtenir le numero de commande depuis l'api
        let orderId = data.orderId;
        console.log(orderId);
        //si envoie ok recupérer numero commande et envoie sur la page confirmation en effacant le localStorage
        if (orderId) {
        localStorage.clear()
        window.location.href = `confirmation.html?commande=${data.orderId}`
    } else {
      // sinon message d'alerte
      alert("Une erreur c'est produite, merci de réessayer")
    }   
  })
  
}
}
  catch(error){
    console.log("erreur")
  }
})

 
  
 






