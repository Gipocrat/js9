localStorage.clear()
let counter = 0
if (localStorage.getItem('counter')) {
  counter = +localStorage.getItem('counter')
}
else {
    localStorage.setItem('counter', 0);
}
function createProduct(product) {
    counter +=1
    localStorage.setItem('counter', counter)
    localStorage.setItem(`counter${counter}`, JSON.stringify({img:product.img, rating: product.rating, value: product.value, name: product.name, cost: product.cost}))
}
createProduct({img:'./img/2.webp', rating: 4.94, value: "500ккал", name: "Стейк из индейки охлаждённый Зелёная линия, 500г", cost: 450})
createProduct({img:'./img/1.webp', rating: 4.84, value: "100ккал", name: "Томаты черри на ветке, 250г", cost: 120})
function appendProducts() {
    let keys = Object.keys(localStorage)
    let productCard = document.querySelector(".products")
    keys = keys.sort()
    keys = keys.reverse()
    for (let key of keys) {
      if (key!='counter') {
        let card = JSON.parse(localStorage.getItem(key))
        let newProduct = document.createElement("div")
        newProduct.className = "products__card"
        newProduct.innerHTML = `
              <div class="card__image-block">
                  <img class="card__image" src='${card.img}' alt="">
                  </div>
                  <div class="card__description">
                      <div class="card__meta">
                        <div class="card__rating">${card.rating}</div>
                        <div class="card__value">${card.value}</div>
                      </div>
                      <div class="card__name">
                        ${card.name}
                      </div>
                      <div class="card__cost">${card.cost}</div>
                  </div>        
              `
      productCard.append(newProduct)
      }
    }
}
appendProducts()