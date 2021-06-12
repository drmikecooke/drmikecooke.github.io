var footer = document.createElement('footer');
var anchor = document.createElement('a');
var style = "";
anchor.href = "mailto:mike@mikecookefreelance.com";
anchor.text = "mike@mikecookefreelance.com";
if(window.innerWidth<900) {style="font-size:18px;"} else {style="font-size:21px;"}
style += "font-weight:bold;color:black;font-family: Arial, Helvetica, sans-serif;text-decoration:none;color:black;"
anchor.style = style;
footer.style = 'padding:5px;background:#ccc;text-align:center;';
document.body.appendChild(footer);
footer.appendChild(anchor);