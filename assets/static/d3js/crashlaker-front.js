(function (){
var label = {
    'Blog': '/blog',
    'Projects': '/projects',
    'Experience': '#experience',
    'Resume': '/resume'
}

var width = 90, height = 50



var goTo = path => {
    console.log('trigger', path, label[path])
    let url = location.origin
    if (label[path].split('')[0] == '#'){
        location.href = '/'+label[path]
        //history.replaceState(null, null, url)
    }else{
        window.location.href = url+label[path]
    }
}

d3.select('#front-panel')
    .attr('width', 600)
    .attr('height', 50)
    .selectAll('g')
    .data(Object.keys(label))
    .enter()
    .append('g')
    .style('cursor', 'pointer')
    .each(function (d,i) {
       var obj = d3.select(this)
       obj
        .append('rect')
        .attr('width', width+'px')
        .attr('height', height+'px')
        .attr('x', i*width + ((i!=0)?5*i:0))
        .attr('fill', '#d9f7be')
       obj
        .append('text')
        .attr('width', width+'px')
        .attr('height', height+'px')
        .attr('x', i*width + ((i!=0)?5*i:0) + width/2)
        .attr('y', height/1.6)
        .attr('fill', 'black')
        .style('text-anchor', 'middle')
        .text(d)
    })
    .on('click', (d) => goTo(d))
})();
