// Create exponential data list
function expList(initial,ratio,duration) {
    var expL = ["Time,Value"];
    var step = duration/100;
    var stepRatio = ratio**step;
    for (var m = 0; m<101; m++) {
        expL.push(m*step+','+initial*stepRatio**m);
    }
    return expL
}

// Create power law data list
function powList(constant, exponent, range) {
    var [rmin, rmax] = range.split(',');
    var powL = ["x,y"];
    var step = (Number(rmax)-Number(rmin))/50;
    for (var m = Number(rmin); m<=Number(rmax); m+=step) {
        powL.push(m+','+constant*m**exponent);
    }
    return powL
}

// Function to split "x,y" comma-separated list into individual lists
function dataSplit(d) {
    var xList=[],yList=[];
    for(var m=0;m<d.length;m++) {
        var [x, y] = d[m].split(',');
        xList.push(x);
        yList.push(y);
    }    
    return [xList, yList]
}

// Scale function definitions
var log = (x) => Math.log(x)/Math.LN10;
var lin = (x) => x;

// Function to give base-10 [mantissa, exponent] of a number
function me(value) {
    var e = Math.floor(log(value));
    return [value/10**e,e]
}

// Extract power law data
function pData() {
    var constant = Number(document.getElementById("constant").value);
    var exponent = Number(document.getElementById("exponent").value);
    var range = document.getElementById("range").value;
    document.getElementById("pvariables").innerHTML = "Constant = " + constant.toString() +
        " | Exponent = " + exponent.toString() + " | Range = " + range;
    return powList(constant,exponent,range)
}

// Extract data from HTML input form
function eData() {
    var iter = Number(document.getElementById("iteration").value);
    var init = Number(document.getElementById("init").value);
    var dur = Number(document.getElementById("dur").value);
    document.getElementById("evariables").innerHTML = "Iteration factor = " + iter.toString() +
        " | Initial value = " + init.toString() + " | Duration = " + dur.toString();
    return expList(init,iter,dur)    
}

function table(data) {
    var tHTML = '<table>';
    // Headings
    var [timeList, valueList] = dataSplit(data);
    tHTML += "<tr><th>"+timeList.shift()+"</th><th>"+valueList.shift()+"</th></tr>";
    var tDec = -Math.min(0, me(timeList[1]-timeList[0])[1]);
    var maxVal = Math.max(...valueList);
    var vDec = Math.max(0, -me(maxVal/100)[1]);
    for(var m=0; m<timeList.length; m++){
        tHTML += "<tr><td>"+Number(timeList[m]).toFixed(tDec)+"</td>"
        if (maxVal<10000) {
            tHTML += "<td>"+Number(valueList[m]).toFixed(vDec)+"</td></tr>";
        } else {
            tHTML += "<td>"+Number(valueList[m]).toExponential(2)+"</td></tr>";
        }
    }
    tHTML +="</table>"
    return tHTML
}

function displayTable(d, id) {
    document.getElementById(id).innerHTML =  table(d);
}

function displayGraph(xs,ys,d, id) {
    document.getElementById(id).innerHTML = xy(xs,ys,25,25,500,300,d);
}

function pTable() {
    document.getElementById("display").innerHTML =  table(pData());
}

// Function to give granularity of log scale dependent on range
function stepList(ratio) {
    var sList=[];
    if (ratio<20) {
        sList = [...Array(11).keys()];
        sList.shift()
    } else if (ratio<=10000) {
        sList = [1,2,5]
    } else if (ratio<=100000) {
        sList = [1,5]
    } else {
        sList = [1]
    }
    return sList;
}

// Calculate values for log scale
function logScale(scaleMin,scaleMax) {
    var scaleRatio = scaleMax/scaleMin
    var scaleList = [];
    var steps = stepList(scaleRatio);
    var p10 = 10**me(scaleMin)[1];
    for(var m=0; m<steps.length; m++) {steps[m] *= p10}
    var nextStep = steps.shift();
    while(nextStep<scaleMin) {
        steps.push(nextStep*10);
        nextStep = steps.shift();
    }
    while(nextStep<=scaleMax) {
        scaleList.push(nextStep.toExponential(0));
        steps.push(nextStep*10);
        nextStep = steps.shift();
    }    
    return scaleList;
}

