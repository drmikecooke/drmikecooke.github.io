function lcard(href, head, img) {return '<a href = "' + href + '"><div class="cardh-250px"><h2>' + head + '</h2><img class="h-180px" src="' + img + '" alt="' + img + '" /></div></a>'}

var container = document.getElementById("container");
var lpanel = document.createElement("div");
lpanel.className = "panel";
container.appendChild(lpanel);
lpanel.innerHTML += lcard("/eT/SIR/SIR5.html", "SIR, December 2020 update", "/images/SIR2012.svg");
lpanel.innerHTML += lcard("/eT/fi/fi4.html", "Drowning and waving", "/eT/fi/images/weekly.svg");
lpanel.innerHTML += lcard("/eT/fi/fi0.html", "Infection delays", "/images/infdel.png");
lpanel.innerHTML += lcard("/eT/SIR/SIR0.html", "SIR model and covid-19", "/eT/SIR/images/SIR.svg");
lpanel.innerHTML += lcard("/eT", '<span class="exponential">e<em><sup>x</sup>ponential</em></span> <span class="frank">Times</span>', "/images/burn.webp");
lpanel.innerHTML += lcard("/eT/Branching/Branching1.html", "Bugs, bunnies, . . .", "/eT/images/branch.svg");
lpanel.innerHTML += lcard("/eT/Logjam/logjam0.html", "Logjam", "/images/tags.webp");
lpanel.innerHTML += '<a href="/ST"><div class="cardh-250px" style="width:20%;"><h2>My writing at </h2><img src="/ST/images/STbanner.svg" alt="ST" style="width:100%;margin:45px 0;" /><p>I frequently contribute to the online magazine <em>Semiconductor Today</em>.</p></div></a>';
