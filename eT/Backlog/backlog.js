function powerArray(base) {
    // Make array of powers up to 10
    var A = [1], p = 1, n = 0;
    while (p<10) {p = p*base; n++; A.push(p);}
    return A
}

function setBnTable() {
    var dataArray = powerArray(getNumber("base")).map((v,i)=>[i,v]);
    var powerTable = new Table("Powers of base b", ["n","b<sup>n</sup>"], dataArray);
    target("bntable", powerTable.HTML());
}

function setLogbTable() {
    var dataArray = powerArray(getNumber("base2")).map((v,i)=>[v,i]);
    var logTable = new Table("Reversed table for initial log<sub><em>b</em></sub><em>x</em>", ["x","log<sub><em>b</em></sub><em>x</em>"], dataArray);
    target("logbtable", logTable.HTML());
}

function setCompTable() {
 var pArray = powerArray(getNumber("base3"));
    var xArray = [...Array(11).keys()].slice(2);
    function logb(x) {
    var nint = pArray.findIndex((v)=>v>=x);
    return nint + (x-pArray[nint])/(pArray[nint]-pArray[nint-1])
}
var logbArray = [[1,0,0,0]];
var logb10 = logb(10);
for (var x of xArray) {logbArray.push([x,logb(x),logb(x)/logb10,Math.log(x)/Math.LN10])}
var logTable = new Table("log<sub>b/10</sub>x estimates and calculated value",["x","log<sub>b</sub>x","log<sub>10</sub>x (est.)","log<sub>10</sub>x (calc.)"],logbArray)
target("comptable", logTable.HTML());
}