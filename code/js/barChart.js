function drawChart(DALYdata) {

    data = DALYdata;
    // disorder = DALYdata
    // country

    var margin = {top: 20, right: 30, bottom: 20, left: 60},
        width = 200,
        height = 500;

    // Set the ranges
    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .2);

    var y = d3.scale.linear()
        .range([height, 0]);

    // Define the axes
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

    // Add the d3 chart canvas
    var chart = d3.select("#barChart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    dataYear = data[3]['data']

    var disorderByCountry = []
    for (country in dataYear) {
        var d = dataYear['Afghanistan']
        disorderByCountry.push(d.depressive);
    };

    // disorderByCountry = data
    console.log(d3.max(disorderByCountry))

    x.domain([data[0]['year'],data[1]['year'], data[2]['year'], data[3]['year']]);
    y.domain([0, d3.max(disorderByCountry)]);

    // Make x axis
    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Make y axis
    chart.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 7)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("DALY");

    // var country = 'Afghanistan'
    //
    // dataByCountry = {}
    // data.forEach(function(d){
    //     dataByCountry.push(d.data[country])
    // });
    // console.log(dataByCountry)

    // Make bars
    chart.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.year); })
        .attr("y", function(d) { return y(d.data['Afghanistan']['depressive']); })
        .attr("height", function(d) { return height - y(d.data['Afghanistan']['depressive']); })
        .attr("width", x.rangeBand())

    // Change color of bars and show text when hovering over
    .on("mouseover",function(d, i) {
        d3.select(this).attr("r", 10).style("fill", '#c42d00')
        chart.append("text")
            .attr("class", "toDelete")
            .attr("x", x(d.year) + (x.rangeBand()/2))
            .attr("y", y(d.data['Afghanistan']['depressive'] - 2))
            .style("text-anchor", "middle")
            .text(d.data['Afghanistan']['depressive'])
        })

    .on("mouseout", function(d) {
        d3.select(this).attr("r", 5.5).style("fill", '#ce5c00')
        d3.selectAll(".toDelete")
            .style("visibility", "hidden")
        })
}