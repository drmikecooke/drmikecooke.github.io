function pArray(base) {
    // Make array of powers up to 10
    var A = [1], p = 1, n = 0;
    while (p<10) {p = p*base; n += 1; A.push(p);}
    return A
}

function findn(x,A) {
    // find index of A next after x
    var n = 0, gtex = (y) => y>=x;
    return A.findIndex(gtex)
}

function interpolate(x,A) {
    // Linear interpolation for "n" between A[n-1] < x <= A[n] in increasing array
    var n = findn(x,A)
    if(n==0) {return 0}
    return ((x-A[n-1])*n-(x-A[n])*(n-1))/(A[n]-A[n-1])
}

function ln(b,x) {
    // linear interpolation to give estimate for log base-b with 1 < x < 10
    var A = pArray(b);
    return interpolate(x,A)
}

function ln10(b, x) {
    var l10 = ln(b,10), n = 0;
    while(x>10) {
        x /= 10;
        n += 1;
    }
    while(x<1) {
        x *= 10;
        n -= 1;
    }
    return n+ln(b,x)/l10
}

function htmlTable(data) {
    var tHTML = '<table>\n';
    // Headings
    var headings = data.shift();
    tHTML += '<tr>';
    var element, row;
    for(element of headings) {tHTML += '<th>'+element+'</th>'}
    tHTML += '</tr>\n';
    for (row of data){
        tHTML += '<tr>';
        for(element of row) {tHTML += '<td style="text-align:left;padding:3px;">'+element+'</td>'}
        tHTML += '</tr>\n';
    }
    tHTML +="</table>\n"
    return tHTML
}

function nAtable(base) {
    var A = pArray(base);
    var data = [];
    data.push(['n','A'])
    for(var n=0; n<A.length;n++) {data.push([n,A[n]])}
    return data
}

function xIntLog10(base) {
    var A = pArray(base);
    var logb10 = interpolate(10,A)
    var table = [];
    table.push(["<em>x</em>","Estimate","log<sub>10</sub><em>x</em>"]);
    for (var m=1; m<11; m++) {
        table.push([m,interpolate(m,A)/logb10,Math.log(m)/Math.LN10]);
    }
    return table
}

function getBase() {
    return Number(document.getElementById("base").value)
}

function setLog10Table() {
    document.getElementById("log10table").innerHTML = htmlTable(xIntLog10(getBase()));
}
