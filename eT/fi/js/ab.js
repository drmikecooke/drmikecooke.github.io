function Complex(array2) {
    this.re = array2[0];
    this.im = array2[1];
}

function cstr(z) { return "("+z.re+(z.im<0?"":"+")+z.im+"i)" }
function cmul(z1,z2) { return new Complex([z1.re*z2.re-z1.im*z2.im, z1.im*z2.re+z1.re*z2.im]) }
function cadd(z1,z2) { return new Complex([z1.re+z2.re, z1.im+z2.im]) }
function csub(z1,z2) { return new Complex([z1.re-z2.re, z1.im-z2.im]) }
function conj(z1) { return new Complex([z1.re, -z1.im]) }
function cabs(z1) { return Math.sqrt(z1.re*z1.re+z1.im*z1.im)}
function carg(z1) { return Math.atan2(z1.im,z1.re) }
function cinv(z) { var zabs2 = cmul(z,conj(z)).re; return new Complex([z.re/zabs2,-(z.im)/zabs2]) }
function cdiv(z1,z2) {return cmul(z1,cinv(z2))}
function creal(x) {return new Complex([x,0])}

function Polynomial(coeff) {
    var leading = coeff.pop();
    while(leading!=undefined && cabs(leading)==0 ) {
        leading = coeff.pop();
    }
    if(leading!=undefined) {coeff.push(leading);}
    this.coeff = coeff;
}

function pstr(p) {
    if(p.coeff.length==0) {return cstr(creal(0))}
    var s=cstr(p.coeff[0]);
    for(var i=1;i<p.coeff.length;i++) {s += " + "+cstr(p.coeff[i])+"x"+(i>1?("^"+i):"")}
    return s
}

function pHTML(p) {
    if(p.coeff.length==0) {return "0"}
    var s=p.coeff[0].re;
    for(var i=1;i<p.coeff.length;i++) {s += " + "+p.coeff[i].re+"x"+(i>1?("<sup>"+i+"</sup>"):"")}
    return s
}

function pdeg(p) {
    if(p.coeff.length==0) {return -Infinity}
    return p.coeff.length-1
}

function peval(p,z) {
    var coeff = p.coeff.slice(0);
    var result = coeff.pop();
    while (coeff.length) {
        result = cadd(cmul(result,z),coeff.pop());
    }
    return result
}

function pdiff(p) {
    var coeff = p.coeff.slice(1);
    for(var i=0;i<coeff.length;i++) {coeff[i] = cmul(creal(i+1),coeff[i])}
    return new Polynomial(coeff)
}

function padd(p1,p2) {
    var result, p1c=p1.coeff.slice(0), p2c=p2.coeff.slice(0)
    if(p2c.lenght>p1c.length) {
        p1c = p1c.concat(Array(p2c.length-p1c.length).fill(creal(0)))
    } else {
        p2c = p2c.concat(Array(p1c.length-p2c.length).fill(creal(0)))
    }
    return new Polynomial(p1c.map((v,i)=>cadd(v,p2c[i])))
}

function pmul(p1,p2) {
    var result=[], p1c=p1.coeff.slice(0), p2c=p2.coeff.slice(0);
    for(var m=0;m<p1c.length;m++) {
        for(var n=0;n<p2c.length;n++) {
            if((m+n)==result.length) {result = result.concat([creal(0)])}
            result[m+n] = cadd(result[m+n],cmul(p1c[m],p2c[n]));
        }
    }
    return new Polynomial(result)
}

function pdiv(p1,p2) {
    var p1c=p1.coeff.slice(0), p2c=p2.coeff.slice(0), qc=Array(p1c.length-p2c.length).fill(creal(0)),cf, nf;
    if(p1c.length<p2c.length) {return [new Polynomial([]), new Polynomial(p2c)]}
    while(p1c.length>=p2c.length){
        cf = cdiv(p1c[p1c.length-1],p2c[p2c.length-1]);
        nf = cmul(creal(-1),cf)
        qc[p1c.length-p2c.length] = cf;
        p1c = p1c.slice(0,-1);
        for(var i=0;i<(p2c.length-1);i++) {
            p1c[p1c.length-1-i] = cadd(p1c[p1c.length-1-i],cmul(nf,p2c[p2c.length-2-i]));
        }
    }
    return [new Polynomial(qc),new Polynomial(p1c)]
}

function pGCD(p1,p2) {
    var p1c=p1.coeff.slice(0), p2c=p2.coeff.slice(0);
    if(p1c.length<p2c.length) {return pGCD(p2,p1)}
    var rem = pdiv(p1,p2)[1];
    if(pdeg(rem)==-Infinity) {return p2} else {return pGCD(p2,rem)}
}

