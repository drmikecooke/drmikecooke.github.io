function fissionTable(branches, generations) {
  var fissionData = [...Array(1+Number(generations)).keys()].map(g=>[g,(branches)**g]);
    var nData = fissionData.map(v=>v[1]);
    var maxN = Math.max(...nData);
    var scaleNexp = Math.floor(Math.log(maxN)/Math.LN10);
    var fissionData = fissionData.map(v=>[v[0],(v[1]/10**scaleNexp).toFixed(3)])
  return new Table("Average neutron (N) branching = "+branches, ["Generation", "N/10<sup>"+scaleNexp+"</sup>"],fissionData)
}

function fissionTableClick() {
    window.fTable = fissionTable(getValue('fbranching'), getValue('fgenerations'));
    target('fvariables', window.fTable.HTML());
    document.getElementById('saveSVG').style = 'display:none;';
  document.getElementById('saveCSV').style = 'display:block;';
}

function fissionPlotlyClick() {
  target('fvariables','');
  var fTable = fissionTable(getValue('fbranching'), getValue('fgenerations'));
    var pa = new PlotlyArgs('fvariables', fTable, 0, 1, 'red', 4, 'beige')
  Plotly.newPlot(...pa.args);
    var bglayer = document.getElementsByClassName("bglayer");
    var bgrect = bglayer[0].firstElementChild;
    bgrect.outerHTML = "<rect width='100%' height='100%' style='fill:beige;' />";
    var ytitle = document.getElementsByClassName("ytitle");
    ytitle[0].setAttribute("data-unformatted", "stuff"); // Remove html <sup>/</sup> tags that invalidate svg file
  document.getElementById('saveSVG').style = 'display:block;';
  document.getElementById('saveCSV').style = 'display:none;';
}

function removeClick() {
    target('fvariables','');
    document.getElementById('saveSVG').style = 'display:none;';
  document.getElementById('saveCSV').style = 'display:none;';
}
