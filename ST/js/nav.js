function anchor(year) {return '<a onclick="getJSON(\''+year+'\');">'+year+'</a>'}

var navstyle = document.createElement("style");
navstyle.innerText = "nav{font-family:Franklin;font-size:18px;overflow:hidden;background-color:#333;user-select:none;}"
navstyle.innerText += "nav a{display:inline-block;color:#f2f2f2;text-align:center;padding:14px 16px;text-decoration:none;}";
navstyle.innerText += "nav a:hover{background-color:#ddd;color:black;}";
document.body.appendChild(navstyle);

navbar = document.createElement("nav");
navbar.innerHTML = '<a href="/">Base</a>';
navbar.innerHTML += anchor("2021");
navbar.innerHTML += anchor("2020");
navbar.innerHTML += anchor("2019");
navbar.innerHTML += anchor("2018");
navbar.innerHTML += anchor("2017");
document.body.appendChild(navbar);
