function createHtmlElement(type, parent, classes, href = "#") {
    const el = document.createElement(type);
    el.className = classes[0];
    
    if(classes.length > 1)
        addStyleClasses(el, classes.slice(1));

    if(type === "a")
        el.setAttribute("href", href);

    if(type === "header")
    {
        parent.insertBefore(el, parent.firstChild);
    }else 
        parent.appendChild(el);

    return el;
}

function addTextToElement(element, txt) {
    const elText = document.createTextNode(txt);
    element.appendChild(elText);
}

function navLinks(pages, nav) {
    pages.map((page) => {
        console.log(page);
       const link =  createHtmlElement("a", nav, ["link"], page.href);
       addTextToElement(link,page.name);
    });
}

function addStyleClasses(el, classes) {
    if(!Array.isArray(classes))
        return;
    classes.map((classStyle) => {
        el.classList.add(classStyle);
    });
}

function capitalizeName(name, seperator) {
    
    const nameArray = name.split(seperator);
    console.log(nameArray);
    let newName = "";

    for(let i = 0; i < nameArray.length; i++) {
        nameArray[i] = nameArray[i][0].toUpperCase() + nameArray[i].slice(1);
        
        newName += nameArray[i];
        if(!(i === nameArray.length - 1))
            newName += " ";


    }

    return newName;
}

export {
    createHtmlElement,
    addTextToElement,
    navLinks,
    addStyleClasses,
    capitalizeName
}