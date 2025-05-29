

const bars = document.querySelector(".side-toggle");
const sideBar = document.querySelector(".side-bar");

const closeBtn = document.querySelector(".close-button");

console.log(closeBtn)

bars.onclick = function() {
    console.log("clicked");
    

    sideBar.classList.remove("hide-mobile");
    sideBar.classList.add("full-screen");
    document.querySelector(".close-button").classList.remove("d-none");
    bars.classList.add("d-none");
}

document.addEventListener("click", (e)=> {
    if(e.target.classList.contains("close-button"))
        sideBar.classList.add("hide-mobile");
});






