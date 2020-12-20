function showAll() {
  var showList = document.getElementsByTagName("details"), p;
  for(p=0; p<showList.length;p++) {showList[p].open = true}
  document.getElementById("sA").style.backgroundColor = "white";
  document.getElementById("sA").style.color = "#555";
  document.getElementById("hA").style.backgroundColor = "#555";
  document.getElementById("hA").style.color = "white";
}
function hideAll() {
  var showList = document.getElementsByTagName("details"), p;
  for(p=0; p<showList.length;p++) {showList[p].open = false}
  document.getElementById("hA").style.backgroundColor = "white";
  document.getElementById("hA").style.color = "#555";
  document.getElementById("sA").style.backgroundColor = "#555";
  document.getElementById("sA").style.color = "white";
}
function resetAll() {
  document.getElementById("sA").style.backgroundColor = "#555";
  document.getElementById("sA").style.color = "white";
  document.getElementById("hA").style.backgroundColor = "#555";
  document.getElementById("hA").style.color = "white";
}
