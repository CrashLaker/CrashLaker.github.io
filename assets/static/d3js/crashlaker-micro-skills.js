(function (){
var width = 365, height = 300
var svg = d3.select('#micro-skills')
            .attr('width', width)
            .attr('height', height)
            //.style('border', '1px solid')

var x = d3.scaleLinear().domain([0,500]).range([0,365])
var ratio = 365/500
var numNodes = 100
var green = '#73d13d'
var orange = '#ffa940'
var red = '#ff4d4f'
var blue = '#40a9ff'
var d_fontsize = 13
var nodes = [
    //{radius: 55, color: green, label: "Data Viz", group: 1}, // radius, color, text
    //{radius: 55, color: green, label: 'Data\nEngineer', group: 1}, // radius, color, text
    //{radius: 35, color: green, label: 'Data\nScience', group: 1}, // radius, color, text
    {radius: ratio*30, color: green, label: 'PySpark', group: 1}, // radius, color, text
    {radius: ratio*30, color: green, label: 'Pandas', group: 1}, // radius, color, text
    {radius: ratio*30, color: green, label: 'SQL', group: 1}, // radius, color, text
    {radius: ratio*40, color: green, label: 'JupyterLab', group: 1}, // radius, color, text
    {radius: ratio*40, color: green, label: 'Matplotlib', group: 1}, // radius, color, text
    {radius: ratio*45, color: green, label: 'Python', group: 1}, // radius, color, text
    {radius: ratio*45, color: green, label: 'D3js', group: 1}, // radius, color, text
    //{radius: 35, color: orange, label: 'Solutions\nArchitect', group: 2}, // radius, color, text
    //{radius: 55, color: orange, label: 'Infrastructure\nRHEL', group: 2}, // radius, color, text
    //{radius: 55, color: orange, label: 'Sysadmin', group: 2}, // radius, color, text
    //{radius: 35, color: orange, label: 'AWS', group: 2}, // radius, color, text
    {radius: ratio*40, color: orange, label: 'RHEL', group: 2}, // radius, color, text
    {radius: ratio*30, color: orange, label: 'AWS', group: 2}, // radius, color, text
    {radius: ratio*40, color: orange, label: 'Grafana', group: 2}, // radius, color, text
    //{radius: 55, color: red, label: 'FullStack\nDeveloper', group: 3}, // radius, color, text
    //{radius: 35, color: red, label: 'Devops', group: 3}, // radius, color, text
    {radius: ratio*20, color: red, label: 'Go', group: 3}, // radius, color, text
    {radius: ratio*35, fontsize: 12, color: red, label: 'Javascript', group: 3}, // radius, color, text
    {radius: ratio*25, fontsize: 11, color: red, label: 'ReactJs', group: 3}, // radius, color, text
    {radius: ratio*40, color: red, label: 'VueJs', group: 3}, // radius, color, text
    {radius: ratio*30, color: red, label: 'NodeJs', group: 3}, // radius, color, text
    {radius: ratio*40, color: red, label: 'MongoDB\nRedis', group: 3}, // radius, color, text
    //{radius: 55, color: blue, label: 'Parallel\nDistributed\nComputing', group: 4}, // radius, color, text
    //{radius: 75, color: blue, label: 'High Performance\nComputing', group: 4}, // radius, color, text
    {radius: ratio*40, color: blue, label: 'C', group: 4}, // radius, color, text
    {radius: ratio*25, color: blue, label: 'C++', group: 4}, // radius, color, text
    {radius: ratio*25, color: blue, label: 'MPI', group: 4}, // radius, color, text
    {radius: ratio*40, color: blue, label: 'OpenMP', group: 4}, // radius, color, text
    {radius: ratio*30, color: blue, label: 'CUDA', group: 4}, // radius, color, text
]

var group = {
    1: [x(320),200], // data viz
    2: [x(160),220], // infrastructure
    3: [x(160),90], // development
    4: [x(300),90], // hpc
}


var simulation = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody().strength(50))
    .force("x", d3.forceX().strength(0.5).x( (d) => group[d.group][0] ))
    .force("y", d3.forceY().strength(0.5).y( (d) => group[d.group][1] ))
    //.force('center', d3.forceCenter(width / 2, height / 2))
    .force('collide', d3.forceCollide().radius(function(d) {
        return d.radius + 0.5
    }).iterations(2))
    .on('tick', ticked);


function ticked() {
    var u = svg
    .selectAll('circle')
    .data(nodes)

    u.enter()
    .append('circle')
    .attr('r', (d) => d.radius)
    .attr('fill', (d) => d.color)
    .merge(u)
    .attr('cx', function(d) {
        return d.x
    })
    .attr('cy', function(d) {
        return d.y
    })
    .style("fill-opacity", 0.9)
    .attr("stroke", (d) => d.color)
    .style("stroke-width", 1)
    .call(d3.drag() // call specific function when circle is dragged
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    u.exit().remove()

    var t = svg
    .selectAll('g')
    .data(nodes)

    t.enter()
    .append('g')
    //.attr('transform', (d) => 'translate('+(d.x+d.force[0])+', '+(d.y+d.force[1])+')')
    .attr('transform', (d) => 'translate('+(d.x)+', '+(d.y)+')')
    .each(function (d){
        let v = d3.select(this)
                    .append('text')
                    .attr('x', 0)
                    .attr('y', -10*ratio)
                    .style('text-anchor', 'middle')
        let strarr = (d.label.includes('\n')) ? d.label.split('\n') : [d.label]
        if (strarr.length > 1)
            v.attr('y', -(d_fontsize/2)*(strarr.length))
        //console.log(d)
        for (let part of strarr){
            v.append('tspan')
                .attr('x', 0)
                .attr('dy', '1em')
                .attr('style', 'font: '+((d.fontsize != undefined) ? d.fontsize+'px sans-serif;' : d_fontsize+'px sans-serif'))
                .text(part)
        }
    })

    .merge(t)
    .attr('transform', (d) => 'translate('+(d.x)+', '+(d.y)+')')
    //.attr('transform', (d) => 'translate('+(d.x+d.force[0])+', '+(d.y+d.force[1])+')')

    t.exit().remove()
}
// What happens when a circle is dragged?
function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(.03).restart();
    d.fx = d.x;
    d.fy = d.y;
}
function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}
function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(.03);
    d.fx = null;
    d.fy = null;
}
})();
