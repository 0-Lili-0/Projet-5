// recuperation numero commande
const orderId = new URL(window.location.href).searchParams.get("commande");
console.log(" voici l'id du produit " + orderId)

// affichage numero commande
const div = document.getElementById("orderId")

div.textContent = orderId;