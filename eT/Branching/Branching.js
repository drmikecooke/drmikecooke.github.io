// Needs Table object defined

// Click functions

function treeTableClick() {
  window.fTable = treeTable(getNumber('branches'),getNumber('generations'));
  target('variables', window.fTable.HTML());
  document.getElementById('saveTreeSVG').style = 'display:none;';
  document.getElementById('saveTreeCSV').style = 'display:block;';
}

function treeSVGClick() {
  window.fTable = svgTree(treeTable(getNumber('branches'),getNumber('generations')));
  target('variables', window.fTable);
  document.getElementById('saveTreeSVG').style = 'display:block;';
  document.getElementById('saveTreeCSV').style = 'display:none;';
}

function removeTreeClick() {
  target('variables','');
  document.getElementById('saveTreeSVG').style = 'display:none;';
  document.getElementById('saveTreeCSV').style = 'display:none;';
}

function treeTable(branches, generations) {
  // Assemble heading
  var heading = "Branches = " + branches + " | Generations = " + generations;
   var range = [...Array(generations+1).keys()];
    var data = range.map(g=>[g,(branches)**g]);
   return new Table(heading, ["Generation","Nodes"], data);
}

function svgTree(treeTable) {
    var branches=treeTable.data[1][1], next,nstep;
var current=treeTable.data[0][1];
var generations = treeTable.data.length - 1;
  var cstep=300;
  var gstep=600/generations;

var svgtxt = '<svg id="tree" width="780" height="400" viewbox="0 0 780 400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n';
// styles
svgtxt += '<style>\n';
svgtxt += 'text {font-family: Arial, Helvetica, sans-serif; font-size: 20; fill: black;}\n';
svgtxt += '#vline {stroke:black; stroke-width:1}\n';
svgtxt += '.bline {stroke:black; stroke-width:2}\n';
svgtxt += '.gntext {text-anchor: middle;}\n';
svgtxt += '.heads {text-anchor: end;}\n'
svgtxt += '</style>\n';

// blob and vertical line definitions
svgtxt += '<defs>\n';
svgtxt += '<circle id="blob" cx="0" cy="0" r="5" fill="red" />\n';
svgtxt += '<line id="vline" x1="0" y1="0" x2="0" y2="300" />\n';
svgtxt += '</defs>\n';

// Background and heading
svgtxt += '<rect width="780" height="400" fill="beige" />\n';
svgtxt += svgTextc("50%","25",treeTable.heading,'gntext');

svgtxt += '<g transform="translate(155,35)">\n';
  for(var n = 0; n < generations; n++) {
    svgtxt += svgGLine(n*gstep, n, current);
    next = treeTable.data[n+1][1];
    nstep = 300/next;

    for (var m =0; m<current;m++) {
      svgtxt += svgBLines(n*gstep,(m+1/2)*cstep,gstep,(m*branches+1/2)*nstep,nstep,branches);
    }

    current=next;
    cstep=nstep;
    }

    svgtxt += svgGLine(n*gstep, n, current); // final generation line
    for (m =0; m<current;m++) { svgtxt += svgBlob(n*gstep, (m+1/2)*cstep); } // final blobs

    //labels for numbers
  svgtxt += svgTextc(-20,325,treeTable.heads[0]+": ","heads");
 svgtxt += svgTextc(-20,350,treeTable.heads[1]+": ","heads");

return svgtxt+'</g>\n</svg>'
}

var svgLine = (x1,y1,x2,y2) => '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" class="bline" />\n';

function svgTextc(x,y,text,c) {
	return '<text x="' + x + '" y="' + y + '" class="'+c+'">' + text + '</text>\n'
}

// Draw circle/node/blob
var svgBlob = (xb,yb) => '<use x="'+xb+'" y="'+yb+'" xlink:href="#blob" />\n';

// Generation line
var svgGLine = (xv,n,c) => '<use x="'+xv+'" y="0"  xlink:href="#vline" />\n' +
    svgTextc(xv,325,n,'gntext') + svgTextc(xv,350,c,'gntext');

// Branching lines
function svgBLines(xb,yb,dx,ny,dy,br) {
	var svglines = '';
	for (var l=0; l<br; l++) { svglines += svgLine(xb,yb,xb+dx,ny+l*dy) }
	return svglines + svgBlob(xb,yb)
}
