function loadAJAX(file, callback, type) {
  var xhttp = new XMLHttpRequest();
  xhttp.onload = callback;
  xhttp.open("GET", file+'?'+(new Date()).getTime(), true);
  xhttp.responseType = type;
  xhttp.send(null);
}

function goto(file) {
  loadAJAX(file, cbGoto, 'json');
}

function cbGoto(e) {
  var loads = e.target.response;
  document.title = "Other: " + loads.title;
  document.getElementById("atitle").innerHTML = "<h3>" + loads.title + "</h3>";
  if(loads.htm) {loadDoc(loads.htm,'abody')}
  if(loads.css) {css(loads.css)+'?'+(new Date()).getTime()}
  if(loads.js) {script(loads.js+'?'+(new Date()).getTime())}
}

function makeCbDiv(div) {
  return (e) => {document.getElementById(div).innerHTML = e.target.response}
}

function loadDoc(file, div) {
  loadAJAX(file, makeCbDiv(div), 'text')
}

function loadError(oError) {
  throw new URIError("The file " + oError.target.id + " didn't load correctly.");
}

function script(url) {
  var id = url.split( "/" ).pop();
  if (document.getElementById(id)) {document.getElementById(id).remove()}
  var newScript = document.createElement("script");
  document.head.appendChild(newScript);
  newScript.onerror = loadError;
  newScript.type = 'text/javascript';
  newScript.async = true;
  newScript.src = url;
  newScript.id = id;
}

function css(url) {
  var id = url.split( "/" ).pop();
  if (document.getElementById(id)) {document.getElementById(id).remove()}
  var link  = document.createElement('link');
  link.onerror = loadError;
  link.id   = id;
  link.rel  = 'stylesheet';
  link.type = 'text/css';
  link.href = url;
  link.media = 'all';
  document.head.appendChild(link);
}

function addNav(url) {
  loadAJAX(url, cbAddNav, 'json');
}

function cbAddNav(e) {
  var loads = e.target.response;
  var url = e.target.responseURL;
  navbar.innerHTML += '<a onclick="goto(\''+ url +'\')">' + loads.title + '</a>';
}

function hidePopup() {
  document.getElementById("chkr").checked = false;
}

var navbar = document.getElementById("menupanel");
addNav("cards/cards.json");
addNav("tests/width.json");
addNav("tests/AJAX/cd.json");
addNav("tests/AJAX/info.json");
addNav("json/json.json");
addNav("Factor/Factor.json");
addNav("modules/module.json");
navbar.innerHTML += '<a href="/">Back to base</a>\n';
goto('cards/cards.json');