function abStep(poly,guess) {
    if(pdeg(poly)!=guess.length) {console.log("Guess wrong length"); return 0}
    var dp=pdiff(poly),dpz,pz,z,s;
    var update=[],i,j,ps,zs,os;
    for(i=0;i<guess.length;i++) {
        z = guess[i];
        pz = peval(poly,z);
        if(cabs(pz)<1e-10) {
            update.push(z);
        } else {
            ps = creal(0);
            for(j=0;j<guess.length;j++) {
                if(i!=j) {
                    s = guess[j];
                    zs = cadd(z,cmul(creal(-1),s));
                    if(cabs(zs)<1e-6) {console.log("Pole sum error: zeros too close"); return 0}
                    ps = cadd(ps,cinv(zs));
                }
            }
        dpz = peval(dp,z);
        os = cadd(cdiv(dpz,pz),cmul(creal(-1),ps));            
        update.push(cadd(z,cmul(creal(-1),cinv(os))));
        }
    }
    return update
}

function abRecur(poly,guess) {
    var update,i,change=0;
    update = abStep(poly,guess);
    if(update==0) {console.log("Error"); return}
    for(i=0;i<guess.length;i++) {
        change += cabs(cadd(update[i],cmul(creal(-1),guess[i])))
    }
    if (change<1e-10) {return update}
    return abRecur(poly,update)
}

function zBound(poly) {
    return Math.max(...(poly.coeff.slice(0,-1).map((v)=>cabs(v))))/cabs(poly.coeff.slice(-1)[0])+1
}

function zGuess(poly) {
    var deg=pdeg(poly), guess=[], i;
    var rb=zBound(poly),r,angle;
    for(i=0;i<deg;i++) {
        r = rb*Math.sqrt(Math.random());// even area coverage
        angle=2*Math.PI*Math.random();
        guess[i] = new Complex([r*Math.sin(angle),r*Math.cos(angle)]);
    }
    return guess
}

function abwGuess(poly) {
    return abRecur(poly,zGuess(poly))
}

function getGarray() {
    var input = document.getElementById("garray").value;
    return input.split(",").map((v)=>Number(v))
}

function charStr() {
    var garray = getGarray();
    var deg = garray.length;
    var astr = "<em>a</em>";
    var str = astr+"<sup>"+deg+"</sup> = ", coeff;
    while(deg>0) {
        deg--;
        coeff = garray.shift();
        str += coeff + (deg>0?astr:"") + (deg>1?"<sup>"+deg+"</sup>":"") + (deg>0?" + ":"");
    }
    target("variables", str);
}

function sketch() {
    target('variables','');
    var garray = getGarray(),i,rhs="";
    garray.reverse();
    for(i=0;i<garray.length;i++) {rhs+=(i>0?"+":"")+garray[i]+(i>0?"x":"")+(i>1?"<sup>"+i+"</sup>":"")}
    compoly = new Polynomial(garray.map((v)=>creal(v)));
    leading = new Polynomial(garray.map((v)=>creal(0)).concat([creal(1)]));
    garray = garray.map((v)=>creal(-v));
    var char = new Polynomial(garray.concat(creal(1)));
    var tdata = linspace(-zBound(char),zBound(char),51).map((v)=>[v,peval(leading,creal(v)).re,peval(compoly,creal(v)).re]);
    var charTable = new Table("Characteristic plot", ["x","x<sup>"+garray.length+"</sup>",rhs],tdata);
    var pa = new PlotlyTraces('variables', charTable, ['blue','red'], 4, 'beige');
    Plotly.newPlot(...pa.args);
}

function getZeros() {
    var garray = getGarray();
    garray.reverse();
    garray = garray.map((v)=>creal(-v));
    var char = new Polynomial(garray.concat(creal(1)));
    return [char, abwGuess(char)];
}

function grind() {
    target('variables','');
    charStr();
    var [char, zeros] = getZeros(), i;
    var tstr = "<br/><table>";
    tstr += "<tr><th>Zero</th><th>"+pHTML(char)+"</th></tr>";
    for(i=0;i<zeros.length;i++){tstr+="<tr><td>"+cstr(zeros[i])+"</td><td>"+cstr(peval(char,zeros[i]))+"</td></tr>"}
    tstr+= "</table>";
    targetadd('variables',tstr);
}

function recurTable() {
    target('variables','');
    var garray = getGarray(),i,infection=[1],next,j;
    for(i=1;i<51;i++) {
        next = 0;
        for(j=0;j<garray.length;j++) {next+=((infection.length-1-j)>=0?garray[j]*infection[infection.length-1-j]:0)}
        infection.push(next);
    }
    var tdata = infection.map((v,i)=>[i,v]);
    return new Table("Forward infections (recurrence)",["Day","New infections"],tdata);
}

