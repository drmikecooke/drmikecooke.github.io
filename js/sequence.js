function Sequence(...args) {
    if(args.length>2) {console.log('Sequence error - too many arguments');return}
    if(!(this instanceof Sequence)){return new Sequence(...args)}    
    if(args.length==2) {this.shift = args[1];} else {this.shift = 0;}
    if(args.length!=0) {this.list = args[0];} else {this.list = [];}
    while(this.list[0]==0) {
        this.list = this.list.slice(1);
        this.shift++;
    }
    while(this.list[this.list.length-1]==0) {
        this.list = this.list.slice(0,this.list.length-1);
    }
    if(this.list.length==0) {this.shift=0;}
    this.index = function (i) {
        var j = i-this.shift;
        if(0<=j && j <this.list.length) {return this.list[j]} else {return 0}
    }
}

Object.defineProperty(Sequence.prototype, 'max', {
    get: function() {
        return this.shift+this.list.length-1;
    }/*,
    set: function(value) {
        this.shift = value;
    }*/
});

Object.defineProperty(Sequence.prototype, 'min', {
    get: function() {
        return this.shift;
    }/*,
    set: function(value) {
        this.shift = value;
    }*/
});

function add(seq1,seq2) {
    function smax(s) {return s.shift+s.list.length-1}
    var shift = Math.min(seq1.shift,seq2.shift);
    var seqmax = Math.max(seq1.max,seq2.max);
    var seqlen = seqmax-shift+1,seq=[];
    for(var i=shift;i<seqmax+1;i++) {
        seq.push(seq1.index(i)+seq2.index(i));
    }
    return Sequence(seq,shift)
}

function conv(seq1,seq2) {
    var shift=seq1.shift+seq2.shift, seq=[];
    for(var m=seq1.shift;m<seq1.max+1;m++) {
        for(var n=seq2.shift;n<seq2.max+1;n++) {
            if(m+n<shift+seq.length) {
                seq[m+n-shift]+=seq1.index(m)*seq2.index(n);
            } else {
                seq.push(seq1.index(m)*seq2.index(n));
            }
        }
    }
    return Sequence(seq,shift)
}

function reccon(z,g) { // Test for recurrence g consistency on seed z
    var czg = conv(z,Sequence(g))
    return czg.list.slice(g.length-1,czg.list.length-g.length+1).every((v)=>v==0)
}

function forward(z,g,n) {
    if(!reccon(z,g)) {console.log('Seed not consistent with proposed recurrence.'); return}
    var zl=z.list,v,m;
    if(zl.length<g.length-1) {console.log('Seed inadequate length.'); return}
    for(var k=0;k<n;k++){
        v=0;
        for(m=1;m<g.length;m++) {v+=g[m]*zl[zl.length-m]}
        zl.push(-v/g[0])
    }    
    return z
}

function backward(z,g,n) {
    if(!reccon(z,g)) {console.log('Seed not consistent with proposed recurrence.'); return}
    var zl=z.list,v,m;
    if(zl.length<g.length-1) {console.log('Seed inadequate length.'); return}
    for(var k=0;k<n;k++){
        v=0;
        for(m=0;m<g.length-1;m++) {v+=g[m]*zl[g.length-m-2]}
        zl.unshift(-v/g[g.length-1]);
        z.shift--;
    }    
    return z
}

function extend(z,g,m,n) {
    z = backward(forward(z,g,n),g,m);
    if(!reccon(z,g)) {console.log('Extended sequence unreliable.')}
    return z
}