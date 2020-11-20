function wrap(open, close) {return (v)=>{return open+v+close}}
function arrayWrap(array, open, close) {return array.map(wrap(open,close))}
function elementWrap(array, open, close) {return array.map((v)=>{return arrayWrap(v,open,close).join("")})}

function Column(head, data) {
    if(!(this instanceof Column)) {return new Column(head, data)}
    this.head = head;
    this.data = data;
}

function Table(heading, heads, data) {
    if(!(this instanceof Table)) {return new Table(heading, heads, data)}
    this.heading = heading;
    this.heads = heads;
    this.data = data;
    this.HTML = ()=>{
        var caption = wrap("<caption>","</caption>\n")(this.heading);
        var th = wrap("<tr>","</tr>\n")(arrayWrap(this.heads,"<th>","</th>").join(""));
        var td = arrayWrap(elementWrap(this.data,"<td>","</td>"),"<tr>","</tr>\n").join("");
        return wrap("<table>\n","</table>\n")(caption+th+td)
    };
    this.column = (i)=>{return new Column(heads[i], data.map((v)=>{return v[i]}))}
    this.insertColumn = (i, col)=>{
        this.heads.splice(i,0, col.head);
        this.data.map((v,j)=>{v.splice(i,0,col.data[j])});
        };
    this.CSV = ()=>{heads.join() + "\n" + data.join("\n")};
}

function PlotlyArgs(div, table, i, j, color, width, bgcolor) {
    if(!(this instanceof PlotlyArgs)) {return new PlotlyArgs(div, table, i, j)}
    this.div = div;
    this.data = [plotlyTrace(table, i, j, color, width)];
    this.layout = plotlyLayout(table, i, j, bgcolor);
    this.config = {scrollZoom: false};
    this.args = [div, this.data, this.layout, this.config]
}

function plotlyTrace(table, i, j, color, width) {
    return {
        x: table.column(i).data,
        y: table.column(j).data,
        type: 'scatter',
        mode: 'lines',
        line: {color: color, width: width}
    }
}

function plotlyLayout(table, i, j, bgcolor) {
    return {
        title: table.heading,
        showlegend: false,
        xaxis: {title: table.heads[i]},
        yaxis: {title: table.heads[j], rangemode: 'tozero'},
        plot_bgcolor: bgcolor,
    }
}