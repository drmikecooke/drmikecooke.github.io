function wh() {
  var width=document.documentElement.clientWidth;
  var height=document.documentElement.clientHeight;
  document.getElementById('widthxheight').innerHTML =  width+'x'+height;
  var button=document.getElementById('button');
  button.innerHTML="Reset."
  button.onclick=reset
}

function reset() {
  var button=document.getElementById('button');
  button.innerHTML="Width x height.";
  button.onclick=wh;
  document.getElementById('widthxheight').innerHTML =  '';
}
