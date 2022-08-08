//----------------------------------------------------------- Affichage du Produit ----------------------------------------------------------------------------------
// recupération id d'un produit
const getProductId = new URL(window.location.href).searchParams.get("id");
console.log(" voici l'id du produit " + getProductId)

// recupérer les données d'un produits à partir de l'id
fetch(`http://localhost:3000/api/products/${getProductId}`)
    .then (response => response.json())
    .then (product => {
        console.log(product);
        displayData(product)
    });

// affichage des produits
function displayData(object) {
    const id = object._id
    const altTxt = object.altTxt
    const imageUrl = object.imageUrl
    const name = object.name
    const description = object.description
    const price = object.price
    const colors = object.colors

    createImage(imageUrl, altTxt)
    createTitle(name)
    createPrice(price)
    createDescription(description)
    createColors(colors)
}
// creation de l'image
function createImage(imageUrl, altTxt) {
    const image = document.createElement('img')
    image.src = imageUrl
    image.alt = altTxt
    const img = document.querySelector(".item__img")
    if ( img != null) img.appendChild(image)
}
// creation du nom produit
function createTitle(name) {
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = name
}
//cretation prix produit
function createPrice(price) {
    const span = document.querySelector("#price")
    if (span != null) span.textContent = price
}
//creation description produit
function createDescription(description) {
    const p = document.querySelector("#description")
    if (p != null) p.textContent = description
}
// creation couleur
function createColors(colors) {
    const select = document.querySelector("#colors")
    if (select != null ) {
        //creation boucle pour le choix des couleurs
        colors.forEach(color => {
            const option = document.createElement("option")
            option.value = color
            option.textContent = color
            select.appendChild(option)
        });
    }
}

// ----------------------------------------- gestion bouton ajout aux panier et localStorage-----------------------------------------------------------------------------------------------
//click du bouton
const btn = document.querySelector("#addToCart")
btn.addEventListener("click", (e) => {
    const id = getProductId;
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
    // rendre impossible de cliquer sur bouton si couleur et quantité sont non renseignées
    if(color == null || color ==='' || quantity == null || quantity == 0){
        alert("Veuillez choisir une couleur et indiquer une quantité S.V.P.")
        return // faire arreter la fonction afin de ne pas etre envoyer sur la page panier
    }
    //localstorage pour garder en mémoire données dans un tableau 
    let arrayBasket = []
    // creation de l'objet à stocker dans le local storage
    let data = {
        id: id,
        color: color,
        quantity: quantity
    }
//1 recupère tableau actuelle
//2 check si storageContent null ou pas si null initailiser tableau et ajout tableau dans local storage si non recupère tableau et ajouter element dedans

// tableau panier 
    let retrieveArray = JSON.parse(localStorage.getItem("basket"))
    // si le panier est vide
        if (retrieveArray !== null) {  
        // variable test
        let IndiceTest = 0;
        //pour tout les élement du panier
        for ( let element of retrieveArray ) {
            //si id et la couleur existe déjà ont additionne les quantité et on pousse dans le panier
            if (element.id === data.id && element.color === data.color) {
                element.quantity = Number(element.quantity) + Number(data.quantity)
                localStorage.setItem("basket", JSON.stringify(retrieveArray))
                IndiceTest = 1;
                break
            // sinon on test variable    
            } else {
                IndiceTest = 2;
            }
        }
        //on ousse et sauve les donées dans le localStorage
        if(IndiceTest===2) {
            retrieveArray.push(data)
            localStorage.setItem("basket", JSON.stringify(retrieveArray))
        }
        // sinon on pousse et enregistre les données dans le panier    
        } else {
        retrieveArray = []
        retrieveArray.push(data)
        localStorage.setItem("basket", JSON.stringify(retrieveArray))
    }
    // renvoie vers la page panier
    window.location.href = "cart.html" 
})
