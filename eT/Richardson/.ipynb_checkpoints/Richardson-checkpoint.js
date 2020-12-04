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

function e(N) {
    return power(1+1/N,N)
}

function e1(N) {
    return 2*e(2*N)-e(N)
}

function e2(N) {
    return (4*e1(2*N)-e1(N))/3
}

function makeR1ETable(Nmax) {
    var data = [], N=1;
    for (var n=0;n<Nmax+1;n++) {
        data.push([N,1/N,e(N),e1(N)]);
        N = N<<1;
    }
    return new Table("Estimates for <em>e</em>",["N","Δx","Basic e (est.)", "Richardson e (est.)"], data)
}

function makeR2ETable(Nmax) {
    var data = [], N=1;
    for (var n=0;n<Nmax+1;n++) {
        data.push([N,1/N,e(N),e1(N),e2(N)]);
        N = N<<1;
    }
    return new Table("Estimates for <em>e</em>",["N","Δx","Basic e (est.)", "1st Richardson", "2nd Richardson"], data)
}

function PlotlyR1ETable(Nmax) {
  target('reTable','');
  var reTable = makeR1ETable(Nmax);
  var pa = new PlotlyArgs('reTable', reTable, 1, 3, 'red', 4, 'beige')
  Plotly.newPlot(...pa.args);
  var bglayer = document.getElementsByClassName("bglayer");
  var bgrect = bglayer[0].firstElementChild;
  bgrect.outerHTML = "<rect width='100%' height='100%' style='fill:beige;' />";
  var ytitle = document.getElementsByClassName("ytitle");
  ytitle[0].setAttribute("data-unformatted", "stuff"); // Remove html <sup>/</sup> tags that invalidate svg file
  /*document.getElementById('saveSVG').style = 'display:block;';
  document.getElementById('saveCSV').style = 'display:none;';*/
}

function PlotlyR2ETable(Nmax) {
  target('r2eTable','');
  var reTable = makeR2ETable(Nmax);
  var pa = new PlotlyArgs('r2eTable', reTable, 1, 4, 'red', 4, 'beige')
  Plotly.newPlot(...pa.args);
  var bglayer = document.getElementsByClassName("bglayer");
  var bgrect = bglayer[0].firstElementChild;
  bgrect.outerHTML = "<rect width='100%' height='100%' style='fill:beige;' />";
  var ytitle = document.getElementsByClassName("ytitle");
  ytitle[0].setAttribute("data-unformatted", "stuff"); // Remove html <sup>/</sup> tags that invalidate svg file
  /*document.getElementById('saveSVG').style = 'display:block;';
  document.getElementById('saveCSV').style = 'display:none;';*/
}

function ne(N) {
    return 1/power(1-1/N,N)
}

function ne1(N) {
    return 2*ne(2*N)-ne(N)
}

function ne2(N) {
    return (4*ne1(2*N)-ne1(N))/3
}

function makeR1NETable(Nmax) {
    var data = [], N=2;
    for (var n=0;n<Nmax;n++) {
        data.push([N,1/N,ne(N),ne1(N)]);
        N = N<<1;
    }
    return new Table("Estimates for <em>e</em> (negative Δx)",["N","Δx","Basic e (est.)", "Richardson e (est.)"], data)
}

function makeR2NETable(Nmax) {
    var data = [], N=2;
    for (var n=0;n<Nmax;n++) {
        data.push([N,1/N,ne(N),ne1(N),ne2(N)]);
        N = N<<1;
    }
    return new Table("Estimates for <em>e</em> (negative Δx)",["N","Δx","Basic e (est.)", "1st Richardson", "2nd Richardson"], data)
}

function PlotlyR1NETable(Nmax) {
  target('rneTable','');
  var reTable = makeR1NETable(Nmax);
  var pa = new PlotlyArgs('rneTable', reTable, 1, 3, 'red', 4, 'beige')
  Plotly.newPlot(...pa.args);
  var bglayer = document.getElementsByClassName("bglayer");
  var bgrect = bglayer[0].firstElementChild;
  bgrect.outerHTML = "<rect width='100%' height='100%' style='fill:beige;' />";
  var ytitle = document.getElementsByClassName("ytitle");
  ytitle[0].setAttribute("data-unformatted", "stuff"); // Remove html <sup>/</sup> tags that invalidate svg file
  /*document.getElementById('saveSVG').style = 'display:block;';
  document.getElementById('saveCSV').style = 'display:none;';*/
}

function PlotlyR2NETable(Nmax) {
  target('r2neTable','');
  var reTable = makeR2NETable(Nmax);
  var pa = new PlotlyArgs('r2neTable', reTable, 1, 4, 'red', 4, 'beige')
  Plotly.newPlot(...pa.args);
  var bglayer = document.getElementsByClassName("bglayer");
  var bgrect = bglayer[0].firstElementChild;
  bgrect.outerHTML = "<rect width='100%' height='100%' style='fill:beige;' />";
  var ytitle = document.getElementsByClassName("ytitle");
  ytitle[0].setAttribute("data-unformatted", "stuff"); // Remove html <sup>/</sup> tags that invalidate svg file
  /*document.getElementById('saveSVG').style = 'display:block;';
  document.getElementById('saveCSV').style = 'display:none;';*/
}

function meanerr(N,n) {
    return "Mean: "+(R(ne,N,n)+R(e,N,n))/2+", Error: "+(R(ne,N,n)-R(e,N,n))/2
}

function R(f, N, n) {
    if(n==0) {
        return f(N)
    } else {
        return ((1<<n)*R(f,2*N,n-1)-R(f,N,n-1))/((1<<n)-1)
    }
}