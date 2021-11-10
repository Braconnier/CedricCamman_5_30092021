// recuperation du panier et tri des produits pour manipulations  --------------------------------------------------------------------------------------------------------------------------------------------------
let cart = JSON.parse(localStorage.getItem('canap'));
cart.sort((a, b) => parseInt(a.id, 16) - parseInt(b.id, 16));

let products = JSON.parse(sessionStorage.getItem('products'));

// suppression de la clé product dans le sessionStorage devenue inutile
sessionStorage.removeItem('product')

// verification de la presence ou de la validité du panier
checkCart();

// fonction de rendu de la page
render();

// verification de la presence ou de la validité du panier, renvoie vers la page d'accueil si le panier est vide, vide le locaStorage le cas echeant    ----------------------------------------------------------
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

// interroge l'api pour avoir la liste des produits ----------------------------------------------------------------------------------------------------------------------------------------------------------------
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


// fonction de rendu de la page du panier   ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
async function render() {

    // limite la requete au premeir chargement de la page 
    if (!products) {

        await getProduct();
    }

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

// géneration de l'HTML par tour de boucle (canap dans le caddie)   ----------------------------------------------------------------------------------------------------------------------------------------------------
function generateHTML() {

    // information de l'HTML
    addedHtml = `<article class='cart__item' data-id='${product._id}data-color='${canap.selectedColor}'>
                <div class='cart__item__img'>
                    <img src='${product.imageUrl}' alt='${product.altTxt}'>
                </div>
                <div class='cart__item__content'>
                <div class="cart__item__content__description">
                        <h2>${product.name}</h2>
                        <p>${canap.selectedColor}</p>
                        <p>${(product.price / 10).toFixed(2)} €</p>
                    </div>
                    <div class='cart__item__content__settings'>
                        <div class='cart__item__content__settings__quantity'>
                            <input type='number' class='itemQuantity' name='itemQuantity' min='1' max='100' value='${canap.qte}'>
                        </div>
                        <div class='cart__item__content__settings__delete'>
                            <p class='deleteItem'>Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>`;
}


// function de modification de la quantité d'un produit du panier   -------------------------------------------------------------------------------------------------------------------------------------------------------
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

// fonction de suppression d'un produit du panier   ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
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

            // regenere la page pour bien prendre en compte la modification du panier
            render();
        })
    }
}

// function de mise à jour de la quantité totale de ppoduits dans le panier -------------------------------------------------------------------------------------------------------------------------------------------------
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

// mise à jour du prix total    --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function updatePrice() {

    // initialistaion de la variable
    let totalByProduct = 0;

    // boucle dans le caddie
    for (canap of cart) {

        // boucle dans les produits
        for (product of products) {

            // sur egalité d'Id
            if (canap.id === product._id) {

                // additionne le prix unitaire multiplié par la quantité
                totalByProduct += parseInt(canap.qte) * parseInt(product.price);
            }
        }
    }

    // affichage du prix total
    document.querySelector('#totalPrice').innerHTML = (totalByProduct / 10).toFixed(2);

}


// gestion de validité formulaire --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// 
// selection du bouton submit (validation du panier pour commande)
document.querySelector('.cart__order input[type="submit"]').addEventListener('click', function (e) {

    // on evite le comportement par defaut (recargement de la page)
    e.preventDefault();

    //  declaration des regEx
    // 
    // commence, fini et ne comporte que des lettres prise en charge des accents apostrophes et tirets, ne prend pas la casse en compte
    let nameRegEx = /^[a-z\-'àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž]+$/i

    // commence, fini et ne comporte que des chiffres et des lettres, prise en charge des accents apostrophes et tirets, ne prend pas la casse en compte
    let addressRegEx = /^[a-z0-9\s,'\-àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž]*$/gi

    // commence par 5 chiffres suivi d'un espace, la seconde partie ne comporte que des lettres, prise en charge des accents, apostrophes et espaces, fini par des lettres 
    let cityRegEx = /^[0-9]{5}\s[a-z\,.\-\sàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž]+$/i

    // commence par n'importe quel caractere "word" (aplhanumerique et underscore), suivi de @ puis de n'importe quel 'mot'( ? = lazy mode), puis un point suivi de 2 ou 3 lettres
    let emailRegEx = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

    // declaration puis vérification  de la saisie du prénom
    let firstName = document.querySelector('#firstName');

    !firstName.value.match(nameRegEx)

        ? firstName.nextElementSibling.innerHTML = 'veuillez entrer un nom valide'

        : firstName.nextElementSibling.innerHTML = ''

    // declaration puis vérification  de la saisie du nom
    let lastName = document.querySelector('#lastName');

    !lastName.value.match(nameRegEx)

        ? lastName.nextElementSibling.innerHTML = 'veuillez entrer un prénom valide'

        : lastName.nextElementSibling.innerHTML = ''

    // declaration puis vérification  de la saisie de l'adresse
    let address = document.querySelector('#address');

    !address.value.match(addressRegEx)

        ? address.nextElementSibling.innerHTML = 'veuillez entrer une adresse valide'

        : address.nextElementSibling.innerHTML = ''

    // declaration puis vérification  de la saisie du code postal et de la ville
    let city = document.querySelector('#city');

    !city.value.match(cityRegEx)

        ? city.nextElementSibling.innerHTML = 'veuillez entrer un code postal et une ville valides'

        : city.nextElementSibling.innerHTML = ''

    // declaration puis vérification  de la saisie de l'adresse mail
    !email.value.match(emailRegEx)

        ? email.nextElementSibling.innerHTML = 'veuillez entrer une adresse email valide'

        : email.nextElementSibling.innerHTML = ''

    // recuperation de la liste des id produits dans le panier 
    let cartIds = cart.map((cart) => {

        return cart.id;

    });

    // construction du corps de données a encoyer a l'api
    let data = {

        contact: {

            firstName: firstName.value,

            lastName: lastName.value,

            address: address.value,

            city: city.value,

            email: email.value
        },

        products: cartIds

    }

    // si toutes les données de contact saisies par l'utilisateur sont valides, on passe la commande
    if (

        firstName.value.match(nameRegEx) &&

        lastName.value.match(nameRegEx) &&

        address.value.match(addressRegEx) &&

        city.value.match(cityRegEx) &&

        email.value.match(emailRegEx)

    ) {

        order(data)
    }

})

// fonction de passage de la commande
function order(data) {

    // on interroge l'api avec la methode POST pour envoyer des données
    fetch("http://localhost:3000/api/products/order",
        {
            method: 'POST',

            // precise qu'il s'agit de données au format JSON
            headers: {

                'Accept': 'application/json',

                "Content-Type": "application/json"
            },

            // transforme le corps de données au format JSON
            body: JSON.stringify(data),
        })

        .then((response) => response.json())

        .then((data) => {

            // une fois que tout est bon, renvoie vers la page de confirmation avec l'identifiant de celle-ci
            document.location.href = `confirmation.html?order=${data.orderId}`;

        }).catch((err) => {

            alert(err.message);

        }).catch((err) => {

            alert(err.message);

        })
}




