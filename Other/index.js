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
  if(loads.htm) {loadDoc(loads.htm,'article')}
  if(loads.css) {css(loads.css)}
  if(loads.js) {script(loads.js)}
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
