function infData(inf,icost) {return [...Array(11).keys()].map((v)=>{return [v,(icost*(1+inf/100)**v).toFixed(2)]})}

function ninf(inf,icost) {
  var head = "Inflation = " + inf.toString() + "% | Initial cost = $" + parseFloat(icost).toFixed(2); // caption
  return new Table(head,["Year", "Cost/$"],infData(inf,icost))
}

function pinf(inf,icost) {
  var tinf = ninf(inf,icost);
  Plotly.newPlot('variables', tinf.pData, tinf.pLayout, {scrollZoom: true});
}