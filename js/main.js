let productsDiv = document.querySelector(".products-container")
let welcomeUser = document.querySelector(".welcome-user")
let cartItem = document.querySelector(".cart-item")
let signInUp = document.getElementById("signInUp")
let logoutBtn = document.getElementById("logoutBtn")
let withAccount = document.getElementById("withAccount")
let cartProductDiv = document.querySelector(".cart-div")
let cartProductContainer = document.querySelector(".cart-items")
let badge = document.querySelector(".badge")
let caret = document.querySelector(".caret")


if (localStorage.getItem("userInfo")) {
    welcomeUser.innerHTML = `Welcome ${JSON.parse(localStorage.getItem("userInfo")).firstName}`
    signInUp.style.display = "none"
    withAccount.style.display = "flex"

} else {
    signInUp.style.display = "flex"
    withAccount.style.display = "none"
}

const dataProducts = [
    {
        id: 1,
        name: "dowinx gaming chair",
        price: 190,
        category: "chair",
        imageSrc: "images/product-1.jpg",
        count: 1,
        isInCart: false,
        isInFav: false,
    },
    {
        id: 2,
        name: "SteelSeries apex 3 RGB",
        price: 40,
        category: "keyboard",
        imageSrc: "images/product-2.jpg",
        count: 1,
        isInCart: false,
        isInFav: false,
    },
    {
        id: 3,
        name: "Logitech G502 HERO",
        price: 48,
        category: "Mouse",
        imageSrc: "images/product-3.jpg",
        count: 1,
        isInCart: false,
        isInFav: false,
    },
    {
        id: 4,
        name: "Samsung Galaxy Book4",
        price: 1250,
        category: "Laptop",
        imageSrc: "images/product-4.jpg",
        count: 1,
        isInCart: false,
        isInFav: false,
    },
    {
        id: 5,
        name: "Apple Watch Series 9",
        price: 400,
        category: "Smart watch",
        imageSrc: "images/product-5.jpg",
        count: 1,
        isInCart: false,
        isInFav: false,
    },
    {
        id: 6,
        name: "Samsung Galaxy S24 Ultra",
        price: 1220,
        category: "Phone",
        imageSrc: "images/product-6.jpg",
        count: 1,
        isInCart: false,
        isInFav: false,
    },
    {
        id: 7,
        name: "Bose QuietComfort Ultra",
        price: 349,
        category: "Bluetooth Headphones",
        imageSrc: "images/product-7.jpg",
        count: 1,
        isInCart: false,
        isInFav: false,
    },
    {
        id: 8,
        name: "HP 600 G2 ProDesk",
        price: 300,
        category: "Desktop PC",
        imageSrc: "images/product-8.jpg",
        count: 1,
        isInCart: false,
        isInFav: false,
    },
    {
        id: 9,
        name: "KOORUI 24-inch",
        price: 85,
        category: "Computer Monitor",
        imageSrc: "images/product-9.jpg",
        count: 1,
        isInCart: false,
        isInFav: false,
    }
]

function productDraw(item) {
    return `
        <div class="card px-3 mb-3 col-11 col-md-6 col-lg-4 product">
            <img src="${item.imageSrc}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title fw-bold">Product: ${item.name}</h5>
                <h5 class="card-title fw-bold">Price: $${item.price}</h5>
                <h5 class="card-title fw-bold">Category: ${item.category}</h5>
                <div class="product-btns d-flex justify-content-between align-items-center">
                    <button type="button" class="btn btn-primary fw-bold addToCartBtn" data-id="${item.id}" onClick="addToCart(${item.id})">Add to cart</button>
                    <button type="button" class="btn btn-danger d-none fw-bold removeFromCartBtn" data-id="${item.id}" onClick="removeFromCart(${item.id})">Remove from cart</button>
                    <i class="fa-solid fa-heart d-block fav" data-id="${item.id}" onClick="addtoFavorite(${item.id})"></i>
                </div>
            </div>
        </div>
    `
}

function renderProducts(productsSorce) {
    productsSorce.map((item) => productsDiv.innerHTML += productDraw(item))
}

renderProducts(dataProducts)

cartItem.addEventListener("click", () => {
    if (cartProductDiv.style.display == "none") {
        cartProductDiv.style.display = "flex"
        caret.classList.replace("fa-caret-down", "fa-caret-up")
        if (productsInCartArr.length < 1) {
            cartProductContainer.innerHTML = '<li class="cart-empty">No products added yet</li>'
        }

    } else {
        cartProductDiv.style.display = "none"
        caret.classList.replace("fa-caret-up", "fa-caret-down")
    }


})

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("userInfo")
    localStorage.removeItem("productsInCart")
    setTimeout(() => window.location = "pages/login.html", 1000)
})

let productsInCartArr = localStorage.getItem("productsInCart") ? JSON.parse(localStorage.getItem("productsInCart")) : []

if (productsInCartArr) {
    productsInCartArr.map((item) => {
        CartItemDiplay(item)
        item.isInCart = true
        dataProducts.find(i => i.id === item.id).isInCart = true
    })
    badge.innerHTML = productsInCartArr.length;
}

