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
    }catch(error) {
        console.log(error);
    }
}

async function getProducts() {
    try {
        const {data} = await axios.get("https://dummyjson.com/products");
        const products = data["products"];
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
            <div data-id = "${product.id}" class = "product main-shadow cursor-pointer p-20 bg-white b-6 d-flex flex-column gap-10 align-center ${product.category} all">
                <div class = "image center-flex"> 
                    <img src = "${product.thumbnail}" />
                </div>
                <h3 class = "center-flex">${product.title}</h3>
                <div class = "info row">    
                    <span class = "price">$${product.price}</span>
                    <span class = "rating">${product.rating}</span>
                </div>
            </div>
        `
).join("");

    document.querySelectorAll(".product").forEach(product=> {
        product.addEventListener("click", ()=> {
            window.location.href = `./product.html?id=${product.getAttribute("data-id")}`;
        });
    });

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





