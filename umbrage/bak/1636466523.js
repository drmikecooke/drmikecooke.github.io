var menuItems = {}

function anchor(url,text){return `<a href="${url}">${text}</a>`}

function bar(y){return `<rect y="${y}" width="70" height="10" rx="8" fill="white"></rect>`}

function details(title,list){
  var element=document.createElement("details");
  var summary=document.createElement("summary");
  summary.innerText=title;
  element.appendChild(summary);
  for (var item of list)element.innerHTML+=anchor('/lorentz/'+item[0],item[1])
  return element
}

function hidePopup() {
  document.getElementById("chkr").checked = false;
}

var navstyle = document.createElement("style");
navstyle.innerText = "nav{position: relative;}";
navstyle.innerText += "nav input{width:40px;height:40px;position:absolute;left:5px;top:5px;cursor:pointer;opacity:0;z-index:2;}";
navstyle.innerText += "nav input:checked~#menupanel{display:block}";
navstyle.innerText += "nav input:checked ~ .blocker {display:block}";
navstyle.innerText += "nav.bars{background-color:#1E1E23;padding:10px;cursor:pointer;}";
navstyle.innerText += "nav.bars svg{width:auto;}";
navstyle.innerText += "nav a:hover{background-color:#333;color:white;}";
navstyle.innerText += "nav a{display:block;padding:5px;}";
navstyle.innerText += "nav #menupanel{font-family:Franklin;font-size:18px;position:absolute;box-shadow:0 0 10px #85888C;padding:10px;background-color:#F5F6FA;transform-origin:0% 0%;z-index:1;display:none;transition:transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);top:5px;left:5px;}";
navstyle.innerText += "nav .blocker{position:fixed;top:0;left:0;bottom:0;right:0;content:' ';background:rgba(0,0,0,.5);display:none;}";
navstyle.innerText += "nav details{background-color:#aaa;margin:9px 0;}";
navstyle.innerText += "nav summary{background-color:#ccc; padding:3px;}";
document.body.appendChild(navstyle);

var navpanel=document.createElement("nav");
navpanel.className="bars";
var bars=document.createElementNS("http://www.w3.org/2000/svg", "svg");
bars.setAttribute("viewBox","0 0 70 60");
bars.setAttribute("width","30px");
bars.innerHTML+=bar(0)+bar(25)+bar(50);
navpanel.appendChild(bars);

navpanel.innerHTML+='<input id="chkr" type="checkbox" /><div class="blocker" onclick="hidePopup()"></div>';

var menu=document.createElement("div");
menu.id="menupanel";

var cross=document.createElementNS("http://www.w3.org/2000/svg", "svg");
cross.setAttribute("viewBox","0 0 80 80");
cross.setAttribute("width","30px");
cross.innerHTML='<line x1="10" y1="10" x2="40" y2="40" stroke="red" stroke-linecap="round" stroke-width="10" />';
cross.innerHTML+='<line x1="10" y1="40" x2="40" y2="10" stroke="red" stroke-linecap="round" stroke-width="10" />';
menu.appendChild(cross);

menu.innerHTML+=anchor('/','Base');
menu.innerHTML+=anchor('/umbrage','Umbrage'); // Section base
for(var menuItem in menuItems) {
    menu.appendChild(details(menuItem,menuItems[menuItem]))
}

navpanel.appendChild(menu)

document.body.appendChild(navpanel);
