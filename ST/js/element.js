function addelement(to,type) {
    var newelement = document.createElement(type);
    to.appendChild(newelement);
    return newelement;
}
        
function changel(el,props) {
    for(var [prop,value] of Object.entries(props)) {el[prop] = value;}
}
        
function newel(to,type,props) {
    var newelem = addelement(to,type);
    changel(newelem,props);
    return newelem
}