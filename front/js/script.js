// contact avec l'api
fetch("http://localhost:3000/api/products")
        .then(response => response.json()) 
        .then(data => { 
// creation boucle pour voir tous les produits
    for (let element of data) {
        ajoutProduits(element)
    }
    })

 // creation d'un produit       
function ajoutProduits(data){
    const id = data._id;
    const imageUrl = data.imageUrl;
    const altTxt = data.altTxt;
    const name = data.name;
    const description = data.description;

    const ancre = fabriqueAncre(id);
    const article = fabriqueArticle();
    const image = fabriqueImage(imageUrl, altTxt);
    const h3 = fabriqueH3(name);
    const p = fabriqueP(description);

    article.appendChild(image);
    article.appendChild(h3);
    article.appendChild(p);

    appendChild(ancre, article);
}
// creation balise ancre 
function fabriqueAncre (id) {
    const ancre = document.createElement("a");
    ancre.href = "./product.html?id=" + id;
    return ancre;
}
// creation enfants d'items
function appendChild (ancre, article) {
    const items = document.querySelector("#items");
    if ( items != null) {
        items.appendChild(ancre);
        ancre.appendChild(article);
    }
}
// creation balise article
function fabriqueArticle (newArticle) {
    const article = document.createElement("article");
    const p = fabriqueP();
    return article;
}
// creation balise image
function fabriqueImage (imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl;
    image.alt = altTxt;
    return image;
}
// creation balise h3
function fabriqueH3 (name) {
    const h3 = document.createElement("h3");
    h3.textContent = name;
    h3.classList.add("productName");
    return h3;
}
// creation balise p
function fabriqueP (description) {
   const p = document.createElement("p");
   p.textContent = description;
   p.classList.add("productDescription")
    return p;
}

