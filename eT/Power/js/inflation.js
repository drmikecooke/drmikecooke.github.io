function myGraph() {
  var inf, icost, vartext, tabletext, n, years = [], cost, costs = [], svgtxt;

  // Get values of input fields

  inf = document.getElementById("inflation").value;

  icost = document.getElementById("icost").value;

  // Assemble string
  vartext = "Inflation = " + inf.toString() + "% | Initial cost = $" + parseFloat(icost).toFixed(2);

  document.getElementById("variables").innerHTML = vartext;

  tabletext = "<tr><th style='padding: 0.15em'>Year</th><th style='padding: 0.15em'>Cost</th></tr>";
  cost = icost;
  svgtxt = '';
  //  svgtxt='<rect width="600" height="350" style="fill:white;stroke-width:10;stroke:green" />';

  for (n = 0; n < 11; n++) {
    tabletext += "<tr><td style='padding: 0.15em'>" + n.toString() + "</td><td style='padding: 0.15em'>" + parseFloat(cost).toFixed(2) + "</td></tr>";
    years.push(n);
    costs.push(cost);
    cost = cost * (1 + inf / 100);
    svgtxt += svgLine(n * 50 + 75, 25, n * 50 + 75, 275, "black", 1);
    svgtxt += svgText(n * 50 + 75, 300, "black", "middle", "0.8em", n.toString());
  }

  svgtxt += svgText(325, 325, "black", "middle", "1em", "Year");

  document.getElementById("costtable").innerHTML = tabletext;

  var maxcost = Math.max(costs[0], costs[10]);
  var maxlog = Math.log(maxcost) / Math.log(10);
  var pow10 = Math.pow(10, Math.floor(maxlog));
  var max1sig = Math.ceil(maxcost / pow10);
  var step, nsteps;
  if (max1sig > 5) {
    step = pow10;
    nsteps = max1sig;
  }
  else {
    step = pow10 / 2;
    nsteps = 2 * max1sig;
  }
  var gridstep = 250 / nsteps;
  var yvalue = max1sig * pow10;

  for (n = 0; n < nsteps + 1; n++) {
    svgtxt += svgLine(75, n * gridstep + 25, 575, n * gridstep + 25, "black", 1);
    svgtxt += svgText(65, n * gridstep + 30, "black", "end", "0.8em", yvalue.toString());
    yvalue -= step;
  }
  var xgrid = 75;
  var ygrid = costs[0] * gridstep / step;
  var nx, ny
  for (n = 0; n < 10; n++) {
    nx = xgrid + 50;
    ny = costs[n + 1] * gridstep / step;
    svgtxt += svgLine(xgrid, 275 - ygrid, nx, 275 - ny, "red", 4);
    xgrid = nx;
    ygrid = ny;
  }
  document.getElementById("svg").innerHTML = svgtxt;
}

function svgLine(x1, y1, x2, y2, c, w) {
  return '<line x1="' + x1.toString() + '" y1="' + y1.toString() + '" x2="' + x2.toString() + '" y2="' + y2.toString() + '" style="stroke:' + c + ';stroke-width:' + w.toString() + '" />\n'
}

function svgText(x1, y1, c, a, s, t) {
  return '<text x="' + x1.toString() + '" y="' + y1.toString() + '" fill="' + c + '" text-anchor="' + a + '" alignment-baseline="central" font-size=' + s + '>' + t + '</text>\n'
}