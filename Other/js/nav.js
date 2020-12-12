function addNav(url) {
  loadAJAX(url, cbAddNav, 'json');
}

function cbAddNav(e) {
  var loads = e.target.response;
  var url = e.target.responseURL;
  document.getElementsByTagName("nav")[0].innerHTML += '<a onclick="goto(\''+ url +'\')">' + loads.title + '</a>';
}

var navbar = document.getElementById("navmenu");
navbar.innerHTML = '<a href="/" style="float:right">Back to base</a>\n';
addNav("cards/cards.json");
addNav("tests/width.json");
addNav("tests/AJAX/cd.json");
addNav("tests/AJAX/info.json");
addNav("json/json.json");
addNav("Factor/Factor.json");
