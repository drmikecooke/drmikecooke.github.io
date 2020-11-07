function card(data) {
  var out = "<div class='card'>";
  out += "<h3>"+data.title+"</h3>";
  out += "<card id='cardDiv'></div>";
  out += "</div>"
  document.getElementById("cardBody").innerHTML = out;
}

function getJSON(file) {
  document.getElementById("abody").innerHTML = "<a onclick=\"goto('"+file+"')\"><div id='cardBody'></div></a>";
  loadAJAX(file, cbCard, 'json')
}

function cbCard(e) {
  var response = e.target.response;
  card(response);
  if(response.htm) {loadDoc(response.htm,'cardDiv')}
}

getJSON("tests/AJAX/cd.json");
