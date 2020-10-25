function rule() {
  var html="";
  for(var m=0; m<=20; m++) {
      html += '<div class="blk"><div class="vl"></div>'+m+'<div class="vl"></div></div>'
    }
  return html;
}

function readings() {
  var zero = (document.getElementById("zblk").offsetLeft-document.getElementById("ref").offsetLeft)/40;
  var runner = (document.getElementById("rblk").offsetLeft-document.getElementById("mydiv").offsetLeft+60)/40;
  var result = (document.getElementById("rblk").offsetLeft-document.getElementById("ref").offsetLeft+60)/40;
  document.getElementById("info").innerHTML = zero+"<br /><br />"+zero;
  document.getElementById("add").innerHTML = "+ "+runner+" = "+result+"<br /><br />"+"= "+result+" – "+runner;
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    //elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    if(elmnt.id=="mydiv") {
      document.getElementById("zblk").style.left = elmnt.offsetLeft + "px";
      document.getElementById("zblk").style.top = (elmnt.offsetTop-10) + "px";
      document.getElementById("rblk").style.top = (elmnt.offsetTop-10) + "px";
    }
    readings()
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
