// on recupere l'ID du produit via l'url
let url = new URL(window.location.href)
let productId = url.searchParams.get('id')

class Product {
    constructor(jsonProduct) {
        jsonProduct && Object.assign(this, jsonProduct)
    }
}

let product = fetch('http://localhost:3000/api/products' + `/${productId}`)
    .then(response => response.json())
    .then(response => {
        product = new Product(response)
        console.log(product)
        // document.querySelector('.item__img').innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`
        document.getElementsByClassName('item__img')[0].innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`
        document.getElementById('title').innerText = `${product.name}`
        document.getElementById('price').innerText = `${product.price}` + ' '
        document.getElementById('description').innerText = `${product.description}`
        let options = document.getElementById('colors')
        let colors = product.colors
        console.log(product.colors)
        colors.forEach(color => {
            options.innerHTML += `<option value="${color}">${color}</option>`
        })
        // for (let i = 0; i < colors.length; i++) {
        //     let newOption = document.createElement('option')
        //     newOption.value = [i]
        //     newOption.innerHTML = colors[i]
        //     options.appendChild(newOption)
        // }
    })
