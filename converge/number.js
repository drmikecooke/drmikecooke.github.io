// set numbered url features
function setUrl(id,url) {
var pointer=document.getElementById(id);
var anchor=pointer.childNodes[0];
anchor.href=url;
}

function blank(id) {
var pointer=document.getElementById(id);
pointer.style.display="none";
}

function setPointer(url, id)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url);
    http.send();
    http.onreadystatechange = function() {
        if (this.readyState == this.DONE) {
            if(this.status!=404){setUrl(id,url)} else {blank(id)}
        }
    };    
}

var urlbits=window.location.href.split('/').slice(-1)[0];
urlbits=urlbits.split('.')[0];
if(!isNaN(urlbits)){
urlbits=Number(urlbits);
document.title+=' '+urlbits;
if(document.getElementById('tag')){document.getElementById('tag').innerText+=' '+urlbits;}
if(document.getElementsByTagName('h1').length){document.getElementsByTagName('h1')[0].innerText+=' '+urlbits;}
setPointer((urlbits-1)+'.html',"prev");
setPointer((urlbits+1)+'.html',"next");
}
