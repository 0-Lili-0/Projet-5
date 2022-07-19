// recupération id d'un produit
const getProductId = new URL(window.location.href).searchParams.get("id");
console.log(" voici l'id du produit " + getProductId)



fetch("http://localhost:3000/api/products" + getProductId)
    .then(response => response.json())
    .then(data => console.log(data))

