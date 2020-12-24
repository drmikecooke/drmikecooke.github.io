function getParams() {
    var r = getNumber("r"),rho = getNumber("rho"),theta=getNumber("theta"),I0=getNumber("I0");
    var g = [r+2*rho*Math.cos(theta),-2*r*rho*Math.cos(theta)-rho*rho,r*rho*rho];
    return g
}

function recStr() {
    var g = getParams();
    var str = "<em>I</em><sub><em>w</em></sub> = "+g[0]+" <em>I</em><sub><em>w</em>–1</sub> – "+(-g[1])+" <em>I</em><sub><em>w</em>–2</sub> + "+g[2]+" <em>I</em><sub><em>w</em>–3</sub>";
    target("variables", str);
    document.getElementById('saveSVG').style = 'display:none;';
    document.getElementById('saveCSV').style = 'display:none;';
}

function recurTable() {
    target('variables','');
    var garray = getParams(),i,infection=[getNumber("I0")],next,j;
    var weekly = [0, 1, 0, 0, 2, 6, 1, 4, 58, 409, 2585, 7267, 19356, 31081, 32065, 32331, 32418, 30764, 22192, 19367, 15873, 10600, 8187, 7219, 6499, 5050, 4114, 4113, 4421, 5040, 5430, 6460, 7621, 7918, 9432, 17877, 22215, 31112, 47693, 82996, 110539, 123137, 153108, 152557, 166323, 168346, 129183, 102369, 108558, 151841, 202341, 2235, 0];
    for(i=1;i<51;i++) {
        next = 0;
        for(j=0;j<garray.length;j++) {next+=((infection.length-1-j)>=0?garray[j]*infection[infection.length-1-j]:0)}
        infection.push(next);
    }
    var tdata = infection.map((v,i)=>[i,v,weekly[i]]);
    var heading = "Infection model, r = "+getNumber("r")+", ρ = "+getNumber("rho")+", θ = "+getNumber("theta")+", I0 = "+getNumber("I0");
    return new Table(heading,["Day","Model","UK 2020"],tdata);
}

  function table() {
    window.fTable = recurTable();
    target('variables', window.fTable.HTML());
    document.getElementById('saveSVG').style = 'display:none;';
    document.getElementById('saveCSV').style = 'display:block;';
  }

function graph() {
    target('variables','');
    var pa = new PlotlyTraces('variables', recurTable(), ['blue','orange'], 4, 'beige');
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
