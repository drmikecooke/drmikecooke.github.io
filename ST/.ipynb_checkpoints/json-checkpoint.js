        function loadAJAX(file, callback, type) {
            var xhttp = new XMLHttpRequest();
            xhttp.onload = callback;
            xhttp.open("GET", file+'?'+(new Date()).getTime(), true);
            xhttp.responseType = type;
            xhttp.send(null);
        }

function getJSON(year) {
    function cbJSON(e) {
        var figure,a,caption,img,i;
        var response = e.target.response,h2;
        var panel = document.getElementById("panel");
        panel.innerHTML = "";
        for(var [mnth,value] of Object.entries(response)) {
            var month = newel(panel,"div",{className:"month"});
            h2 = newel(month,"h2",{innerText:mnth+" "+year});
            for(i = 0; i < value.length; i++) {
                figure = addelement(month,"figure");
                a = newel(figure,"a",{href:value[i].url,target:"_blank"});
                caption = newel(a,"figcaption",{innerText:(i+1)+" "+value[i].caption});
                img = newel(a,"img",{src:"/ST/images/"+value[i].img,alt:value[i].img,"style.height": "180px"});
            }
        }
    }
    document.title = "Mike at ST/"+year;
    loadAJAX("/ST/json/"+year+".json", cbJSON, 'json');
}
        
        function addelement(to,type) {
            var newelement = document.createElement(type);
            to.appendChild(newelement);
            return newelement;
        }
        
        function changel(el,props) {
            for(var [prop,value] of Object.entries(props)) {
                el[prop] = value;
            }
        }
        
        function newel(to,type,props) {
            var newelem = addelement(to,type);
            changel(newelem,props);
            return newelem
        }

var mclass = ".month{display:inline-block;background-color:beige;margin:20px;}";
mclass += "figcaption{font-size: 1em;text-align: center;padding: 0px;}";
mclass += "figure{display:inline-block;text-align:center;vertical-align:top;background-color:white;height: 220px;width: 210px;padding: 10px;margin: 10px;}";
mclass += "figure img{max-height:60%;max-width:85%;padding: 10px;}";
var style = newel(document.body,"style",{innerText:mclass});
var year = "2020";  
getJSON(year);