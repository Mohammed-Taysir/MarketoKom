import {createHtmlElement,
    capitalizeName,} from "./module.js";
main();
function main () {
    if(document.querySelector(".products-title span"))
        document.querySelector(".products-title span").textContent = "All";
    getCategories();
    getProducts();
    
}

async function getCategories() {
    try {
        const {data: categories} = await axios.get("https://dummyjson.com/products/category-list")
        createFilterSide(categories);
        filteringProducts();
        getParams();
    }catch(e) {
        console.log(e);
    }
}

async function createFilterSide(categories) {
    const sideBar = document.querySelector(".side-bar .side-container");
    sideBar.innerHTML += categories.map((category) => `
        <div class = "d-flex gap-10" data-cat = "${category}">
            <input id = "${category}" type = "radio" name = "category" value = "${category}" />
            <label for = "${category}">${category} </label>
        </div>
    
    `).join("");
}

function filteringProducts() {
    document.querySelectorAll(`input[type = "radio"]`).forEach((input) => {
        input.addEventListener("change", (e)=> {
            if(e.target.value === "all"){
                console.log("All Products");
                getProducts();
            }else {
                getCategoryProducts(e.target.value);
            }
            document.querySelector(".products-title span").textContent = capitalizeName(e.target.value, "-");
            document.querySelector(".side-bar").classList.add("hide-mobile");
        })
    });
}

async function getCategoryProducts(category) {
    try {
        
        const {data} = await axios.get(`https://dummyjson.com/products/category/${category}`);
        
        const productsContainer = document.querySelector(".products-content");
        createProductsHtml(data.products, productsContainer);
        document.querySelector(".pagination").innerHTML = "";
    }catch(error) {
        console.log(error);
    }
}

async function getProducts() {
    try {
       
        const params = new URLSearchParams(window.location.search);
        let page = parseInt(params.get("page")) || 1;
        
        const limit = 9;
        const skip = (page - 1) * limit;
        const {data} = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
        const products = data["products"];
        const numOfPages = Math.ceil(data.total / limit);

        if(page <= 0 || page > numOfPages)
            window.location.href = `./products.html?page=1`;

        customPagination(numOfPages, page);
        document.querySelector(`.pag-${page}`).classList.add("active");
        const productContainer = document.querySelector(".products-content"); 
        createProductsHtml(products, productContainer);
    }catch(error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
    }finally {
        document.querySelector(".loader-container").classList.add("d-none");
    }
}


function createProductsHtml(products, productContainer) {  
    productContainer.innerHTML =  products.map((product) => 
        `
            <div data-id = "${product.id}" class = "product main-shadow p-20 bg-white b-6 d-flex flex-column gap-10 align-center ${product.category} all">
                <div class = "image center-flex p-relative"> 
                    <img src = "${product.thumbnail}" class = "product-img" />
                    <a class = "btn p-absolute view-details" href = "./product.html?id=${product.id}">View Details</a>
                </div>
                <h3 class = "center-flex">${product.title}</h3>
                <div class = "info row">    
                    <span class = "price">$${product.price}</span>
                    <span class = "rating">${product.rating}</span>
                </div>
            </div>
        `
).join("");
    customModal();
}

function customModal() {
    const images = document.querySelectorAll(".product-img");
    const modal = document.querySelector(".my-modal");
    const modalImage = document.querySelector(".modal-img");
    const closeBtn = document.querySelector(".close-btn");
    const rightBtn = document.querySelector(".right-btn");
    const leftBtn = document.querySelector(".left-btn");
    let currentIndex;
    images.forEach((image, index) => {
        image.onclick = (e) => {
            modal.classList.add("show");
            modalImage.setAttribute("src", e.target.getAttribute("src"));
            currentIndex = index;
        }
    });

    closeBtn.onclick = () => {
        closeModal();
    }
    
    rightBtn.onclick = () => {
        nextImage();
    }

    leftBtn.onclick = () => {
       prevImage();
    }
    
    document.onkeydown = (e)=> {
        if(e.key === "ArrowRight")
            nextImage();

        if(e.key === "ArrowLeft")
            prevImage();

        if(e.key === "Backspace")
            closeModal();
    }

    function closeModal() {
        modal.classList.remove("show");
    }

    function nextImage() {
        ++currentIndex;
        if(currentIndex >= images.length)
            currentIndex = 0;
        modalImage.setAttribute("src", images[currentIndex].getAttribute("src"));
    }

    function prevImage() {
         --currentIndex;
        if(currentIndex < 0)
            currentIndex = 0;
        modalImage.setAttribute("src", images[currentIndex].getAttribute("src"));
    }
}

function customPagination(numOfPages, page) {
    const itemsVisible = itemsToShow();
    const startPage = Math.max(1, page - Math.floor(itemsVisible / 2));
    const endPage = Math.min(numOfPages, startPage + itemsVisible - 1);

    let paginations = `<li class = "center-flex main-shadow"><a href="./products.html?page=${page-1}">&lt;</a></li>`;
    for(let i = startPage; i <= endPage; i++) {
        paginations += `<li class = "center-flex main-shadow pag-${i}"><a href="./products.html?page=${i}">${i}</a></li>`;
    }
    paginations += `<li class = "center-flex main-shadow"><a href="./products.html?page=${page+1}">&gt;</a></li>`;

    document.querySelector(".pagination").innerHTML = paginations;
    if(page === 1)
        preventMove(document.querySelector(".pagination li:first-child"));

    if(page >= numOfPages)
        preventMove(document.querySelector(".pagination li:last-child"));
    
    function preventMove(link) {
        link.children[0].classList.add("prevented");
        link.classList.add("cursor-not")
    }

    function itemsToShow() {
        if(window.innerWidth  <= 768)
            return 5;
        else if(window.innerWidth <= 992) 
            return 8;
        else 
            return 15;

        
    }
} 

function getParams() {
    const params = new URLSearchParams(window.location.search);
    if(params.get("cat")) {
        document.querySelector(".products-title span").textContent = capitalizeName(params.get("cat"));
    }

    document.querySelectorAll(`input[type = "radio"]`).forEach(input=> {
        if(input.value === params.get("cat")) {
            input.checked = true;
        }
    });

}





