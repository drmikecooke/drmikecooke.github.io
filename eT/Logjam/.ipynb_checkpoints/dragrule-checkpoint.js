function rule() {
      var html = "";
      for (var m = 0; m <= 20; m++) {
        html += '<div class="blk"><div class="vl"></div>' + m + '<div class="vl"></div></div>'
      }
      return html;
    }

    function logrule() {
      var html = "";
      for (var m = 1; m < 10; m++) {
        html += '<div class="blk"><div class="vl"></div>' + m + '<div class="vl"></div></div>'
        html += '<div class="blnk" style="width:' + (40*Math.log((m+1)/m)/Math.log(10/9)-40) + 'px"></div>';
      }
      return html+'<div class="blk"><div class="vl"></div>10<div class="vl"></div></div>';
    }

    function logtonum(x) {
      return 10**(Number(x) / (flog.offsetWidth - 40))
    }

    function logreadings() {
      one.style.left = slog.offsetLeft + "px";
      ten.style.left = (slog.offsetLeft + slog.offsetWidth - 40) + "px";
      var refone = logtonum(slog.offsetLeft - flog.offsetLeft).toPrecision(3);
      var reften = logtonum(slog.offsetLeft + flog.offsetWidth - 40 - flog.offsetLeft).toPrecision(3);
      var runPos = logtonum(rlog.offsetLeft - slog.offsetLeft + 60).toPrecision(3);
      var result = logtonum(rlog.offsetLeft - flog.offsetLeft + 60).toPrecision(3);
      document.getElementById("oneloginfo").innerHTML = refone + "<br /><br />" + refone;
      document.getElementById("tenloginfo").innerHTML = reften + "<br /><br />" + reften;
      document.getElementById("mulinfo").innerHTML = "× " + runPos + " = " + result + "<br /><br />" + "= " + result + " ÷ " + runPos;
    }


    function readings() {
      zero.style.left = slide.offsetLeft +"px";
      var refzero = (slide.offsetLeft - fixed.offsetLeft) / 40;
      var runPos = (runner.offsetLeft - slide.offsetLeft + 60) / 40;
      var result = (runner.offsetLeft - fixed.offsetLeft + 60) / 40;
      document.getElementById("info").innerHTML = refzero + "<br /><br />" + refzero;
      document.getElementById("add").innerHTML = "+ " + runPos + " = " + result + "<br /><br />" + "= " + result + " – " + runPos;
    }

    function getX(e) {
      var type = e.type;
      if(type=="touchstart" || type=="touchmove") {return  e.touches[0].clientX}
      return e.clientX
    }

    function slideStart(e) {
      activeItem = slide;
      refItem = fixed;
      initialX = getX(e);
      initialS = slide.offsetLeft;
      active = true;
    }

    function runnerStart(e) {
      activeItem = runner;
      refItem = fixed;
      initialX = getX(e);
      initialS = runner.offsetLeft;
      active = true;
    }

    function slogStart(e) {
      activeItem = slog;
      refItem = flog;
      initialX = getX(e);
      initialS = slog.offsetLeft;
      active = true;
    }

    function rlogStart(e) {
      activeItem = rlog;
      refItem = flog;
      initialX = getX(e);
      initialS = rlog.offsetLeft;
      active = true;
    }

    function dragEnd(e) {
      active = false;
    }

    function drag(e) {
      if (active) {
        e.preventDefault();
        currentX = getX(e) - initialX;
        activeItem.style.left = (currentX + initialS) + "px";

        if(refItem==fixed) {readings()} else {logreadings()};
      }
    }

    function crule(radius) {
      var html = "";
      for (var m = 1; m < 10; m++) {
        html += '<div class="blk" style="position:absolute;left:50%;transform-origin:50% '+radius+'px;transform:translate(-50%,0)rotate('+(360*Math.log(m)/Math.LN10)+'deg)">'
        html += '<div class="vl"></div>'+m+'<div class="vl"></div></div>';
      }
      return html;
    }

    function creadings() {
      var html = "<table><tr><th>Calculation</th><th>=</th><th>Result</th></tr>";
      var sf = 10**(sangle/360);
      var wf = 10**(wangle/360);
      var ws = 10**((wangle-sangle)/360);
      html += "<tr><td>"+ sf.toPrecision(3) + "×" + ws.toPrecision(3) + "</td><td>=</td><td>" + wf.toPrecision(3) + "</td></tr>";
      html += "<tr><td>"+ wf.toPrecision(3) + "÷" + ws.toPrecision(3) + "</td><td>=</td><td>" + sf.toPrecision(3) + "</td></tr>";
      html += "</table>";
      ctext.innerHTML = html;
    }

    function sStart(e) {
      activeItem = scabs;
      initialA = getA(e);
      initialS = sangle;
      active = true;
    }
    function wStart(e) {
      activeItem = wedge;
      initialA = getA(e);
      initialS = wangle;
      active = true;
    }

    function cdrag(e) {
      if (active) {
        e.preventDefault();
        currentA = getA(e) - initialA;
        if(activeItem==scabs) {
          sangle = initialS + currentA;
          cone.style.transform = "rotate(" + sangle + "deg)";
        } else {
          wangle = initialS + currentA;
        }
        activeItem.style.transform = "rotate(" + (initialS + currentA) + "deg)";
        creadings();
      }
    }

    function relXY(e) {
      var rect = circle.getBoundingClientRect();
      var X,Y;
      if(e.type=="touchstart" || e.type=="touchmove") { [X, Y] = [e.touches[0].clientX, e.touches[0].clientY] } else { [X,Y] = [e.clientX, e.clientY] }
      return [X - rect.left, Y - rect.top];  // [x, y] position within the element.
   }

    function getA(e) {
      var [X,Y] = relXY(e);
      return Math.atan2(X-255, 255-Y)*180/Math.PI
    }
