function cStart(e) {
  currentA=cA(e);
  if(Math.abs(currentA-wedge.angle)<10) {active=wedge}else{active=inner};
}

function cDrag(e) {
  if(active){
    e.preventDefault();
    nextA=cA(e);
    var deltaA=nextA-currentA;
    active.angle+=deltaA;
    rotate(active);
    currentA=nextA;
    cReadings()
  }
}

function cdragEnd(e) {
  active = false;
}

function cXY(e) {
  var rect = document.getElementById("circle").getBoundingClientRect();
  var oX=rect.left+rect.width/2,oY=rect.height/2+rect.top;
  var stem;
  if(e.type=="touchstart" || e.type=="touchmove") {stem=e.touches[0]} else {stem=e}
  return [stem.clientX-oX, oY-stem.clientY];  // Position within element relative to center.
}

function cA(e) {
  var [X,Y] = cXY(e);
  return Math.atan2(X, Y)*180/Math.PI
}

function rotate(object) {object.element.style.transform="rotate("+object.angle+"deg)";}

function cReadings() {
  var html = "";
  var sf = Math.pow(10,inner.angle/360);
  var wf = Math.pow(10,wedge.angle/360);
  var ws = Math.pow(10,(wedge.angle-inner.angle)/360);
  html += sf.toPrecision(3) + " × " + ws.toPrecision(3) + " = " + wf.toPrecision(3) + "<br />";
  html += wf.toPrecision(3) + " / " + ws.toPrecision(3) + " = " + sf.toPrecision(3);
  ctext.innerHTML = html;
}

function rHandler(e){window.location.href=window.location.href;}

var clide=document.getElementById("clide");
var wedge={element:document.getElementById("wedge"),angle:90};
var inner={element:document.getElementById("inner"),angle:0};
var ctext=document.getElementById("ctext");
var currentA,nextA,active;
active=false;

rotate(wedge);
rotate(inner);
cReadings();

var scale=1;
var wrap=document.getElementById("cWrapper");
if(window.innerWidth<700){scale=wrap.offsetWidth/clide.offsetWidth;}
wrap.style.height=scale*clide.offsetHeight+"px";
clide.style.transform="translate(-50%,-50%) scale("+scale+","+scale+")";

clide.addEventListener("mousedown", cStart, false);
clide.addEventListener("touchstart", cStart, false);
clide.addEventListener("mousemove", cDrag, false);
clide.addEventListener("touchmove", cDrag, false);
window.addEventListener("touchend", cdragEnd, false);
window.addEventListener("mouseup", cdragEnd, false);
window.addEventListener("resize", rHandler, false);