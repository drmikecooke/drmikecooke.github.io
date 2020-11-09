function gt0(a) {
    // greater than zero function
    return a>0
}

function tcol(nlist,plist,ilist) {
	var tstring = "<table border=1>\n"; // # set up table
        tstring += "<tr><th style='padding: 20px'>Number</th><th style='padding: 20px'>Factors</th></tr>\n"; // top row with descriptions
        for (var i = 0; i < nlist.length; i++) {
            // output table rows with number and formatted prime factorization
            tstring += "<tr><td>"+nlist[i].toString()+"</td><td>";
            var ps = plist[i];
            var is = ilist[i];
            
            for (var j = 0; j < ps.length; j++) {
                // prime + superscript index
                tstring += ps[j].toString() + "<sup>" + is[j].toString() + "</sup>";
            }
            
            tstring += "</td></tr>\n"; // end row
        }
        
        return tstring + "</table>\n";
}

function dsieve(ls) {
    // # sieve lists to extract prime factors
    var nl, pl, il, nxt, nm, np, st;
    [nl, pl, il] = ls; // number, prime, index lists
    nxt = nl.findIndex(gt0); // find first non-zero element index in nl
    nm = nl.length; // list length
    np = nl[nxt]; // prime for dividing selected numbers
    st = nxt + 2; // step between divisions
    
    for (var i = nxt; i < nm; i = i + st){
        nl[i] = nl[i]/np; // divide selected number by prime
        if (pl[i].includes(np)) {
            var j = pl[i].indexOf(np); // find position of prime in list
            il[i][j]++;
        } else {
            //add prime to prime list if not already present
            pl[i] = pl[i].concat([np]);
            il[i] = il[i].concat([1]);
        }
        nl[nxt] = 0; // sieve step complete so zero work list entry
    }
    
    return [nl, pl, il]
}

class pflist {
    constructor(nmax) {
        var nl = [], ol = [], pl = [], il = [], wlist, llist;
        for (var i = 2; i < nmax + 1; i++) {
            // create number list
            nl = nl.concat([i]);
            ol = ol.concat([i]);
            pl = pl.concat([[]]);
            il = il.concat([[]]);
        }
        
        llist = [nl,pl,il]; // component list for sieve
        
        for (var i =0; i < nmax -1; i++) {
               if (llist[0][i]>1) {
                   llist = dsieve(llist); // perform sieve step
               } else {
                   llist[0][i] = 0; // zero leading 1s from work list
               }
               }
        
        this.nlist = ol;
        this.plist = llist[1];
        this.ilist = llist[2];
    }
    
    table(numcol) {
    	var dslice = Math.ceil(this.nlist.length/numcol), tspread='<div style="display:inline-block;margin:auto;">', i;
    	for (i= 0; i < this.nlist.length; i=i+dslice) {
                tspread += "<div style='float:left;padding:6px;'>";
    		tspread += tcol(this.nlist.slice(i,i+dslice),this.plist.slice(i,i+dslice),this.ilist.slice(i,i+dslice));
                tspread += "</div>"
    	}    	
    	return tspread+"</div>";       
    }
}
