function anchor(url,text) {return '<a href="'+url+'">'+text+'</a>'}

function drop(bname,path,carray) {
  var menu = document.createElement("div");
  menu.className = "dropdown";
  navbar.appendChild(menu);
  var button = document.createElement("button");
  button.className = "dropbtn";
  button.innerText = bname+" ▼";
  menu.appendChild(button);
  var content = document.createElement("div");
  content.className = "dropdown-content";
  for(var aitem of carray){content.innerHTML +=anchor(path+aitem[0],aitem[1])}
  menu.appendChild(content);
}

var navstyle = document.createElement("style");
navstyle.innerText = "nav{font-family:Franklin;font-size:18px;overflow:hidden;background-color:#333;user-select:none;}"
navstyle.innerText += "nav a{float:left;color:#f2f2f2;text-align:center;padding:14px 16px;text-decoration:none;}";
navstyle.innerText += ".dropdown{float:left;overflow:hidden;font-size:inherit;}";
navstyle.innerText += ".dropdown .dropbtn{font-size:18px;font-weight:normal;border:none;outline:none;color:white;padding:14px 16px;background-color:inherit;font-family:inherit;margin:0;}";
navstyle.innerText += "nav a:hover,.dropdown:hover .dropbtn{background-color:#ddd;color:black;}";
navstyle.innerText += ".dropdown-content{display:none;position:absolute;background-color:#f9f9f9;min-width:160px;box-shadow:0px 8px 16px 0px rgba(0,0,0,0.2);z-index:1;}";
navstyle.innerText += ".dropdown-content a {float:none;color:black;padding: 12px 16px;text-decoration:none;display:block;text-align:left;}";
navstyle.innerText += ".dropdown-content a:hover{background-color:#ddd;}.dropdown:hover .dropdown-content{display:block;}";
document.body.appendChild(navstyle);

var navbar = document.createElement("nav");
navbar.innerHTML += '<a href="/" style="float:right">Back to base</a>\n';
navbar.innerHTML += anchor("/eT","Prospectus");
navbar.innerHTML += anchor("/eT/Power/Power.html","Powering<sup>up</sup>");
navbar.innerHTML += anchor("/eT/Backlog/backlog.html","Backlog");
drop("Analysis","/eT/",[["Basic analysis/basic.html","Basic"],["Richardson/Richardson.html","Richardson extrapolation"]]);
drop("Bugs, bunnies . . .","/eT/Branching/",[["Branching1.html","1 Branches"],["Branching2.html","2 Wascally wabbits"],["Branching3.html","3 Boom!"]]);
drop("SIR models  . . .","/eT/SIR/",[["SIR0.html","0 Introduction"],["SIR1.html","1 Exponential growth"],["SIR2.html","2 Reproduction number"],["SIR3.html","3 Estimating the parameters"],["SIR4.html","4 Implementing the model"],["SIR5.html","5 Update December 2020"]]);
drop("Logjam","/eT/Logjam/",[["logjam0.html","0 Introduction"],["logjam1.html","1 So what are logarithms?"],["logjam2.html","2 Power relations"],["logjam3.html","3 Tabling some vulgarity"],["logjam4.html","4 Compound uselessness"],["logjam5.html","5 I hear you"],["logjam6.html","6 Graph-o-log-y or log-graph-y?"],["logjam7.html","7 What the frack is a slide-rule?"],["logjam8.html","8 Thoughts on world population"]]);
drop("Infection delays  . . .","/eT/fi/",[["fi0.html","1 Introduction"],["fi1.html","2 Example: Two-day delay"],["fi2.html","3 Example: Three-day delay"],["fi3.html","4 Example: Interactive"],["fi4.html","5 Example: Drowning and waving"],["fi5.html","6 Infinite interlude"],["fi6.html","7 Multiple generalizations"]]);
document.body.appendChild(navbar);
