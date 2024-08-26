let productsDiv = document.querySelector(".products-container")
let getProducts = JSON.parse(localStorage.getItem("productsInCart"))
if (getProducts) {
    getProducts.map((item) => productsDiv.innerHTML += productDraw(item))
}

function productDraw(item) {
    return `
    <div class="cart-card-spacing col-11 col-md-12 col-lg-6 m-auto m-lg-0">
        <div class="card cart-card p-1" >
            <div class="row g-0">
                <div class="col-md-4">
                    <img
                        src="../${item.imageSrc}"
                        class="img-fluid rounded-start p-md-1 p-lg-3 pb-lg-4 d-block m-auto m-lg-0 w-auto rounded-4" 
                        alt="Card img"
                    />
                </div>
                <div class="col-md-8">
                    <div class="card-body d-flex flex-column row-gap-4 ps-lg-5">
                        <h5 class="card-title fw-bold">Product: ${item.name}</h5>
                        <h5 class="card-title fw-bold">Price: $${item.price}</h5>
                        <h5 class="card-title fw-bold">Category: ${item.category}</h5>
                        <div class="d-flex justify-content-between">
                            <div class="cart-product-controler">
                                <span class="product-count text-center" style="width: 50px">${item.count}</span>
                                <i class="fa-solid fa-plus plus" onClick="productCountControler(${item.id},'add')"></i>
                                <i class="fa-solid fa-minus minus" onClick="productCountControler(${item.id},'minus')"></i>
                            </div>
                            <button type="button" class="btn btn-danger fw-bold removeFromCartBtn d-block me-3" onClick="removeFromCart(${item.id})">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    `
}

logoutBtn.addEventListener("click", (e) => {
    localStorage.removeItem("userInfo")
    localStorage.removeItem("productsInCart")
    setTimeout(() => window.location = "login.html", 1000)
})

function updateCartInLocalStorage() {
    localStorage.setItem("productsInCart", JSON.stringify(getProducts))
    if (getProducts.length == 0) {
        localStorage.removeItem("productsInCart")
    }
}

function removeFromCart(id) {
    let cartProducts = document.querySelectorAll(".cart-card-spacing")
    let chosenItemIndex = getProducts.findIndex((item) => item.id === id)
    let chosenItem = getProducts.find((item) => item.id === id)
    getProducts.splice(chosenItemIndex, 1)
    updateCartInLocalStorage()
    chosenItem.count = 1
    cartProducts[chosenItemIndex].remove()
    handleTotalPrice()
}


function productCountControler(id, type) {
    let productCountSpans = document.querySelectorAll("span.product-count")
    let chosenItem = getProducts.find((item) => item.id === id)
    let chosenItemIndex = getProducts.findIndex((item) => item.id === id)
    if (type === "add") {
        chosenItem.count++
    } else {
        chosenItem.count--
        if (chosenItem.count < 1) {
            removeFromCart(id)
        }
    }
    getProducts.length == 0 ? localStorage.removeItem("productsInCart") : updateCartInLocalStorage()
    productCountSpans[chosenItemIndex].innerHTML = chosenItem.count;
    handleTotalPrice()
}

function handleTotalPrice() {
    let totalPrice = 0
    let totalcontainer = document.querySelector(".total-container")
    let totalPriceSpan = document.getElementById("totalPriceSpan")
    if (getProducts) {
        getProducts.forEach(item => {
            totalPrice += item.price * item.count
        })
        if (getProducts.length > 0) {
            totalcontainer.style.display = "block"
        } else {
            totalcontainer.style.display = "none"
        }
        totalPriceSpan.textContent = `$${totalPrice}`
    }
}

handleTotalPrice()

function favProductDraw(item) {
    return `
        <div class="card p-3 rounded-5 text-capitalize fav-product">
            <img class="card-img-top w-100 p-3  p-lg-5 " src="../${item.imageSrc}" alt="${item.name}" draggable="false" />
            <div class="card-body d-flex justify-content-between">
                <div>
                    <h5 class="card-title">Product : ${item.name}</h5>
                    <h5 class="card-text">Category : ${item.category}</h5>
                </div>
                <i class="fa-solid fa-heart d-block fav align-self-end mb-2 fs-2 text-red" data-id="${item.id}" onClick="removeFromFav(${item.id})"></i>
            </div>
        </div>
        `
}

let favProductsDiv = document.querySelector(".favourite-container");
let getFavProducts = JSON.parse(localStorage.getItem("favourite")) || [];
let wrapper, carousel, dotsContainer, firstCardWidth, cardPerView;
let isDragging = false, startX, startScrollLeft;

if (getFavProducts && getFavProducts.length > 0) {
    getFavProducts.forEach((item) => favProductsDiv.innerHTML += favProductDraw(item));
    initializeCarousel();
}

function initializeCarousel() {
    wrapper = document.querySelector(".wrapper");
    carousel = document.querySelector(".carousel");

    if (!document.querySelector(".navigation-dots")) {
        dotsContainer = document.createElement("div");
        dotsContainer.className = "navigation-dots";
        wrapper.appendChild(dotsContainer);
    } else {
        dotsContainer = document.querySelector(".navigation-dots");
    }
    window.addEventListener('resize', setupCarousel);
    setupCarousel();
}

function setupCarousel() {
    if (carousel.children.length === 0) return;

    firstCardWidth = carousel.querySelector(".card").offsetWidth;
    cardPerView = Math.floor(carousel.offsetWidth / firstCardWidth);

    const totalCards = carousel.children.length;
    const numberOfDots = Math.ceil(totalCards / cardPerView);

    dotsContainer.innerHTML = Array.from({ length: numberOfDots }, (_, index) =>
        `<div class="dot ${index === 0 ? 'active' : ''}" onclick="navigateToSwipe(${index})"></div>`
    ).join('');

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", updateActiveDot);
}

function updateActiveDot() {
    const scrollPosition = carousel.scrollLeft;
    const cardWidth = carousel.querySelector(".card").offsetWidth;
    const activeIndex = Math.round(scrollPosition / (cardWidth * cardPerView));

    const dots = dotsContainer.querySelectorAll(".dot");

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === activeIndex);
    });

    if (scrollPosition === 0) {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[0].classList.add('active');
    }
}

function navigateToSwipe(index) {
    const cardWidth = carousel.querySelector(".card").offsetWidth;
    carousel.scrollLeft = index * cardWidth * cardPerView;
    updateActiveDot();
}

function removeFromFav(id) {
    let favProducts = document.querySelectorAll(".fav-product");
    let chosenItemIndex = getFavProducts.findIndex((item) => item.id === id);
    getFavProducts.splice(chosenItemIndex, 1);
    localStorage.setItem("favourite", JSON.stringify(getFavProducts));
    if (getFavProducts.length == 0) {
        localStorage.removeItem("favourite");
        document.querySelector(".navigation-dots").innerHTML = ""
    }
    favProducts[chosenItemIndex].remove();
    setupCarousel();
}

function dragStart(e) {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

function dragging(e) {
    if (!isDragging) return;
    e.preventDefault();
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    updateActiveDot();
}

function dragStop() {
    isDragging = false;
    carousel.classList.remove("dragging");
}