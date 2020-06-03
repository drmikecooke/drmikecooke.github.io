function tree() {
  var branches, generations, vartext, svgtxt;

  // Get values of input fields
  
  branches = Number(document.getElementById("branches").value);
  
  generations = Number(document.getElementById("generations").value);
  
  // Assemble string
  
  vartext = "Branches = " + branches.toString() + " | Generations = " + generations.toString();
  
  document.getElementById("variables").innerHTML = vartext;
  
  // Set up svg

	svgtxt = '';
  
  var current=1, next;
  var cstep=300;
  var gstep=600/generations;
  
  var n, m, l;
  for(n = 0; n < generations; n++) {
  
    svgtxt += svgGLine(n*gstep, n, current);
    
    next = current*branches;
    
    nstep = 300/next;
    for (m =0; m<current;m++) {
      svgtxt += svgBLines(n*gstep,(m+1/2)*cstep,gstep,(m*branches+1/2)*nstep,nstep,branches);
    }
    
    current=next;
    cstep=300/current;
    
    }
    
    svgtxt += svgGLine(n*gstep, n, current);
    
    for (m =0; m<current;m++) {
      svgtxt += svgBlob(n*gstep, (m+1/2)*cstep);
    }
  
  svgtxt += svgText(-10,325,"black","end",15,"Generations: ");
	svgtxt += svgText(-10,350,"black","end",15,"Nodes: ");
	
	var box = document.getElementById("svg");
	box.innerHTML = svgtxt;
	var Bbox = box.getBBox();
	
	vartext = Bbox.x.toString() + " " + Bbox.y.toString() + " " + Bbox.width.toString() + " " + Bbox.height.toString();
	box.setAttribute("viewBox", vartext);
	
  }
  
function svgLine(x1,y1,x2,y2,c,w) {
	return '<line x1="'+x1.toString()+'" y1="'+y1.toString()+'" x2="'+x2.toString()+'" y2="'+y2.toString()+'" style="stroke:'+c+';stroke-width:'+w.toString()+'" />\n'
}

function svgText(x1,y1,c,a,s,t) {
	return '<text x="' + x1.toString() + '" y="' + y1.toString() + '" fill="' + c + '" text-anchor="' + a + '" alignment-baseline="central" font-family="Arial" font-size=' + s + '>' + t + '</text>\n'
}

// Draw circle/node/blob
function svgBlob(xb,yb) {
	return '<circle cx="' + xb.toString() + '" cy="' + yb.toString() + '" r="5" fill="red" />\n'
}

// Generation line
function svgGLine(xv,n,c) {
	return svgLine(xv,0,xv,300,"black",1) + svgText(xv,325,"black","middle",15,n.toString()) + svgText(xv,350,"black","middle",15,c.toString())
}

// Branching lines
function svgBLines(xb,yb,dx,ny,dy,br) {
	var svglines = '';
	for (l=0; l<br; l++) {
			svglines += svgLine(xb,yb,xb+dx,ny+l*dy,"black",2);
			svglines += svgBlob(xb,yb);
      }
	return svglines
}