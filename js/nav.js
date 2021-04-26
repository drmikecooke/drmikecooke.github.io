function anchor(url,text) {return '<a href="'+url+'">'+text+'</a>'}

var navstyle = document.createElement("style");
navstyle.innerText = "nav{font-family:Franklin;font-size:18px;overflow:hidden;background-color:#333;user-select:none;}"
navstyle.innerText += "nav a{display:inline-block;color:#f2f2f2;text-align:center;padding:14px 16px;text-decoration:none;}";
navstyle.innerText += "nav a:hover{background-color:#ddd;color:black;}";
document.body.appendChild(navstyle);
navbar = document.createElement("nav");
navbar.innerHTML = '<a href="/" style="float:right">Back to base</a>\n';
navbar.innerHTML += anchor("/","Base");
navbar.innerHTML += anchor("/eT/fi/fi0.html","Infection delays");
navbar.innerHTML += anchor("eT/",'<span class="exponential">e<em><sup>x</sup>ponential</em></span> Times');
navbar.innerHTML += anchor("/eT/SIR/SIR0.html","SIR model and covid-19");
navbar.innerHTML += anchor("/ST","Semiconductor Today");
navbar.innerHTML += anchor("/Other","Website experiments");
navbar.innerHTML += anchor("/work.html","Mobile menu test");
document.body.appendChild(navbar);
