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
    localStorage.setItem(`card${counter}`, JSON.stringify({img:product.img, rating: product.rating, value: product.value, name: product.name, cost: product.cost, id: counter}))
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
            <img class="card__delete" src="../img/delete.svg" alt="" data=${card.id}>
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
let imgAdd = document.querySelector(".img__add")
let formFields = document.querySelector(".form__fields")
imgAdd.addEventListener("click", () => {
  imgAdd.classList.add("hide")
  formFields.classList.add("show")
});
function sendInfo(event) {
  event.preventDefault()
  let imagePath = document.querySelector("#image-path").value
  let rating = document.querySelector("#rating").value
  let value = document.querySelector("#value").value
  let name = document.querySelector("#name").value
  let cost = document.querySelector("#cost").value
  let addForm = document.querySelector(".add__form")
  if (addForm.checkValidity()) {
    createProduct({img:imagePath, rating: rating, value: value, name: name, cost: cost})
    location.reload()
  }
  else {
    console.log("Кажется, ничего не произошло!")
  }
}
let formButton = document.querySelector(".form__button")
formButton.addEventListener("click", function(event) {
  sendInfo(event)
});
appendProducts()
let cardDelete = document.querySelectorAll(".card__delete")
let modal = document.querySelector(".modal")
function addActiveClass() {
  modal.classList.add("active")
  modal.classList.remove("closed")
}
for (let i = 0; i < cardDelete.length; i++){  
  let buttonDelete = cardDelete[i]
  buttonDelete.addEventListener("click", function()  {
      addActiveClass()  
      let no = document.querySelector("#no")
      no.addEventListener("click", () => {
        modal.classList.remove("active")
        modal.classList.add("closed")
      });
      let yes = document.querySelector("#yes")
      yes.addEventListener("click", () => {
        modal.classList.remove("active")
        modal.classList.add("closed")
        let card = `card${buttonDelete.getAttribute('data')}`
        localStorage.removeItem(card)
        setTimeout(()=> {
          location.reload()
        },600)
      });                         
  });
}
