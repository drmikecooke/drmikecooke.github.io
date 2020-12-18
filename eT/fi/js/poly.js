import {Complex,creal,cstr,cabs,cadd,cmul,cdiv} from './comp.js'

export function Polynomial(coeff) {
    var leading = coeff.pop();
    while(leading!=undefined && cabs(leading)==0 ) {
        leading = coeff.pop();
    }
    if(leading!=undefined) {coeff.push(leading);}
    this.coeff = coeff;
}

export function pstr(p) {
    if(p.coeff.length==0) {return cstr(creal(0))}
    var s=cstr(p.coeff[0]);
    for(var i=1;i<p.coeff.length;i++) {s += " + "+cstr(p.coeff[i])+"x"+(i>1?("^"+i):"")}
    return s
}

export function pdeg(p) {
    if(p.coeff.length==0) {return -Infinity}
    return p.coeff.length-1
}

export function peval(p,z) {
    var coeff = p.coeff.slice(0);
    var result = coeff.pop();
    while (coeff.length) {
        result = cadd(cmul(result,z),coeff.pop());
    }
    return result
}

export function pdiff(p) {
    var coeff = p.coeff.slice(1);
    for(var i=0;i<coeff.length;i++) {coeff[i] = cmul(creal(i+1),coeff[i])}
    return new Polynomial(coeff)
}

export function padd(p1,p2) {
    var result, p1c=p1.coeff.slice(0), p2c=p2.coeff.slice(0)
    if(p2c.lenght>p1c.length) {
        p1c = p1c.concat(Array(p2c.length-p1c.length).fill(creal(0)))
    } else {
        p2c = p2c.concat(Array(p1c.length-p2c.length).fill(creal(0)))
    }
    return new Polynomial(p1c.map((v,i)=>cadd(v,p2c[i])))
}

export function pmul(p1,p2) {
    var result=[], p1c=p1.coeff.slice(0), p2c=p2.coeff.slice(0);
    for(var m=0;m<p1c.length;m++) {
        for(var n=0;n<p2c.length;n++) {
            if((m+n)==result.length) {result = result.concat([creal(0)])}
            result[m+n] = cadd(result[m+n],cmul(p1c[m],p2c[n]));
        }
    }
    return new Polynomial(result)
}

export function pdiv(p1,p2) {
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

export function pGCD(p1,p2) {
    var p1c=p1.coeff.slice(0), p2c=p2.coeff.slice(0);
    if(p1c.length<p2c.length) {return pGCD(p2,p1)}
    var rem = pdiv(p1,p2)[1];
    if(pdeg(rem)==-Infinity) {return p2} else {return pGCD(p2,rem)}
}