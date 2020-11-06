function loadTable() {
  loadAJAX("tests/AJAX/cd_catalog.xml", cbXML, 'document');
}
function cbXML(e) {
  var i;
  var xmlDoc = e.target.response;
  var table="<tr><th class='border'>Artist</th><th class='border'>Title</th></tr>";
  var x = xmlDoc.getElementsByTagName("CD");
  for (i = 0; i <x.length; i++) { 
    table += "<tr><td class='border'>" +
    x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue +
    "</td><td class='border'>" +
    x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
    "</td></tr>";
  }
  document.getElementById("cds").innerHTML = table;
}
