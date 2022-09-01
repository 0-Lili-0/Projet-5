// recuperation numero commande
const orderId = new URL(window.location.href).searchParams.get("commande");

// affichage numero commande
const div = document.getElementById("orderId");

div.textContent = orderId;