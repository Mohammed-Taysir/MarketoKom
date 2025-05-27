

main();
function main() {
    getProductDetails(getParams());
}

function getParams() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
    return productId;
}

async function getProductDetails(productId) {
    try{
        const {data} = await axios.get(`https://dummyjson.com/products/${productId}`);
        console.log(data);
        makeProduct(data);
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

function makeProduct(product) {
    const imageDiv = document.querySelector(".product-details .image");
    productImg(product, imageDiv);
    getProductTitle(product);
    getPriceAndRating(product);
    productDescription(product);
    productSmallImgs(product);
}

function productImg(product, imageDiv) {

    const productImage = document.createElement("img");
    // console.log(productImage);
    productImage.setAttribute("src", product.thumbnail)
    imageDiv.insertBefore(productImage, document.querySelector(".small-imgs"));
}

function productSmallImgs(product) {
    const smallImgsDiv = document.querySelector(".small-imgs");
    const images = product.images;
    console.log(images);
    images.forEach((url) => {
        createImg(smallImgsDiv, url);
    })
}

function getProductTitle(product) {
    document.querySelector(".details .product-title").textContent = product.title;
    document.title = product.title;
}

function getPriceAndRating(product) {
    document.querySelector(".price-rating .price span").textContent = product.price;
    document.querySelector(".price-rating .rating").textContent = product.rating;
}

function productDescription(product) {
    document.querySelector(".product-description").textContent = product.description
}


function createImg(parent, src) {
    const img = document.createElement("img");
    img.setAttribute("src", src);
    parent.appendChild(img);
}

