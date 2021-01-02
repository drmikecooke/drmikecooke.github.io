function anchor(url,text) {return '<a href="'+url+'">'+text+'</a>'}

var navstyle = document.createElement("style");
navstyle.innerText = "nav{font-family:Franklin;font-size:18px;overflow:hidden;background-color:#333;user-select:none;}"
navstyle.innerText += "nav a{display:inline-block;color:#f2f2f2;text-align:center;padding:14px 16px;text-decoration:none;}";
navstyle.innerText += "nav a:hover{background-color:#ddd;color:black;}";
document.body.appendChild(navstyle);

navbar = document.createElement("nav");
navbar.innerHTML = anchor("/index.html","Base");
navbar.innerHTML += anchor("/ST/2020.html","2020");
navbar.innerHTML += anchor("/ST/2019.html","2019");
navbar.innerHTML += anchor("/ST/2018.html","2018");
document.body.appendChild(navbar);
