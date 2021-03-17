function logistic(t) {
  return 1/(1+Math.exp(-t))
}

function recurTable() {
  target('variables','');
  var dt=getNumber("dt"),n0=getNumber("n0"),n=[n0];
  var t0=Math.log(1/n0-1);
  for(i=1;i<20/dt;i++) {n.push((1+dt*(1-n[n.length-1]))*n[n.length-1]);}
  var tdata = n.map((v,i)=>[i*dt,v,logistic(i*dt-t0)]);
  var heading = `Continuum model, Δt = ${getNumber("dt")}, n₀ = ${getNumber("n0")}`;
  return new Table(heading,["t","n","n₁"],tdata);
}

function table() {
  window.fTable = recurTable();
  target('variables', window.fTable.HTML());
  document.getElementById('saveSVG').style = 'display:none;';
  document.getElementById('saveCSV').style = 'display:block;';
}

function graph() {
  target('variables','');
  var pa = new PlotlyTraces('variables', recurTable(), ['blue','red'], 4, 'beige');
  Plotly.newPlot(...pa.args);
  var bglayer = document.getElementsByClassName("bglayer");
  var bgrect = bglayer[0].firstElementChild;
  bgrect.outerHTML = "<rect width='100%' height='100%' style='fill:beige;' />";
  document.getElementById('saveSVG').style = 'display:block;';
  document.getElementById('saveCSV').style = 'display:none;';
}

function remove() {
  target('variables','');
  document.getElementById('saveSVG').style = 'display:none;';
  document.getElementById('saveCSV').style = 'display:none;';
}