// app.js
import { tag } from '/Other/modules/html.js';
function go() {
const h1 = tag('h1', '👋 Hello Modules!');
var div = document.getElementById("abody");
div.appendChild(h1)
}
