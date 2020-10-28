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
