function infData(inf,icost) {return [...Array(11).keys()].map((v)=>{return [v,(icost*(1+inf/100)**v).toFixed(2)]})}

function ninf(inf,icost) {
  var head = "Inflation = " + inf.toString() + "% | Initial cost = $" + parseFloat(icost).toFixed(2); // caption
  return new Table(head,["Year", "Cost/$"],infData(inf,icost))
}

function infTableClick() {
  window.infTable = ninf(getValue('inflation'), getValue('icost'));
  target('variables', window.infTable.HTML());
  document.getElementById('saveSVG').style = 'display:none;';
  document.getElementById('saveCSV').style = 'display:block;';
}

function infPlotlyClick() {
  target('variables','');
  window.infTable = ninf(getValue('inflation'), getValue('icost'));
    var pa = new PlotlyArgs('variables', window.infTable, 0, 1, 'red', 4, 'beige')
  Plotly.newPlot(...pa.args);
    var bglayer = document.getElementsByClassName("bglayer");
    var bgrect = bglayer[0].firstElementChild;
    bgrect.outerHTML = "<rect width='100%' height='100%' style='fill:beige;' />";
  document.getElementById('saveSVG').style = 'display:block;';
  document.getElementById('saveCSV').style = 'display:none;';
}

function infBlank() {
  target('variables','');
  document.getElementById('saveSVG').style = 'display:none;';
  document.getElementById('saveCSV').style = 'display:none;';
}