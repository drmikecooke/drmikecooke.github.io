function gt0(a) {
    return a>0 // greater than zero function
}

function tcol(plist) {
    var tstring = "<table>\n"; // set up table
    tstring += "<tr><th>Number</th><th>Factors</th></tr>\n"; // top row with descriptions
    for (var i = 0; i < plist.length; i++) {
        // output table row with number and formatted prime factorization
        tstring += "<tr><td>" + plist[i][0] + "</td><td>";
        
        var ps = plist[i][1];
        var is = plist[i][2];
            
        for (var j = 0; j < ps.length; j++) {
            tstring += ps[j] + "<sup>" + is[j] + "</sup>"; // prime + superscript index
        }
            
        tstring += "</td></tr>\n"; // end row
    }        
    return tstring + "</table>\n";
}

function dsieve(wl, pl) {
    // sieve lists to extract prime factors
    var nl, nxt, nm, np, st;
    nxt = wl.findIndex(gt0); // find first non-zero element index in work array
    nm = wl.length; // list length
    np = wl[nxt]; // prime for dividing selected numbers
    st = nxt + 2; // step between divisions
    
    for (var i = nxt; i < nm; i = i + st){
        wl[i] = wl[i]/np; // divide selected number by prime
        var j = pl[i][1].indexOf(np); // find position of prime in list
        if (j!=-1) {
            pl[i][2][j]++;
        } else {
            pl[i][1].push(np); //add prime to prime list if not already present
            pl[i][2].push(1); // index of 1
        }
    }
    wl[nxt] = 0; // sieve step complete so zero work list entry
}

function PrimeList(nMax) {
    var wl = [], pl = [], wlist, llist;
    for (var i = 2; i < nMax + 1; i++) {
        wl.push(i); // working number array
        pl.push([i,[],[]]); // prime list framework: number, prime content, indices
    }
    
    for (var i =0; i < nMax -1; i++) {
        if (wl[i]>1) {
            dsieve(wl, pl); // perform sieve step
        } else {
            wl[i] = 0; // zero leading 1s from work list
        }
    }
        
    this.plist = pl;
    this.table = function (numcol) {
        var dslice = Math.ceil(this.plist.length/numcol), tspread='<div class="centerblock">', i;
        for (i= 0; i < this.plist.length; i=i+dslice) {
            tspread += "<div class='tablecolumn'>";
            tspread += tcol(this.plist.slice(i,i+dslice));
            tspread += "</div>"
        }
        return tspread+"</div>"; 
    }
}