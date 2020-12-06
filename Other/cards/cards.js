function card(data, i) {
  var out = "<div class='card'>";
  out += "<h3>"+data.title+"</h3>";
  out += "<card id='cardDiv"+i+"'></div>";
  out += "</div>";
  document.getElementById("cardBody"+i).innerHTML = out;
}

function getCards(array) {
  for(var i=0; i<array.length; i++) {
    document.getElementById("menu").innerHTML += "<a onclick=\"goto('"+array[i]+"')\"><div id='cardBody"+i+"'></div></a>";
    loadAJAX(array[i], makeCbCard(i), 'json');
  }
}

function makeCbCard(i) {return (e) => {
    var response = e.target.response;
    card(response, i);
    if(response.htm) {loadDoc(response.htm,'cardDiv'+i)}
  }
}

document.getElementById("abody").innerHTML = "<div id='menu' class='menu'></div>";
getCards(['tests/width.json', "tests/AJAX/cd.json", "tests/AJAX/info.json", 'json/json.json', 'Factor/Factor.json']);
