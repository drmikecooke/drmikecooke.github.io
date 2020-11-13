function Description(listName,listString) {
	this.n = listName;
	this.l = setList(listString);	
}

function removeDuplicateUsingSet(arr) {
    let unique_array = Array.from(new Set(arr))
    return unique_array
}

function setList(string) {
	let list = removeDuplicateUsingSet(string.split(","));
	return list
}

function sizeText(dn,rn,tn) {

}

function removeText(t) {
	document.getElementById(t).innerHTML = "";
}

function makeSizeText(dn, ds, rn, rs, tn) {
  let d = new Description (dn, ds);
  let dsize = d.l.length;

  let r = new Description(rn, rs);
  let rsize = r.l.length;
  
  fsize = Math.pow(rsize, dsize);
     
  // Assemble string
  
  vartext = "|" + d.n + "| = " + dsize.toString() + ", |" + r.n + "| = " + rsize.toString() + ", |" + r.n + "<sup>" + d.n + "</sup>| = |"+ r.n + "|<sup>|" + d.n +"|</sup> = ";
  vartext += rsize.toString() + "<sup>" + dsize.toString() + "</sup> = " + fsize.toString();
  
  document.getElementById(tn).innerHTML = vartext;
	
}

function headText(hname, habbr, dlist) {
	let t = "<caption>"+ hname + "</caption>" + "<tr><th>" + habbr + "</th>";
	if (dlist=="Subset") { t += "<th>" + dlist + "</th>"; }
	else {
	var i;
	for (i = 0; i < dlist.length; i++) {
  	t += "<th>" + dlist[i] + "</th>";
} 
	}	
  t += "</tr>";
	return t;
}

function createTable(ds,rs,ts) {
  var domainlist, rangelist, vartext, tabletext;
  var domainsize, rangesize, functionsize;

  // Get values and process input fields
  
  domainlist = setList(ds);
  domainsize = domainlist.length;
  
  if (rs==="") {
  	vartext = headText("Subsets", "Number", "Subset");
  	rangelist = setList("0,1");
  }
  else {
  	vartext = headText("Functions (f)", "f", domainlist);
  	rangelist = setList(rs);
  }
  
  rangesize = rangelist.length;
  
  functionsize = Math.pow(rangesize, domainsize);
     
  // Assemble string
  
  var i, j, number, remainder, setbuild;
    
  for (i = 0; i < functionsize; i++) {
  
  	vartext += "<tr><td>" + (i + 1).toString() + "</td>";
  	number = i;
  	setbuild = "<td>{ "
  	for (j = 0; j < domainsize; j++) {
  		  	remainder = number % rangesize;
  		  	number = (number - remainder)/rangesize;
  		  	if (rs==="" && remainder==1) {
  		  		setbuild += domainlist[j] + ", ";
  		  	} 	else if (!(rs==="")) {
  		  		vartext += "<td>" + rangelist[remainder] + "</td>";
  		  	}
  	}
  	if (rs==="") {
 	if (setbuild.length>6) {
  		setbuild = setbuild.slice(0,setbuild.length-2)
  	}
  		vartext += setbuild + " }<td>";
  	}
  	vartext += "</tr>"
}

  document.getElementById(ts).innerHTML = vartext;
  } 