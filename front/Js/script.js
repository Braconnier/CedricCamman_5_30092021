// on crée la class product pour exploiter les données retournées par le fetch
class Product {
    constructor(jsonProduct) {
        jsonProduct && Object.assign(this, jsonProduct)
    }
}


// on interroge l'api pour avoir la liste des produits
fetch('http://localhost:3000/api/products')
    //on recupère les données au format json
    .then(response => response.json()
        // on parcourt le document pour créer nos objets product
        .then(products => {
            // on boucle pour implémenter les objets dans la page
            for (product of products) {
                product = new Product(product)
                document.getElementById('items').innerHTML += `<a href="./product.html?id=${product._id}">
                                                                    <article>
                                                                        <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                                        <h3 class="productName">${product.name}</h3>
                                                                        <p class="productDescription">${product.description}</p>
                                                                    </article>
                                                                </a>`
            }
        }).catch(err => console.log(err))
    ).catch(err => console.log(err))
