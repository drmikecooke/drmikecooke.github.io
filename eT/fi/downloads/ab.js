import {Complex,creal,cstr,cadd,cmul,cinv,cabs,cdiv} from './comp.js'
import {Polynomial,pstr,pdeg,peval,pdiff,pGCD} from './poly.js'

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