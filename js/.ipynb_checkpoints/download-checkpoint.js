function downloadMIME(content, file, MIME) {
      var url = blobURL(content, MIME);
      var newElem = document.createElement('a');
      newElem.href = url;
      newElem.setAttribute('download', file);
      document.body.appendChild(newElem);
      newElem.click();
      document.body.removeChild(newElem);
    }
    
    function blobURL(content, contentType) {
      var blob = new Blob([content], {type: contentType});
      return window.URL.createObjectURL(blob);
    }
    
    function savePlotly(div,file) {
      var imageParts = document.getElementById(div).querySelectorAll('svg.main-svg');
      if(!imageParts.length) {return "No svg"}
      var imageSVG = imageParts[0].outerHTML;
      imageSVG = imageSVG.slice(0,-6);
      for(var i=1;i<imageParts.length;i++) {imageSVG += imageParts[i].innerHTML;}
      imageSVG += '</svg>';
      downloadMIME(imageSVG, file, 'image/svg+xml');
      return imageParts.length
    }