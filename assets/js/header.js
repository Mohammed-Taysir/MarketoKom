
import {
    createHtmlElement,
    addTextToElement,
    navLinks,
    addStyleClasses
} from "./module.js";

function main () {
    creatingMainElements();
    addStyleClasses();
}

function creatingMainElements() {
    const header = createHtmlElement("header", document.body, ["header"]);
    const container = createHtmlElement("div", header, ["container", "row"]);

    const logo = createHtmlElement("a", container, ["logo"], "./index.html");
    addTextToElement(logo, "MarketKom");
    const nav = createHtmlElement("nav", container, ["nav", "d-flex", "gap-35"]);
    const pages = [{name: "Home", href: "./index.html"}, {name: "Categories", href: "./categories.html"}, {name: "Products", href: "./products.html"}];
    navLinks(pages, nav);
}

main();