// Depends on Table.js

function cartesian(array) {
    if(array.length===1) {
        return array[0]
    } else {
        var end = array.slice(-1)[0];
        var next = array.slice(-2,-1)[0];
        var newEnd = new Set();
        next.forEach((v,k,s)=>{newEnd = union(newEnd, pair(v,end))});
        return cartesian(array.slice(0,-2).concat(newEnd))        
    }
}

function pair(a,set) {
    var newSet = new Set();
    set.forEach((v,k,s)=>{newSet.add([a].concat(v))});
    return newSet
}

function union(setA, setB) {
    let _union = new Set(setA)
    setB.forEach((v,k,s)=>{_union.add(v)})
    /*for (let elem of setB) {
        _union.add(elem)
    }*/
    return _union
}

function Morphisms(domain,range) {
    if(!(this instanceof Morphisms)) {return new Morphisms(domain, range)}
    this.domain = Array.from(domain);
    this.range = Array.from(range);
    this.functions = cartesian(this.domain.map((v)=>{return range}));
    this.table = () => {return new Table("Functions",this.domain,Array.from(this.functions))}
}

function setDisplay(set) {return '{ ' + Array.from(set).join(', ') + ' }'}

function setFromChar(domain,char) {
    // convert characteristic function (char) on domain (array) to set
    var set = new Set();
    char.forEach((v,i)=>{if(v==1){set.add(domain[i])}});
    return set
}

function setFromString(string) {
    return new Set(string.split(','));
}

function functionsClick() {
    var domain = setFromString(getValue('domain'));
    var range = setFromString(getValue('range'));
    var m = new Morphisms(domain,range), mt = m.table();
    var indexColumn = new Column("f",[...Array(mt.data.length+1).keys()].slice(1));
    mt.insertColumn(0,indexColumn);
    mt.heading = "Functions (f)";
    target('functions', mt.HTML());
}

function setsClick() {
    var domain = setFromString(getValue('set'));
    var range = new Set([0,1]);
    var m = new Morphisms(domain,range), mt = m.table();
    var setArray = mt.data.map((v)=>{return setFromChar(mt.heads,v)});
    var displaySets = setArray.map((v)=>{return [setDisplay(v)]});
    var power = new Table('Subsets', ['Subset'], displaySets);
    var indexColumn = new Column('Number', [...Array(mt.data.length+1).keys()].slice(1));
    power.insertColumn(0,indexColumn);
    target('subsets', power.HTML());
}

function makeSizeText(dn, ds, rn, rs) {
  let dsize = setFromString(ds).size;
  let rsize = setFromString(rs).size;  
  let fsize = Math.pow(rsize, dsize);
     
  // Assemble html string  
  return "|" + dn + "| = " + dsize + ", |" + rn + "| = " + rsize +
      ", |" + rn + "<sup>" + dn + "</sup>| = |" + rn + "|<sup>|" + dn +"|</sup> = " +
      rsize + "<sup>" + dsize + "</sup> = " + fsize;
}