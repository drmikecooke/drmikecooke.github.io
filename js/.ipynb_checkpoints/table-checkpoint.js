// function to convert array into string of HTML table code
function table(data) {
    var tHTML = '<table>\n';
    tHTML += '<caption>' + data[0] + '</caption>\n';
    tHTML += tableRow(data[1], "th"); // Headings
    for(var i=2; i<data.length; i++) { tHTML += tableRow(data[i], "td");}
    return tHTML + "</table>\n"
}

function tableRow(row,type) {
    var rowHTML = "<tr>";
    for (var i=0;i<row.length;i++) {rowHTML += "<" + type + ">" + row[i] + "</" + type + ">";};
    return rowHTML + "</tr>\n"
}