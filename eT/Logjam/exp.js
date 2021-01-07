function eTable() {
  var edata=[];
  var ifactor=getNumber('iteration');
  var init=getNumber('init');
  var dur=getNumber('dur');
  var eTitle= "Iteration factor = "+ifactor+" | Initial value = "+init+" | Duration = "+dur;
    var step = dur/100;
    var stepRatio = ifactor**step;
    for (var m = 0; m<101; m++) {
        edata.push([(m*step).toExponential(2),(init*stepRatio**m).toExponential(2)]);
    }
   return new Table(eTitle,["Time","Value"],edata);
}

function eLin() {
    var tTable = eTable();
    target('variables','');
    var pa = new PlotlyArgs('variables', tTable, 0, 1, 'red', 4, 'beige')
    Plotly.newPlot(...pa.args);
}

function eLog() {
    var tTable = eTable();
    target('variables','');
    var data = [plotlyTrace(tTable, 0, 1, 'red', 4)];
    var layout = {
        title: tTable.heading,
        showlegend: false,
        xaxis: {title: tTable.heads[0]},
        yaxis: {title: tTable.heads[1], rangemode: 'tozero', type: 'log'},
        plot_bgcolor: 'beige',
    }
    var config = {scrollZoom: false};
    Plotly.newPlot('variables',data,layout,config);
}

function pTable() {
  var pdata=[];
  var constant = getNumber("constant");
  var exponent = getNumber("exponent");
  var range = getValue("range");
  var pTitle = "Constant = "+constant.toString()+" | Exponent = "+exponent.toString()+" | Range = "+range;
  var [rmin, rmax] = range.split(',');
  var step = (Number(rmax)-Number(rmin))/50;
  for (var m = Number(rmin); m<=Number(rmax); m+=step) {
        pdata.push([m.toExponential(2),(constant*m**exponent).toExponential(2)]);
    }
   return new Table(pTitle,["x","y"],pdata);
}

function pLinLin() {
    var tTable = pTable();
    target('pdisplay','');
    var pa = new PlotlyArgs('pdisplay', tTable, 0, 1, 'red', 4, 'beige')
    Plotly.newPlot(...pa.args);
}

function pLinLog() {
    var tTable = pTable();
    target('pdisplay','');
    var data = [plotlyTrace(tTable, 0, 1, 'red', 4)];
    var layout = {
        title: tTable.heading,
        showlegend: false,
        xaxis: {title: tTable.heads[0]},
        yaxis: {title: tTable.heads[1], type: 'log'},
        plot_bgcolor: 'beige',
    }
    var config = {scrollZoom: false};
    Plotly.newPlot('pdisplay',data,layout,config);
}

function pLogLin() {
    var tTable = pTable();
    target('pdisplay','');
    var data = [plotlyTrace(tTable, 0, 1, 'red', 4)];
    var layout = {
        title: tTable.heading,
        showlegend: false,
        xaxis: {title: tTable.heads[0], type: 'log'},
        yaxis: {title: tTable.heads[1]},
        plot_bgcolor: 'beige',
    }
    var config = {scrollZoom: false};
    Plotly.newPlot('pdisplay',data,layout,config);
}

function pLogLog() {
    var tTable = pTable();
    target('pdisplay','');
    var data = [plotlyTrace(tTable, 0, 1, 'red', 4)];
    var layout = {
        title: tTable.heading,
        showlegend: false,
        xaxis: {title: tTable.heads[0], type: 'log'},
        yaxis: {title: tTable.heads[1], type: 'log'},
        plot_bgcolor: 'beige',
    }
    var config = {scrollZoom: false};
    Plotly.newPlot('pdisplay',data,layout,config);
}
