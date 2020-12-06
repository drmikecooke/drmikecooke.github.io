function lcard(href, head, img) {
document.getElementById("lcards").innerHTML += '<a href = "' + href + '"><div class="cardh-250px"><h2>' + head +
      '</h2><img class="h-180px" src="' + img + '" alt="' + img + '" /></div></a>';
}
