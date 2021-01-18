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

function scaler(object,wrap,scale){
  wrap.style.height=scale*object.offsetHeight+"px";
  object.style.transform="translate(-50%,-50%) scale("+scale+","+scale+")";
}

var scale=1;
var wrap=document.getElementById("cWrapper");
if(window.outerWidth<700){scale=wrap.offsetWidth/clide.offsetWidth;}
document.getElementById("scaleinfo").innerHTML+="Circle scale: "+scale;
scaler(clide,wrap,scale);

clide.addEventListener("mousedown", cStart, false);
clide.addEventListener("touchstart", cStart, false);
clide.addEventListener("mousemove", cDrag, false);
clide.addEventListener("touchmove", cDrag, false);
//window.addEventListener("resize", rHandler, false);

function ruleSwitch(rh,aw,mw,r,tsd,rc,am,sd) {
  document.getElementById("rHead").innerText=rh;
  document.getElementById("addsub").style.fontWeight=aw;
  document.getElementById("muldiv").style.fontWeight=mw;
  document.getElementById("fixed").src="images/"+r+".svg";
  document.getElementById("slide").src="images/"+r+".svg";
  document.getElementById("tblk").style.display=tsd;
  rConvert= rc;
  addmul = am;
  subdiv = sd;
}

function changeRule() {
  if(document.getElementById("switch").checked){
    ruleSwitch("Multiply/divide","normal","bold","log","block",(x)=>Math.pow(10,x/1000)," × "," / ");
  }else{
    ruleSwitch("Add/subtract","bold","normal","linear","none",(x)=>x/50," + "," – ");
  }
  readings();
}

function getX(e) {
  if(e.type=="touchstart"||e.type=="touchmove") {return  e.touches[0].clientX/scale}
  return e.clientX/scale
}

function dragStart(e) {if(e.currentTarget.id=="rblk") {active=runner}else{active=slide}dStart=getX(e);}

function drag(e) {
  if(active) {
    e.preventDefault();
    dNext = getX(e);
    active.t+=dNext-dStart;
    active.element.style.transform="translate("+active.t+"px)";
    dStart = dNext;
    readings();
  }
}

function dragEnd(e) {active = false;readings();}

function readings() {
  var refzero = rConvert(slide.t);
  var reften = rConvert(slide.t+1000);
  var result = rConvert(runner.t+500);
  var run = rConvert(runner.t-slide.t+500);
  document.getElementById("info").innerHTML = refzero.toFixed(2) + "<br />" + refzero.toFixed(2);
  document.getElementById("tinfo").innerHTML = (reften).toFixed(2) + "<br />" + (reften).toFixed(2);
  document.getElementById("add").innerHTML= addmul+run.toFixed(2)+" = "+result.toFixed(2)+"<br />"+"= "+result.toFixed(2)+subdiv+run.toFixed(2);
}

document.getElementById("switch").checked=false;

var slide = {element:document.getElementById("sblk"),t:0};
var space = document.getElementById("rs");
var dStart, dNext, rConvert, addmul, subdiv;
ruleSwitch("Add/subtract","bold","normal","linear","none",(x)=>x/50," + "," – ");
var runner = {element:document.getElementById("rblk"),t:0}; // set up runner/glass
readings();

slide.element.addEventListener("touchstart", dragStart, false);
slide.element.addEventListener("mousedown", dragStart, false);
space.addEventListener("touchmove", drag, false);
space.addEventListener("mousemove", drag, false);
window.addEventListener("touchend", dragEnd, false);
window.addEventListener("mouseup", dragEnd, false);
runner.element.addEventListener("touchstart", dragStart, false);
runner.element.addEventListener("mousedown", dragStart, false);

wrap=document.getElementById("wrapper");
var object=document.getElementById("scaler");
scale=wrap.offsetWidth/object.offsetWidth;
document.getElementById("scaleinfo").innerHTML+="; linear scale: "+scale;
scaler(object,wrap,scale);
