var footer = document.createElement('footer');
var a = document.createElement('a');
var style = "";
a.href = "mailto:mike@mikecookefreelance.com";
a.text = "mike@mikecookefreelance.com";
if(window.innerWidth<900) {style="font-size:18px;"} else {style="font-size:21px;"}
style += "font-weight:bold;color:black;font-family: Arial, Helvetica, sans-serif;text-decoration:none;color:black;"
a.style = style;
footer.style = 'padding:5px;background:#ccc;text-align:center;';
document.body.appendChild(footer);
footer.appendChild(a);
