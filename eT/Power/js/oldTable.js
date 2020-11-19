function wrap(open, close) {return (v)=>{return open+v+close}}
function arrayWrap(array, open, close) {return array.map(wrap(open,close))}
function elementWrap(array, open, close) {return array.map((v)=>{return arrayWrap(v,open,close).join("")})}

function Table(heading, heads, data) {
    if(!(this instanceof Table)) {return new Table(heading, heads, data)}
    this.heading = heading;
    this.heads = heads;
    this.data = data;
    this.caption = wrap("<caption>","</caption>\n")(heading);
    this.th = wrap("<tr>","</tr>\n")(arrayWrap(heads,"<th>","</th>").join(""));
    this.td = arrayWrap(elementWrap(data,"<td>","</td>"),"<tr>","</tr>\n").join("");
    this.HTML = wrap("<table>\n","</table>\n")(this.caption+this.th+this.td);
    this.column = function(i) {return {head: heads[i], column: data.map((v)=>{return v[i]})}}
    this.pData = [{x:this.column(0).column,y:this.column(1).column,type:'scatter',mode:'lines'}];
    this.pLayout = {title: heading, showlegend: false, xaxis: {title: heads[0]}, yaxis: {title: heads[1], rangemode: 'tozero'}}
    this.CSV = heads.join() + "\n" + data.join("\n");
}