// Calculate values for linear scale
function linScale(scaleMin,scaleMax) {
    var scaleList = [], range = scaleMax-scaleMin;
    var meRange = me(range);
    var p10 = 10**(meRange[1]);
    var r1sig = meRange[0];
    var step;
    if (r1sig<1.5) {
        step = p10/10;
    } else if(r1sig<7.5) {
        step = p10/2;
    } else {
        step = p10;
    }
    var sDec = -Math.min(0,me(step)[1]);
    for (var n=Math.ceil(scaleMin/step); n<=Math.floor(scaleMax/step); n++) {
        if (scaleMax>1000 || scaleMax<1) {scaleList.push((n*step).toExponential(1))} else {scaleList.push((n*step).toFixed(sDec))}
    }
    return scaleList; 
}

// Create svg line template with id
function defLine(x,y,id) {
    return '<path id="'+id+'" d="M 0 0 L '+x+' '+y+'" fill="none" stroke="black" stroke-width="2"/>\n'
}

// Use id template line
function useLine(x,y,id) {
    return '<use xlink:href="#'+id+'" x="'+x+'" y="'+y+'" />\n'
}

// Create svg instruction for text (t) at (x1,y1) with class attribute (c)
function svgText(x1,y1,c,t) {
    return '<text x="'+x1.toString()+'" y="'+y1.toString()+'" class="'+c+'">'+t+'</text>\n'
}

// Rotated text for y-axis label
function svgRot(x,y,text) {
    return '<text x="'+x.toString()+'" y="'+y.toString()+'" class="label" transform="rotate(-90,'+x.toString()+','+y.toString()+')">'+
        text+'</text>\n'
}

// svg header and class and gridline definitions
function svgDefs(x,y,w,h) {
    return '<svg width="'+(4*x+w)+'" height="'+(4*y+h)+'" xmlns="http://www.w3.org/2000/svg" '+
        'xmlns:xlink="http://www.w3.org/1999/xlink">\n'+
        '<style>\n'+
        'text{font-family:sans-serif;font-weight:bold;fill:black}\n'+
        '.label{font-size:large;text-anchor:middle;}\n'+
        '.xscale{font-size:medium;text-anchor:middle;}\n'+
        '.yscale{font-size:medium;text-anchor:end;}\n'+
        '</style>\n'+
        '<defs>\n'+
        defLine(0,h,"xline")+
        defLine(w,0,"yline")+
        '</defs>\n'
}

// Create string with complete x-y graph in svg format with xs,ys scale types (log,lin) with w,h plot area
// Margins parameterized by x,y - scale regions approx 2*x and 2*y
function xy(xs,ys,x,y,w,h,d) {
    const logSet = new Set(["1","2","5"]);
    // Define functions to convert values to plot area
    var gridX = (value) => 3*x+(xs(value)-xs(xMin))*w/(xs(xMax)-xs(xMin));
    var gridY = (value) => y+h-(ys(value)-ys(yMin))*h/(ys(yMax)-ys(yMin));
    var svg=svgDefs(x,y,w,h);
    var [xList, yList]=dataSplit(d);
    var xLabel = xList.shift();
    var yLabel = yList.shift();
    var xMin=Math.min(...xList), xMax=Math.max(...xList);
    var yMin=Math.min(...yList), yMax=Math.max(...yList);
    svg += svgText(3*x+w/2,3*y+h, "label", xLabel); // Create axis labels
    if (ys==log) {svg += svgRot(0.5*x,y+h/2,yLabel)} else {svg += svgRot(x,y+h/2,yLabel)}
    if(ys==lin) {yMin = 0;}
    var xScale=[];
    if(xs==log) {xScale=logScale(xMin,xMax)} else {xScale=linScale(xMin,xMax)};
    for (var m=0;m<xScale.length;m++){
        svg += useLine(gridX(xScale[m]),y,"xline")
        if(xs==lin || logSet.has(xScale[m][0])) {svg += svgText(gridX(xScale[m]), 2*y+h, "xscale", xScale[m])}
    }
    var yScale=[];
    if(ys==log) {yScale=logScale(yMin,yMax)} else {yScale=linScale(yMin,yMax)};
    for (var m=0;m<yScale.length;m++){
        svg += useLine(3*x, gridY(yScale[m]),"yline");
        svg += svgText(2.5*x, gridY(yScale[m])+5, "yscale", yScale[m]);
    }
    var points="";
    for(var m=0;m<xList.length;m++) {
        points += (gridX(xList[m])).toFixed()+","+(gridY(yList[m])).toFixed()+" ";
    }
    points = points.slice(0,points.length-1)
    svg += "<polyline points='"+points+"' style='fill:none;stroke:red;stroke-width:3' />\n<rect x='"+
        3*x+"' y='"+y+"' width='"+w+"' height='"+h+"' fill='none' stroke='blue' stroke-width='3' />\n</svg>";
    return svg
}