function updateCartButtons() {
    dataProducts.forEach((item) => {
        let addButton = document.querySelector(`.addToCartBtn[data-id="${item.id}"]`);
        let removeButton = document.querySelector(`.removeFromCartBtn[data-id="${item.id}"]`);
        if (addButton && removeButton) {
            if (item.isInCart) {
                addButton.classList.add("d-none");
                removeButton.classList.remove("d-none");
            } else {
                addButton.classList.remove("d-none");
                removeButton.classList.add("d-none");
            }
        }
    })
}

updateCartButtons()

function searchData() {
    let searchMode = document.getElementById("searchMode")
    let searchInput = document.getElementById("searchInput")
    let searchResult = ""
    dataProducts.filter((item) => {
        if (searchMode.value === "Search By Name") {
            if (item.name.toLocaleLowerCase().includes(searchInput.value.toLowerCase())) {
                searchResult += productDraw(item)
            }
        } else {
            if (item.category.toLocaleLowerCase().includes(searchInput.value.toLowerCase())) {
                searchResult += productDraw(item)
            }
        }
    })

    productsDiv.innerHTML = searchResult
    updateCartButtons()
}

function updateCartInLocalStorage() {
    localStorage.setItem("productsInCart", JSON.stringify(productsInCartArr))
}

function addToCart(id) {
    if (localStorage.getItem("userInfo")) {
        if (document.querySelector(".cart-empty")) {
            document.querySelector(".cart-empty").remove()
        }
        let chosenItem = dataProducts.find((item) => item.id === id)
        chosenItem.isInCart = true;
        productsInCartArr = [...productsInCartArr, chosenItem]
        updateCartInLocalStorage()
        CartItemDiplay(chosenItem)
        cartProductDiv.style.display = "flex"
        caret.classList.replace("fa-caret-down", "fa-caret-up")
        let cartProductLength = document.querySelectorAll(".cart-items li")
        badge.innerHTML = cartProductLength.length;
        updateCartButtons()
    } else {
        setTimeout(() => window.location = "pages/login.html", 1000)
    }
}

function CartItemDiplay(item) {
    cartProductContainer.innerHTML += `
    <li class="cart-product-1">
        ${item.name}
        <div class="cart-product-controler">
            <span class="product-count">${item.count}</span>
            <i class="fa-solid fa-plus plus" onClick="productCountControler(${item.id},'add')"></i>
            <i class="fa-solid fa-minus minus" onClick="productCountControler(${item.id},'minus')"></i>
        </div>
    </li>
`
}

function removeFromCart(id) {
    let chosenItemInSrc = dataProducts.find((item) => item.id === id)
    let chosenItemIndex = productsInCartArr.findIndex((item) => item.id === id)
    let chosenItem = productsInCartArr.find((item) => item.id === id)
    chosenItemInSrc.isInCart = false;
    cartItem.isInCart = false;
    productsInCartArr.splice(chosenItemIndex, 1)
    updateCartInLocalStorage()
    let cartProduct = document.querySelectorAll(".cart-items li")
    cartProduct[chosenItemIndex].remove()
    badge.innerHTML = productsInCartArr.length;
    updateCartButtons()
    chosenItem.count = 1
    if (productsInCartArr.length == 0) {
        cartProductDiv.style.display = "none"
        caret.classList.replace("fa-caret-up", "fa-caret-down")
        localStorage.removeItem("productsInCart")
    }
}

function productCountControler(id, type) {
    let productCountSpans = document.querySelectorAll("span.product-count")
    let chosenItem = productsInCartArr.find((item) => item.id === id)
    let chosenItemIndex = productsInCartArr.findIndex((item) => item.id === id)
    if (type === "add") {
        chosenItem.count++
    } else {
        chosenItem.count--
        if (chosenItem.count < 1) {
            removeFromCart(id)
        }
    }
    productsInCartArr.length == 0 ? localStorage.removeItem("productsInCart") : updateCartInLocalStorage()
    productCountSpans[chosenItemIndex].innerHTML = chosenItem.count;
}

let favouriteArr = localStorage.getItem("favourite") ? JSON.parse(localStorage.getItem("favourite")) : []

if (favouriteArr) {
    favouriteArr.map(item => {
        item.isInFav = true
        dataProducts.find(i => i.id === item.id).isInFav = true
    })
    dataProducts.map(item => {
        let favoriteBtn = document.querySelector(`.fav[data-id="${item.id}"]`);
        if (item.isInFav == true) {
            favoriteBtn.classList.add("text-red")
        }
    })
}

function addtoFavorite(id) {
    let favoriteBtn = document.querySelector(`.fav[data-id="${id}"]`);
    let chosenItem = dataProducts.find((item) => item.id === id)
    let chosenItemIndex = favouriteArr.findIndex(item => item.id == id)
    if (localStorage.getItem("userInfo")) {
        favoriteBtn.classList.toggle("text-red")
        if ((favoriteBtn.classList.contains("text-red"))) {
            favoriteBtn.classList.add("grosseur-animation")
            favouriteArr = [...favouriteArr, chosenItem]
            chosenItem.isInFav = true
            localStorage.setItem("favourite", JSON.stringify(favouriteArr))
        } else {
            favoriteBtn.classList.remove("grosseur-animation")
            favouriteArr.splice(chosenItemIndex, 1)
            chosenItem.isInFav = false
            localStorage.setItem("favourite", JSON.stringify(favouriteArr))
            if (favouriteArr.length == 0) {
                localStorage.removeItem("favourite")
            }
        }
    } else {
        setTimeout(() => window.location = "pages/login.html", 1000)
    }
}


