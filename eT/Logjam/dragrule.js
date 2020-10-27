function rule() {
      var html = "";
      for (var m = 0; m <= 20; m++) {
        html += '<div class="blk"><div class="vl"></div>' + m + '<div class="vl"></div></div>'
      }
      return html;
    }

    function readings() {
      var refzero = (slide.offsetLeft - fixed.offsetLeft) / 40;
      var runPos = (runner.offsetLeft - slide.offsetLeft + 60) / 40;
      var result = (runner.offsetLeft - fixed.offsetLeft + 60) / 40;
      document.getElementById("info").innerHTML = refzero + "<br /><br />" + refzero;
      document.getElementById("add").innerHTML = "+ " + runPos + " = " + result + "<br /><br />" + "= " + result + " – " + runPos;
    }

    function slideStart(e) {
      activeItem = slide;
      if (e.type === "touchstart") {
        initialX = e.touches[0].clientX;
      } else {
        initialX = e.clientX;
      }
      initialS = slide.offsetLeft;
      active = true;
    }

    function runnerStart(e) {
      activeItem = runner;
      if (e.type === "touchstart") {
        initialX = e.touches[0].clientX;
      } else {
        initialX = e.clientX;
      }
      initialR = runner.offsetLeft;
      active = true;
    }

    function dragEnd(e) {
      initialX = currentX;
      active = false;
    }

    function drag(e) {
      if (active) {

        e.preventDefault();

        if (e.type === "touchmove") {
          currentX = e.touches[0].clientX - initialX;
        } else {
          currentX = e.clientX - initialX;
        }

        if (activeItem == slide) {
          slide.style.left = (currentX + initialS) + "px";
          zero.style.left = (currentX + initialS) + "px";
        } else {
          runner.style.left = (currentX + initialR) + "px";
        }

        readings();
      }
    }
