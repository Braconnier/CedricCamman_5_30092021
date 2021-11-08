// recuperation du numero de commande dans l'adresse de la page ----------------------------------------------------------------------------------
let url = new URL(window.location.href);

let orderId = url.searchParams.get('order');

// injection du numero de commande dans le contenu HTML ------------------------------------------------------------------------------------------------
document.querySelector("#orderId").innerText = orderId;

// nettoyagedu localStorage et du sessionStorage    ---------------------------------------------------------------------------------------------------
localStorage.clear();

sessionStorage.clear();


