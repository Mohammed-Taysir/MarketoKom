
import { createProductsHtml } from "./products.js";

function main() {

}

async function getProducts() {
    try{
        const {data} = await axios.get(`dummyjson.com/products?limit=5`);
        console.log(data);
    }catch(error) {
        console.log(error);
    }
}

main();