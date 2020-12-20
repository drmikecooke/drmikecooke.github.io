var div = document.getElementById("abody");
var modid = "app2.js";
if(document.getElementById(modid)) {document.getElementById(modid).remove()}
div.innerHTML="Bloody hell!";
var addmod = document.body.appendChild(document.createElement('script'));
addmod.type ="module";
addmod.async = true;
addmod.id = modid;
addmod.src="/Other/modules/app2.js"+'?'+(new Date()).getTime();
