//crée la class product pour exploiter les données retournées par le fetch
class Product {

    //construit le produit si on a un objet json avec les attributs de celui-ci
    constructor(jsonProduct) {

        jsonProduct && Object.assign(this, jsonProduct)
    }
}


//interroge l'api pour avoir la liste des produits
fetch('http://localhost:3000/api/products')

    //recupère les données au format json (catalogue des produits)
    .then(response => response.json()

        //parcourt le document pour créer les objets product
        .then(products => {

            render(products);

            //recupere les potentielles erreurs sur la recuperation des produits 
        }).catch(err => console.log(err))

        // on recupere les potentielles erreurs sur l'appel de l'api 
    ).catch(err => console.log(err))


// generation et rendu de la page produits
function render(products) {

    //declare l'HTML 
    let html = "";

    //boucle pour implémenter les objets dans la page
    for (product of products) {

        //construit le produit en utilisant la class Product
        product = new Product(product)

        //prepare l'affichage d'un produit
        html += `<a href="./product.html?id=${product._id}">
                         <article>
                            <img src="${product.imageUrl}" alt="${product.altTxt}">
                            <h3 class="productName">${product.name}</h3>
                            <p class="productDescription">${product.description}</p>
                        </article>
                    </a>`

    }
    //affiche le resultat de la boucle (resultat final)
    document.getElementById('items').innerHTML = html;
}