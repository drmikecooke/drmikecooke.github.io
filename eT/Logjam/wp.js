function wpGraph(yscale) {
    var [trange,prange]=getRange();
    if(yscale=='log') {prange=prange.map((v)=>Math.log(v)/Math.LN10)}
    target('wpop','');
    var data = [plotlyTrace(wpTable, 0, 1, 'red', 4)];
    var layout = {
        title: wpTable.heading,
        showlegend: false,
        xaxis: {title: wpTable.heads[0], range: trange},
        yaxis: {title: wpTable.heads[1], type: yscale, range: prange},
        plot_bgcolor: 'beige',
    }
    var config = {scrollZoom: false};
    Plotly.newPlot('wpop',data,layout,config);
}

function loadAJAX(file, callback, type) {
    var xhttp = new XMLHttpRequest();
    xhttp.onload = callback;
    xhttp.open("GET", file+'?'+(new Date()).getTime(), true);
    xhttp.responseType = type;
    xhttp.send(null);
}

function cbCSV(e) {
    var response = e.target.response;
    var rows = response.split("\n");
    var wpdata =[]
    for(var i=0;i<rows.length;i++) {wpdata.push(rows[i].split(","))}
    var wpheads = wpdata.shift();
    wpTable = new Table("World population/time",wpheads,wpdata);
}

function getRange() {return [getValue('trange').split(','),getValue('prange').split(',')]}

var wpTable;
loadAJAX('wp.csv',cbCSV,"text");
