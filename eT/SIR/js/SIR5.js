  function R_0up() {var R_0 = document.getElementById("R_0").value;
    var γ = document.getElementById("γ").value;
    var β = γ/(R_0-1);
    document.getElementById("β").value = β;
    document.getElementById("α").value = Number(β) + Number(γ);
  }
  function βup() {
    var β = document.getElementById("β").value;
    var γ = document.getElementById("γ").value;
    document.getElementById("α").value = Number(β) + Number(γ);
    document.getElementById("R_0").value = 1 + Number(γ)/Number(β);
  }
  function αup() {
    var α = document.getElementById("α").value;
    var γ = document.getElementById("γ").value;
    var β = Number(α) - Number(γ);
    document.getElementById("β").value = β;
    document.getElementById("R_0").value = 1 + Number(γ)/Number(β);
  }

  R_0up();
  var fTable;
  function vadd(V1,V2) { return V1.map((v,i)=>v+V2[i])}

    function dataSIR() {
    var SIR_0 = [getNumber("S"),getNumber("I"),getNumber("R")];
      var α = getNumber("α"), β = getNumber("β");
      function ΔSIR(SIR) {
        var [S,I,R] = SIR;
        var T = S + I + R;
        return [-α*S*I/T,α*S*I/T-β*I,β*I]
      }
      var time = [...(new Array(101)).keys()];
      var table = [],SIR=SIR_0;
      for (var i=0;i<101;i++) {table.push([time[i],...SIR]);SIR=vadd(SIR,ΔSIR(SIR))}
      return new Table("SIR model",["t","S","I","R"],table)
    }

  function SIRTableClick() {
    window.fTable = dataSIR();
    target('fvariables', window.fTable.HTML());
    document.getElementById('saveSVG').style = 'display:none;';
    document.getElementById('saveCSV').style = 'display:block;';
  }

function SIRGraphClick() {
    target('fvariables','');
    var pa = new PlotlyTraces('fvariables', dataSIR(), ['blue','red','green'], 4, 'beige');
    Plotly.newPlot(...pa.args);
  var bglayer = document.getElementsByClassName("bglayer");
  var bgrect = bglayer[0].firstElementChild;
  bgrect.outerHTML = "<rect width='100%' height='100%' style='fill:beige;' />";
    document.getElementById('saveSVG').style = 'display:block;';
  document.getElementById('saveCSV').style = 'display:none;';
}

function removeClick() {
  target('fvariables','');
  document.getElementById('saveSVG').style = 'display:none;';
  document.getElementById('saveCSV').style = 'display:none;';
}

function normalizeClick() {
  var S=getNumber("S"),I=getNumber("I"),R=getNumber("R");
  var T = S+I+R;
  setNumber("S",S/T);
  setNumber("I",I/T);
  setNumber("R",R/T);
}
