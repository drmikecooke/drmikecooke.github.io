function monthNumber(mon){
   return (new Date(Date.parse(mon +" 1, 2012")).getMonth()+1).toString().padStart(2,"0")
}

function imagePath(year,month,index) {
    var imgpath = "/ST/images/"+year+"/";
    imgpath += monthNumber(month)+"/"+index+"."
    return imgpath
}

function loadAJAX(file, callback, type) {
    var xhttp = new XMLHttpRequest();
    xhttp.onload = callback;
    xhttp.open("GET", file+'?'+(new Date()).getTime(), true);
    xhttp.responseType = type;
    xhttp.send(null);
}

function getJSON(year) {
    function cbJSON(e) {
        var figure,a,caption,img,i,imagepath;
        var response = e.target.response,h2;
        var panel = document.getElementById("panel");
        panel.innerHTML = "";
        for(var [mnth,value] of Object.entries(response)) {
            var month = newel(panel,"div",{className:"month"});
            h2 = newel(month,"h2",{innerText:mnth+" "+year});
            for(i = 0; i < value.length; i++) {
                imgpath = imagePath(year,mnth,i+1);
                figure = addelement(month,"figure");
                a = newel(figure,"a",{href:value[i].url,target:"_blank"});
                caption = newel(a,"figcaption",{innerText:(i+1)+" "+value[i].caption});
                img = newel(a,"img",{src:imgpath+value[i].img,alt:value[i].img,"style.height": "180px"});
            }
        }
        figcapSearch();
    }
    document.title = "Mike at ST/"+year;
    loadAJAX("/ST/json/"+year+".json", cbJSON, 'json');
}
        
var css = ".month{display:inline-block;background-color:beige;margin:20px;}";
css += "figcaption{font-size: 1em;text-align: center;padding: 0px;}";
css += "figure{display:inline-block;text-align:center;vertical-align:top;background-color:white;height:220px;width:210px;padding:10px;margin:10px;}";
css += "figure img{max-height:60%;max-width:95%;padding:10px;}";
var style = newel(document.body,"style",{innerText:css});
var year = "2020";  
getJSON(year);
