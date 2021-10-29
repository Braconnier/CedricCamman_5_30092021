// recuperation du panier pour manipulations  --------------------------------------------------------------------------------------------------------------------------------------------------
let cart = JSON.parse(localStorage.getItem("canap"));
// constructeur du produit
class Product {

    // construit le produit si on a un objet json, avec les attributs de celui-ci
    constructor(jsonProduct) {
        jsonProduct && Object.assign(this, jsonProduct);
    }
}

// remet le titre de la page en français
document.querySelector('title').innerHTML = 'Panier';

// interroge l'api pour avoir la liste des produits
fetch('http://localhost:3000/api/products')

    //recupère les données au format json (catalogue des produits)
    .then(response => response.json()

        //parcourt le document pour créer les objets product
        .then(products => {

            // declaration des variables utiles
            let html = '';
            let totalQte = 0;
            let totalByProduct = 0;

            // boucle pour implémenter les objets dans la page
            for (product of products) {

                // construit le produit en utilisant la class Product
                product = new Product(product);

            }
            // recuperation des canap et comparaison avec les produits retournés par l'api
            for (canap of cart) {
                for (product of products) {
                    if (canap.id === product._id) {

                        // géneration de l'HTML par tour de boucle (canap dans le caddie)
                        html += `<article class="cart__item" data-id="${product.id}">
                                    <div class="cart__item__img">
                                        <img src="${product.imageUrl}" alt="${product.altTxt}">
                                    </div>
                                    <div class="cart__item__content">
                                        <div class="cart__item__content__titlePrice">
                                            <h2>${product.name}</h2>
                                            <p>${(product.price / 10).toFixed(2)} €</p>
                                        </div>
                                        <div class="cart__item__content__settings">
                                            <div class="cart__item__content__settings__quantity">
                                                <p>Couleur: ${canap.selectedColor} </p>
                                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${canap.qte}">
                                            </div>
                                            <div class="cart__item__content__settings__delete">
                                                <p class="deleteItem">Supprimer</p>
                                            </div>
                                        </div>
                                    </div>
                                </article>`;
                        totalQte += parseInt(canap.qte);
                        totalByProduct += parseInt(canap.qte) * parseInt(product.price);
                    }
                }
            }

            //  injection de l'HTML
            document.querySelector('#cart__items').innerHTML = html;
            document.querySelector('#totalQuantity').innerHTML = totalQte;
            document.querySelector('#totalPrice').innerHTML = (totalByProduct / 10).toFixed(2);



            //recupere les potentielles erreurs sur la recuperation des produits 
        }).catch(err => console.log(err))

        // recupere les potentielles erreurs sur l'appel de l'api 
    ).catch(err => console.log(err));


// gestionnaire de suppression d'article
document.querySelector('.deleteItem').addEventListener('click', function (e) {


});



