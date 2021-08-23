function anchor(url,text){return `<a href="${url}">${text}</a>`}

function bar(y){return `<rect y="${y}" width="70" height="10" rx="8" fill="white"></rect>`}

function details(title,list){
  var element=document.createElement("details");
  var summary=document.createElement("summary");
  summary.innerText=title;
  element.appendChild(summary);
  for (var item of list)element.innerHTML+=anchor("/eT/"+item[0],item[1]);
  return element
}

function hidePopup() {
  document.getElementById("chkr").checked = false;
}

var navstyle = document.createElement("style");
navstyle.innerText = "nav{position: relative;font-family:Franklin;}";
navstyle.innerText += "nav.bars{background-color:#1E1E23;padding:10px;cursor:pointer;}";
navstyle.innerText += "nav.bars svg{width:auto;}";
navstyle.innerText += "nav input{width:40px;height:40px;position:absolute;left:5px;top:5px;cursor:pointer;opacity:0;z-index:2;}";
navstyle.innerText += "nav input:checked~#menupanel{display:block}";
navstyle.innerText += "nav input:checked ~ .blocker {display:block}";
navstyle.innerText += "nav a:hover{background-color:#333;color:white;}";
navstyle.innerText += "nav a{display:block;padding:5px;}";
navstyle.innerText += "nav #menupanel{font-family:Franklin;font-size:18px;position:absolute;box-shadow:0 0 10px #85888C;padding:10px;background-color:#F5F6FA;transform-origin:0% 0%;z-index:1;display:none;transition:transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);top:5px;left:5px;}";
navstyle.innerText += "nav .blocker{position:fixed;top:0;left:0;bottom:0;right:0;content:' ';background:rgba(0,0,0,.5);display:none;}";
navstyle.innerText += "nav details{background-color:#aaa;margin:9px 0;}";
navstyle.innerText += "nav summary{font-family:Franklin;color:black;background-color:#ccc; padding:3px;}";
document.body.appendChild(navstyle);

var navpanel=document.createElement("nav");
navpanel.className="bars";
var bars=document.createElementNS("http://www.w3.org/2000/svg", "svg");
bars.setAttribute("viewBox","0 0 70 60");
bars.setAttribute("width","30px");
bars.innerHTML+=bar(0)+bar(25)+bar(50);
navpanel.appendChild(bars);

navpanel.innerHTML+='<input id="chkr" type="checkbox" /><div class="blocker" onclick="hidePopup()"></div>';

var menu=document.createElement("div");
menu.id="menupanel";

var cross=document.createElementNS("http://www.w3.org/2000/svg", "svg");
cross.setAttribute("viewBox","0 0 80 80");
cross.setAttribute("width","30px");
cross.innerHTML='<line x1="10" y1="10" x2="40" y2="40" stroke="red" stroke-linecap="round" stroke-width="10" />';
cross.innerHTML+='<line x1="10" y1="40" x2="40" y2="10" stroke="red" stroke-linecap="round" stroke-width="10" />';
menu.appendChild(cross);

menu.innerHTML+=anchor('/','Base');
menu.innerHTML+=anchor("/eT","Prospectus");
menu.innerHTML+=anchor("/eT/Logistic/0.html","Limits");
menu.innerHTML+=anchor("/eT/Power/Power.html","Powering<sup>up</sup>");
menu.innerHTML+=anchor("/eT/Backlog/backlog.html","Backlog");

var analysis=[];
analysis.push(["Basic analysis/basic.html","Basic"]);
analysis.push(["Richardson/Richardson.html","Richardson extrapolation"]);
menu.appendChild(details("Analysis",analysis))

var bugs=[];
bugs.push(["Branching/Branching1.html","1 Branches"]);
bugs.push(["Branching/Branching2.html","2 Wascally wabbits"]);
bugs.push(["Branching/Branching3.html","3 Boom!"]);
menu.appendChild(details("Bugs, bunnies . . .",bugs))

var sir=[];
sir.push(["SIR/SIR0.html","0 Introduction"]);
sir.push(["SIR/SIR1.html","1 Exponential growth"]);
sir.push(["SIR/SIR2.html","2 Reproduction number"]);
sir.push(["SIR/SIR3.html","3 Estimating the parameters"]);
sir.push(["SIR/SIR4.html","4 Implementing the model"]);
sir.push(["SIR/SIR5.html","5 Update December 2020"]);
menu.appendChild(details("SIR models  . . .",sir))

var logjam=[];
logjam.push(["Logjam/logjam0.html","0 Introduction"]);
logjam.push(["Logjam/logjam1.html","1 So what are logarithms?"]);
logjam.push(["Logjam/logjam2.html","2 Power relations"]);
logjam.push(["Logjam/logjam3.html","3 Tabling some vulgarity"]);
logjam.push(["Logjam/logjam4.html","4 Compound uselessness"]);
logjam.push(["Logjam/logjam5.html","5 I hear you"]);
logjam.push(["Logjam/logjam6.html","6 Graph-o-log-y or log-graph-y?"]);
logjam.push(["Logjam/logjam7.html","7 What the frack is a slide-rule?"]);
logjam.push(["Logjam/logjam8.html","8 Thoughts on world population"]);
menu.appendChild(details("Logjam",logjam))

var delays=[];
delays.push(["fi/fi0.html","0 Introduction"]);
delays.push(["fi/fi1.html","1 Example: Two-day delay"]);
delays.push(["fi/fi2.html","2 Example: Three-day delay"]);
delays.push(["fi/fi3.html","3 Example: Interactive"]);
delays.push(["fi/fi4.html","4 Example: Drowning and waving"]);
delays.push(["fi/fi5.html","5 Infinite interlude"]);
delays.push(["fi/fi6.html","6 Multiple generalizations"]);
delays.push(["fi/fi7.html","7 Accumulator"]);
menu.appendChild(details("Infection delays  . . .",delays))

var poly=[];
poly.push(["maths/poly/0.html","Introduction"]);
poly.push(["maths/poly/1.html","Linear functionals"]);
poly.push(["maths/poly/2.html","Orthogonal sets"]);
poly.push(["maths/poly/3.html","Favard’s theorem"]);
poly.push(["maths/poly/4.html","Determinant"]);

var sums=[];
sums.push(["maths/sum/0.html","Introduction"]);
sums.push(["maths/sum/1.html","Bernoulli link"]);

var geo=[]
geo.push(["maths/geometric/0.html","Introduction"]);
geo.push(["maths/geometric/1.html","Derived sums"]);
geo.push(["maths/geometric/2.html","Interesting, sort of"]);

var wig=[]
wig.push(["maths/wigner/0.html","Introduction"]);
wig.push(["maths/wigner/B0.html","Bargmann thread"]);
wig.push(["maths/wigner/U0.html","Uhlhorn thread"]);
wig.push(["maths/wigner/1.html","Additive bounded mappings"]);

var mathse=document.createElement("details");
var mathss=document.createElement("summary");
mathss.innerText="Maths bits";
mathse.appendChild(mathss);
mathse.appendChild(details("Polynomials",poly));
mathse.appendChild(details("Power sums",sums));
mathse.appendChild(details("Geometric",geo));
mathse.innerHTML+=anchor("/eT/maths/geopower/0.html","Geometric-power sums");
mathse.innerHTML+=anchor("/eT/maths/eulerian/0.html","Eulerian");
mathse.innerHTML+=anchor("/eT/maths/union/0.html","Union strength");
mathse.appendChild(details("Wigner",wig));
menu.appendChild(mathse)

navpanel.appendChild(menu)

document.body.appendChild(navpanel);