function flin() {
    var tTable = recurTable();
    var pa = new PlotlyArgs('variables', tTable, 0, 1, 'blue', 4, 'beige')
    Plotly.newPlot(...pa.args);
}

function flog() {
    var tTable = recurTable();
    var data = [plotlyTrace(tTable, 0, 1, 'blue', 4)];
    var layout = {
        title: tTable.heading,
        showlegend: false,
        xaxis: {title: tTable.heads[0]},
        yaxis: {title: tTable.heads[1], rangemode: 'tozero', type: 'log'},
        plot_bgcolor: 'beige',
    }
    var config = {scrollZoom: false};
    Plotly.newPlot('variables',data,layout,config);
}

function ffac() {
    target('variables','');
    var garray = getGarray(),i,infection=[1],next,j;
    for(i=1;i<51;i++) {
        next = 0;
        for(j=0;j<garray.length;j++) {next+=((infection.length-1-j)>=0?garray[j]*infection[infection.length-1-j]:0)}
        infection.push(next);
    }
    var tdata = infection.map((v,i)=>[i,(i>0?v/infection[i-1]:0)]);
    tdata.shift();
    var tTable = new Table("Forward infections",["Day","Factor"],tdata);
    var pa = new PlotlyArgs('variables', tTable, 0, 1, 'blue', 4, 'beige')
    Plotly.newPlot(...pa.args);
}

function resCoeffs(zeros) {
    var coeffs=[];
    for (i=0;i<zeros.length;i++) {
        prod = creal(1);
        for(j=0;j<zeros.length;j++) {if(i!=j){prod = cdiv(prod,csub(creal(1),cdiv(zeros[j],zeros[i])))}}
        coeffs.push(prod);
    }
    return coeffs
}

function resolution() {
    var [char,zeros] = getZeros(),i,j,str="I<sub>n</sub> = ",prod;
    for (i=0;i<zeros.length;i++) {
        prod = creal(1);
        for(j=0;j<zeros.length;j++) {if(i!=j){prod = cdiv(prod,cadd(cdiv(zeros[j],zeros[i]),creal(-1)))}}
        str += (i>0?" + ":"") + cstr(prod)+"("+cstr(zeros[i])+")<sup>n</sup>";
    }
    target('variables',str);
}

function resTable() {
    target('variables','');
    var [char,zeros] = getZeros(), infection=[],cprod, maxim=0;
    var coeffs=resCoeffs(zeros),i,prods=new Array(coeffs.length).fill(creal(1)),next,j;
    for(i=0;i<51;i++) {
        next = 0;
        for(j=0;j<coeffs.length;j++) {cprod=cmul(coeffs[j],prods[j]);next+=cprod.re;maxim=(cprod.im>maxim?cprod.im:maxim)}
        infection.push(next);
        prods = prods.map((v,k)=>cmul(v,zeros[k]));
    }
    var tdata = infection.map((v,i)=>[i,v]);
    return new Table("Forward infections (resolution)",["Day","New infections"],tdata);
}

function frlin() {
    var tTable = resTable();
    var pa = new PlotlyArgs('variables', tTable, 0, 1, 'blue', 4, 'beige')
    Plotly.newPlot(...pa.args);
}

function frlog() {
    var tTable = resTable();
    var data = [plotlyTrace(tTable, 0, 1, 'blue', 4)];
    var layout = {
        title: tTable.heading,
        showlegend: false,
        xaxis: {title: tTable.heads[0]},
        yaxis: {title: tTable.heads[1], rangemode: 'tozero', type: 'log'},
        plot_bgcolor: 'beige',
    }
    var config = {scrollZoom: false};
    Plotly.newPlot('variables',data,layout,config);
}

function backTable() {
    target('variables','');
    var [char,zeros] = getZeros(), infection=[],cprod, maxim=0;
    var coeffs=resCoeffs(zeros),i,prods=new Array(coeffs.length).fill(creal(1)),next,j;
    for(i=0;i<51;i++) {
        next = 0;
        for(j=0;j<coeffs.length;j++) {cprod=cdiv(coeffs[j],prods[j]);next+=cprod.re;maxim=(cdiv.im>maxim?cprod.im:maxim)}
        infection.push(next);
        prods = prods.map((v,k)=>cmul(v,zeros[k]));
    }
    var tdata = infection.map((v,i)=>[i,v]);
    return new Table("Backward infections (resolution)",["Day","New infections"],tdata);
}

function brlin() {
    var tTable = backTable();
    var pa = new PlotlyArgs('variables', tTable, 0, 1, 'blue', 4, 'beige')
    Plotly.newPlot(...pa.args);
}
