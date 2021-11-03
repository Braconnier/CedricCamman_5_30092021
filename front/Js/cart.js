// recuperation du panier et des produits pour manipulations  --------------------------------------------------------------------------------------------------------------------------------------------------
let cart = JSON.parse(localStorage.getItem('canap'));

let products = JSON.parse(sessionStorage.getItem('products'));

// remet le titre de la page en français
document.querySelector('title').innerHTML = 'Panier';

// verification de la presence ou de la validité du panier
checkCart();

// fonction de rendu de la page
render();



// verification de la presence ou de la validité du panier, renvoie vers la page d'accueil si le panier est vide, vide le locaStorage le cas echeant
function checkCart() {

    // verification de la validité du panier
    if (!cart || cart.length === 0) {

        //  si vide ou non valide, efface le localStorage
        localStorage.clear();

        // message d'alerte
        alert('panier vide, retour à la page d\'accueil');

        // renvoie vers la page d'accueil
        window.location = '/front/html';
    }
}

// interroge l'api pour avoir la liste des produits
async function getProduct() {
    await fetch('http://localhost:3000/api/products')

        //recupère les données au format json (catalogue des produits)
        .then(response => response.json()

            //parcourt le document pour créer les objets product
            .then(jsonObject => {
                sessionStorage.setItem('products', JSON.stringify(jsonObject));
                products = jsonObject;
            }))
}


// fonction de rendu de la page du panier
async function render() {
    await getProduct();

    // declaration html pour les produits du panier
    let html = '';

    // boucle dans le caddie
    for (canap of cart) {

        // boucle dans les produits
        for (product of products) {

            // sur egalité d'Id
            if (canap.id === product._id) {

                // appel de la foncion de genretaion de l'HTML
                generateHTML();

                // Concatene le HTML pour le rendu 
                html += addedHtml;
            }
        }
    }

    // rendu final de l'HTML du panier
    document.querySelector('#cart__items').innerHTML = html;

    // fonction de suppression d'u produit du panier
    deleteItem();

    //  fonction de modification de la quantité D'un produit
    modifyQte();

    //  fonction de mise à jour de la quantité total des produits du panier
    updateQte();

    //  fonction de mise à jour  du prix totall du panier
    updatePrice();


}

// géneration de l'HTML par tour de boucle (canap dans le caddie)
function generateHTML() {

    // information de l'HTML
    addedHtml = `<article class='cart__item' data-id='${product._id}'>
                <div class='cart__item__img'>
                    <img src='${product.imageUrl}' alt='${product.altTxt}'>
                </div>
                <div class='cart__item__content'>
                    <div class='cart__item__content__titlePrice'>
                        <h2>${product.name}</h2>
                        <p>${(product.price / 10).toFixed(2)} €</p>
                    </div>
                    <div class='cart__item__content__settings'>
                        <div class='cart__item__content__settings__quantity'>
                            <p>Couleur: ${canap.selectedColor} </p>
                            <input type='number' class='itemQuantity' name='itemQuantity' min='1' max='100' value='${canap.qte}'>
                        </div>
                        <div class='cart__item__content__settings__delete'>
                            <p class='deleteItem'>Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>`;
}


// function de modification de la quantité d'un produit du panier
function modifyQte() {

    // declaration de la variable pour determiner la position de l'eventListener qui correspond à la position de l'index dans le panier
    let qteSelectors = document.querySelectorAll('.itemQuantity');

    // boucle pour retrouver le bon produit du panier
    for (let j = 0; j < qteSelectors.length; j++) {

        // ajout de l'eventListener
        qteSelectors[j].addEventListener('change', (e) => {

            // declaration du produit avec la quantité modifiée
            let modifiedCanap = {
                id: cart[j].id,
                selectedColor: cart[j].selectedColor,
                // on doit parseINT pour additionner sinon, on concatenerait les chaines de caracteres
                qte: e.target.value
            }

            // remplace le canap par le nouveau (nouvelle quantité)
            cart.splice([j], 1, modifiedCanap);

            // on écrase le locaolStorage 
            localStorage.setItem('canap', JSON.stringify(cart));

            // mise à jour de la quantité totale
            updateQte(cart);

            // mise à jour du prix total
            updatePrice(cart);
        })
    }
}

// fonction de suppression d'un produit du panier
function deleteItem() {

    // declaration de la variable pour trouver le bon produit
    let deleteTable = document.querySelectorAll('.deleteItem');

    // boucle d'iteration 
    for (let i = 0; i < deleteTable.length; i++) {

        // gestionnaire de suppression d'article
        deleteTable[i].addEventListener('click', (e) => {

            // suppression de l'article dans le panier
            cart.splice(i, 1)

            //  ecrase le localStorage estvec les nouvelles valeures 
            localStorage.setItem('canap', JSON.stringify(cart))

            // declaration de variable pour le produit à supprimer
            let toDelete = deleteTable[i]

            // recuperation du noeud de 'depart' de l'article
            let nodeToDelete = toDelete.closest('.cart__item')

            // suppression de l'article dans la page
            nodeToDelete.parentNode.removeChild(nodeToDelete);

            // mise à jour de la quantité totale
            updateQte(cart);

            // mise à jour du prix total du panier
            updatePrice(cart)

            // on verifie le panier si il est toujours peuplé (dernier article supprimé)
            checkCart(cart);

            render();
        })
    }
}

// function de mise à jour de la quantité totale de ppoduits dans le panier
function updateQte() {

    // initialisation de la vaible Qte
    let totalQte = 0;

    // pour chaque produit dans le panier
    cart.forEach((canap) => {

        // on les ajoutent entre eux
        totalQte += parseInt(canap.qte);

    })

    // injection de l'HTML dans la page
    document.querySelector('#totalQuantity').innerHTML = totalQte;
}

// mise à jour du prix total
function updatePrice() {

    // initialistaion de la variable
    let totalByProduct = 0;

    // boucle dans le caddie
    for (canap of cart) {

        // boucle dans les produits
        for (product of products) {

            // sur egalité d'Id
            if (canap.id === product._id) {

                // additionne le prix unitaire multipliés par la quantité
                totalByProduct += parseInt(canap.qte) * parseInt(product.price);
            }
        }
    }

    // affichage du prix total
    document.querySelector('#totalPrice').innerHTML = (totalByProduct / 10).toFixed(2);

}