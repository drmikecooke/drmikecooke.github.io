function myFunction(arr) {
  var out = "";
  var i;
  for(i = 0; i < arr.length; i++) {
    out += '<a href="' + arr[i].url + '">' + 
    arr[i].display + '</a><br/>';
  }
  document.getElementById("abody").innerHTML = out;
}

function getJSON1() {
  loadAJAX("json/myTutorials.txt", cbJSON, 'json')
}

function cbJSON(e) {
  var response = e.target.response;
  myFunction(response);
}

getJSON1();
