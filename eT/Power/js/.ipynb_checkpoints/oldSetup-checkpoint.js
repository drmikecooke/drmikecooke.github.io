function setList(string) { return Array.from(new Set(string.split(","))) } // removes duplicate elements

function makeSizeText(dn, ds, rn, rs) {
  let dsize = setList(ds).length;
  let rsize = setList(rs).length;  
  let fsize = Math.pow(rsize, dsize);
     
  // Assemble html string  
  return "|" + dn + "| = " + dsize + ", |" + rn + "| = " + rsize +
      ", |" + rn + "<sup>" + dn + "</sup>| = |" + rn + "|<sup>|" + dn +"|</sup> = " +
      rsize + "<sup>" + dsize + "</sup> = " + fsize;
}

function functionTable(ds,rs) {
  var domainlist, rangelist, vartext, tableArray = [];
  var domainsize, rangesize, functionsize;

  // Get values and process input fields
  
  domainlist = setList(ds);
  domainsize = domainlist.length;
  
  if (rs==="") {
      tableArray[0] = ["Subsets"];
      tableArray[1] = ["Number", "Subset"];
      rangelist = setList("0,1");
  }
  else {
      tableArray[0] = ["Functions (f)"];
      tableArray[1] = ["f"];
      tableArray[1] = tableArray[1].concat(domainlist);
      rangelist = setList(rs);
  }
    
  rangesize = rangelist.length;
  
  functionsize = Math.pow(rangesize, domainsize);
  
  var i, j, number, remainder, func = [];
    
 
  for (i = 0; i < functionsize; i++) {
      tableArray[i+2] = [(i+1).toString()];
      number = i;
      for (j = 0; j < domainsize; j++) {
          remainder = number % rangesize;
          number = (number - remainder)/rangesize;
          func = func.concat(rangelist[remainder]);
      }
      if(rs==="") {
          tableArray[i+2] = tableArray[i+2].concat([setString(func,domainlist)])
      } else {
          tableArray[i+2] = tableArray[i+2].concat(func)
      }
      func = [];
}

  return tableArray;
  } 

function setString(ch, dm) {
    // convert characteristic (ch) on domain (dm) to set string
    var st = [], str = "";
    for(var i=0;i<ch.length;i++) {
        if(ch[i]==1) {st.push(dm[i])}
    }
    str = st.toString().replaceAll(",", ", ")
    return "{ " + str + " }"
}