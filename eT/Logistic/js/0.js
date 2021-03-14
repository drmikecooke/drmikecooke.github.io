function recurTable() {
    target('variables','');
    var k0=getNumber("k0"),dk=getNumber("dk"),n0=getNumber("n0"),n=[n0];
    for(i=1;i<51;i++) {n.push((k0-dk*n[n.length-1])*n[n.length-1]);}
    var tdata = n.map((v,i)=>[i,v]);
    var heading = `Logistic model, k₀ = ${getNumber("k0")}, k′ = ${getNumber("dk")}, n₀ = ${getNumber("n0")}`;
    return new Table(heading,["t","n"],tdata);
}

  function table() {
    window.fTable = recurTable();
    target('variables', window.fTable.HTML());
    document.getElementById('saveSVG').style = 'display:none;';
    document.getElementById('saveCSV').style = 'display:block;';
  }

function graph() {
    target('variables','');
    var pa = new PlotlyTraces('variables', recurTable(), ['blue'], 4, 'beige');
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