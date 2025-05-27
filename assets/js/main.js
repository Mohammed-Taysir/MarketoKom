
import { createProductsHTML } from "./module.js";

function main() {
    getProducts();
}

async function getProducts() {
    try{
        const {data} = await axios.get(`https://www.dummyjson.com/products?limit=6`);
        const productsContainer = document.querySelector(`.home-products`);
        console.log(data.products);
        createProductsHTML(data.products, productsContainer);
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

main();