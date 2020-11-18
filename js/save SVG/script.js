function downloadSVG(content, fileName)
{
  var svgURL = blobURL(content, 'image/svg+xml');
  var newElem = document.createElement('a');
  newElem.href = svgURL;
  newElem.setAttribute('download', fileName);
  document.body.appendChild(newElem);
  newElem.click();
  document.body.removeChild(newElem);
}

function blobURL(content, contentType)
{
  var blob = new Blob([content], {type: contentType});
  return (window.URL || window.webkitURL).createObjectURL(blob);
}



function saveSVG()
{
  var s = Snap('#svgContainer');
  downloadSVG(s.toString(), 'demo.svg');
}