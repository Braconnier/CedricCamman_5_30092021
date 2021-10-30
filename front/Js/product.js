// on recupere l'ID du produit via l'url
let url = new URL(window.location.href);

let productId = url.searchParams.get('id');

let urlProductId = 'http://localhost:3000/api/products' + `/${productId}`;

// recuperation du panier pour manipulations  --------------------------------------------------------------------------------------------------------------------------------------------------
let cart = JSON.parse(localStorage.getItem('canap'));

// constructeur
class Product {
  constructor(json) {
    json && Object.assign(this, json);
  }
}

// gestion du rendu du produit à partir de son Id ----------------------------------------------------------------------------------------------------------------------
let getProduct = async function () {

  // appel de l'api
  await fetch(urlProductId)

    // reuperation des infos du produit
    .then((response) => response.json()

      // construction et affichage de product
      .then((json) => {

        // construction de product
        product = new Product(json);

        //ecrit le product en sessionStorage
        sessionStorage.setItem('product', JSON.stringify(product));

        // appel de la fonction  render
        render();

        // gestion des erreurs
      })
      .catch((err) => console.error(err))

      // gestion des erreurs    
    )
    .catch((err) => console.error(err));
};

// affichage du produit par Id  ----------------------------------------------------------------------------------------------------------------------------------------
getProduct();

// on affiche les elements du produit ----------------------------------------------------------------------------------------------------------------------------------
function render() {
  // change le titre la page
  document.querySelector('title').innerText = product.name;

  // affichage image et alt
  document.querySelector(
    '.item__img'
  ).innerHTML = `<img src='${product.imageUrl}' alt='${product.altTxt}'>`;

  // affichage nom
  document.querySelector('#title').innerText = product.name;

  // affichage prix
  document.querySelector('#price').innerText = (product.price / 10).toFixed(2) + ' ';

  // affichage description
  document.querySelector('#description').innerText = product.description;

  // recuperation du noeud d'options des couleurs
  let options = document.querySelector('#colors');

  // on defini le tableau colors
  let colors = product.colors;

  // on declare l'HTML
  let htmlOptions = '';

  // on boucle pour recuperer les options de couleurs
  colors.forEach((color) => {
    // on concatene les options
    htmlOptions += `<option value='${color}'>${color}</option>`;
  });

  // on affiche les options des couleurs
  options.innerHTML += htmlOptions;
}

// ecouteur des options de couleurs ------------------------------------------------------------------------------------------------------------------------------------------
let selectedColor = document
  .querySelector('#colors')
  .addEventListener('change', function (e) {
    // si non valide, renvoie faux
    if (e.target.innerText === '--SVP, choisissez une couleur --') {
      return false;

      //si valide, renvoie vrai et la valeur de la couleur selectionée
    } else {
      selectedColor = e.target.value;

      return true;
    }
  });

// ecouteur des options de quantiité  ----------------------------------------------------------------------------------------------------------------------------------------------  
let qte = document
  .querySelector('#quantity')
  .addEventListener('change', function (e) {
    // si non valide(inferieur ou egal 0 ou supérieur à 100)  renvoie faux
    if (e.target.value <= 0 || e.target.value > 100) {
      return false;

      // si valide, renvoie vrai et la quantité selectionée
    } else {
      qte = e.target.value;

      return true;
    }
  });

// ecouteur du bouton de commande ------------------------------------------------------------------------------------------------------------------------------------------------------  
document.querySelector('#addToCart').addEventListener('click', function () {
  // si couleur et quantité valides, enregistre l'Id, la couleur et la quantité selectionée
  if (selectedColor && qte) {
    // recupere les données du produit de la page
    product = JSON.parse(sessionStorage.getItem('product'));

    product.selectedColor = selectedColor;

    product.qte = qte;

    // construction du produit a envoyer au panier
    canap = {
      id: productId,

      selectedColor: selectedColor,

      qte: qte,
    };

    // appel de la fonction de commande
    sendToCart();

    // alert en cas de données couleurs ou quantité invalide
  } else if (!selectedColor) {
    alert('veuillez choisir une couleur');
  } else if (!qte) {
    alert('veuillez choisir une quantité');
  }
});

// passer l'article au panier ----------------------------------------------------------------------------------------------------------------------------------------------------------------
let pushCanap = () => {
  cart.push(canap);

  localStorage.setItem('canap', JSON.stringify(cart));

  alert('le produit a bien été ajouté au panier');
};

// fonction de commande -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function sendToCart() {
  // interroge le localStorage et verifie la presence de la clé canap
  if (localStorage.getItem('canap')) {
    checkSiblings();

    // si le localStorage est vide, alors on crée la clé canap et on la peuple avec le canap présent
  } else {
    cart = [];

    pushCanap();
  }
}

// check des doublons -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function checkSiblings() {
  // filtrage par id produit
  let found = cart.filter((element) => element.id === canap.id);

  // trouve ou non les doublons (id et couleur)
  let twin = found.find((el) => el.selectedColor === canap.selectedColor);

  // si un doublon existe
  if (twin) {

    // demande la validation de commande ou non
    if (confirm('Produit identique dans le panier. Voulez-vous en commander plus ?')) {

      // boucle dans le panier
      for (let i = 0; i < cart.length; i++) {

        // trouve la correspondance dans le panier
        if (cart[i] === twin) {

          // construit le produit avec la nouvelle quantité
          let modifiedCanap = {

            id: canap.id,

            selectedColor: canap.selectedColor,

            // on doit parseINT pour additionner sinon, on concatenerait les chaines de caracteres
            qte: parseInt(cart[i].qte) + parseInt(canap.qte)

          }
          // on remplace le canap par le nouveau (nouvelle quantité)
          cart.splice([i], 1, modifiedCanap);

          // on écrase le locaolStorage 
          localStorage.setItem('canap', JSON.stringify(cart));

        }
      }
    }

    //  si id egales mais pas couleur
  } else if (!twin && found.length > 0) {

    if (
      // popup de confirmation
      confirm('même article mais d\'une couleur différente. Commander celui-ci ?')) {
      // sur confirmation, passe le produit au panier
      pushCanap();
    }
    // aucune correspondance, passage au panier 
  } else {
    pushCanap();
  }

}