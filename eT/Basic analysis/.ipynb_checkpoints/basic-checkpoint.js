function power(b,N) {
    var a;
    if(N==1) {
        return b;
    } else {
    var d = divmod(N,2);
    var p = power(b,d[0]);
    if(d[1]) {
        a = b
    } else {
        a = 1
    }
    return p*p*a
    }
}

function divmod(x,y) {
    return [Math.floor(x/y),x%y]
}

function makeETable(Nmax) {
    var data = [[1,1,2]], N=1;
    for (var n=0;n<Nmax;n++) {
        N = N<<1;
        data.push([N,1/N,power(1+1/N,N)]);
    }
    return new Table("Estimates for <em>e</em>",["N","Δx","e (est.)"], data)
}

function setETable(Nmax) {
    var eTable = makeETable(Nmax);
    target('eTable',eTable.HTML())
}

function PlotlyETable(Nmax) {
  target('eTable','');
  var eTable = makeETable(Nmax);
  var pa = new PlotlyArgs('eTable', eTable, 1, 2, 'red', 4, 'beige')
  Plotly.newPlot(...pa.args);
  var bglayer = document.getElementsByClassName("bglayer");
  var bgrect = bglayer[0].firstElementChild;
  bgrect.outerHTML = "<rect width='100%' height='100%' style='fill:beige;' />";
  var ytitle = document.getElementsByClassName("ytitle");
  ytitle[0].setAttribute("data-unformatted", "stuff"); // Remove html <sup>/</sup> tags that invalidate svg file
  /*document.getElementById('saveSVG').style = 'display:block;';
  document.getElementById('saveCSV').style = 'display:none;';*/
}


function makeNETable(Nmax) {
    var ndata = [], N=1;
    for (var n=0;n<10;n++) {
        N = N<<1;
        ndata.push([N,1/N,1/power(1-1/N,N)]);
    }
    return new Table("Estimates for <em>e</em> (negative Δx)",["N","-Δx","e (est.)"], ndata)
}

function setNETable(Nmax) {
    var eTable = makeNETable(Nmax);
    target('neTable',eTable.HTML())
}

function PlotlyNETable(Nmax) {
  target('neTable','');
  var eTable = makeNETable(Nmax);
  var pa = new PlotlyArgs('neTable', eTable, 1, 2, 'red', 4, 'beige')
  Plotly.newPlot(...pa.args);
  var bglayer = document.getElementsByClassName("bglayer");
  var bgrect = bglayer[0].firstElementChild;
  bgrect.outerHTML = "<rect width='100%' height='100%' style='fill:beige;' />";
  var ytitle = document.getElementsByClassName("ytitle");
  ytitle[0].setAttribute("data-unformatted", "stuff"); // Remove html <sup>/</sup> tags that invalidate svg file
  /*document.getElementById('saveSVG').style = 'display:block;';
  document.getElementById('saveCSV').style = 'display:none;';*/
}