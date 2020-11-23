function fissionGraph() {
  var branching, neutrons, generations, vartext, tabletext, n, gentab=[], neutrotab=[], svgtxt;

  // Get values of input fields

  branching = Number(document.getElementById("fbranching").value);
  generations = Number(document.getElementById("fgenerations").value)
  neutrons = 1;

  // Assemble string

  vartext = "Average neutron (N) branching = " + branching.toFixed(1);

  document.getElementById("fvariables").innerHTML = vartext;

  //Begin svgtxt

  svgtxt = '';

  // Construct table, x-axis values and vertical gridlines
  var genstep, gridstep, stepfactor;

  if (generations>199) {
    genstep = Math.floor(generations/100);
    gridstep = 10*genstep;
    stepfactor=1;
    for (n=0;n<genstep;n++) {
      stepfactor=stepfactor*branching;
    }
  }
  else {
    genstep = 1;
    gridstep = Math.max(1, generations/10);
    stepfactor = branching;
  }

  // make tables
  for(n=0; n<generations+1; n=n+genstep) {
    gentab.push(n);
    neutrotab.push(neutrons);
    neutrons=neutrons*stepfactor;
  }

  var maxneutrons = Math.max(neutrotab[0],neutrotab[neutrotab.length-1]);
  var maxlog = Math.log(maxneutrons)/Math.log(10);
  var pow10 = Math.pow(10,Math.floor(maxlog));

  tabletext = '<tr><th valign="bottom" style="padding: 10px;">Generation</th><th valign="bottom" style="padding: 10px;">N/10<sup>'+Math.floor(maxlog).toString()+'</sup></th></tr>';

  var tablestep;

  tablestep = Math.max(1,gentab.length/10);


  for(n=0;n<gentab.length;n=n+tablestep) {
    tabletext+='<tr><td align="right" style="padding: 10px;">'+gentab[Math.floor(n)].toFixed(0)+'</td><td align="right" style="padding: 10px;">'+(neutrotab[Math.floor(n)]/pow10).toFixed(2)+"</td></tr>";
  }

  // Construct x-axis and grid lines

  for (n=0;n<generations+1;n=n+gridstep) {
    svgtxt += svgLine(n*500/generations+50, 50, n*500/generations+50, 300, "black", 1);
    svgtxt += svgText(n*500/generations+50,325,"black","middle",15,n.toFixed());
  }

  svgtxt += svgText(300,350,"black","middle",15,"Generation");

  document.getElementById("neutable").innerHTML = tabletext;

  // Construct y-axis

  var max1sig = Math.ceil(maxneutrons/pow10);
  var step, nsteps;
  if (max1sig>5) {
    step = pow10;
    nsteps = max1sig;
  }
  else {
    step = pow10/2;
    nsteps = 2*max1sig;
  }
  var gridstep = 250/nsteps;
  var yvalue = max1sig*pow10;

  var yhead = Math.floor(maxlog).toString();

  svgtxt += svgText(40,20,"black","end",15,"Neutrons/10");
  svgtxt += svgText(40,14,"black","start",12,yhead);

  for(n=0;n<nsteps+1;n++) {

    svgtxt += svgLine(50, n*gridstep+50, 550, n*gridstep+50, "black", 1);
    svgtxt += svgText(40,n*gridstep+54,"black","end",15,(yvalue/pow10).toFixed(1));

    yvalue-=step;

  }

  // Plot values

  var xgrid = gentab[0]*500/generations+50;
  var ygrid = neutrotab[0]*gridstep/step;
  var nx, ny

  for (n=0;n<gentab.length-1;n++) {
    nx = gentab[n+1]*500/generations+50;
    ny = neutrotab[n+1]*gridstep/step;

    svgtxt += svgLine(xgrid, 300-ygrid, nx, 300-ny, "red", 4);

    xgrid=nx;
    ygrid=ny;
  }

  // Output svg code
  var box = document.getElementById("svgf");
  box.innerHTML = svgtxt;
  var Bbox = box.getBBox();

  vartext = Bbox.x.toString() + " " + Bbox.y.toString() + " " + Bbox.width.toString() + " " + Bbox.height.toString();
  box.setAttribute("viewBox", vartext);
  function svgLine(x1,y1,x2,y2,c,w) {
    return '<line x1="'+x1.toString()+'" y1="'+y1.toString()+'" x2="'+x2.toString()+'" y2="'+y2.toString()+'" style="stroke:'+c+';stroke-width:'+w.toString()+'" />\n'
  }

  function svgText(x1,y1,c,a,s,t) {
    return '<text x="' + x1.toString() + '" y="' + y1.toString() + '" fill="' + c + '" text-anchor="' + a + '" alignment-baseline="central" font-family="Arial" font-size=' + s + '>' + t + '</text>\n'
  }
}