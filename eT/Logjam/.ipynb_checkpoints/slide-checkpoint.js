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