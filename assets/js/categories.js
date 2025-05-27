
function main() {
    getCategories();
}

async function getCategories() {
    const {data} = await axios.get("https://dummyjson.com/products/category-list");
    createCategories(data);
}



async function createCategories(categories) {
    
    console.log(categories);

    document.querySelector(".categories").innerHTML = categories.map((el) =>
         `
            <div data-cat = "${el}" class = "category center-flex flex-column gap-5 b-8">
                <span>${el}</span>
            </div>
    `).join("");

    document.querySelectorAll(".category").forEach((category) => {
        category.onclick = function(e) {
            window.location.href = `./products.html?cat=${category.dataset.cat}`;
        }
    });

}

main();
