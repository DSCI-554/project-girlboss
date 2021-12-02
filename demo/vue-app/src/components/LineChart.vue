<template>
  <div id="tsdiv">
    <h1 align="left">Monthly Wages by Gender Over Time (local currency)</h1>
    <b-row align-h="start">
      <b-col align-self="start" cols="10">
      <p align="left">
        Gender equality in the workplace and provision of fair pay is key to economic development. Women still face significant barriers to access
        decision-making roles and jobs all across the world. The goal of
        non-discrimination and equal treatment in the workplace is to ensure all workers are paid equally for labor of equal value, regardless of gender. The extent to which this is true can be evalulated using wage data disaggregated over time and by country.
      </p>
      </b-col>
    </b-row>

    <div ref="lchart" align="left"></div> 
  </div>

  
</template>

<script>
import * as d3 from "d3";
export default {
  name: "LineChart",
  mounted: function () {
    d3.csv("education/global_levels.csv").then((data) => {
      this.lineChart(data);
    });
  }, // mounted
  methods: {
    lineChart(data) {
        console.log(data);

    const margin = { top: 50, right: 30, bottom: 150, left: 75 };
    const height = 700 - margin.top - margin.bottom; // height
    const width = 500 - margin.left - margin.right; // width


     function original_time_series(data) {

        data = data.filter(d => d.Country == "World")

      const svg = d3
        .select(this.$refs.lchart)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

        //scale x axis 
        const x = d3.scaleTime()
            .domain(d3.extent(data, d => d.Year))
            .range([0, width]);


        //scale y axis
        const y = d3.scaleLinear()
            .domain([d3.min(data, d => d.Value) - .1, d3.max(data, d => d.Value) + .1])
            .range([height, 0]);


        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        svg.append("text")
            .attr("transform", "translate(" + (width / 2) + " ," + (height + 35) + ")")
            .style("text-anchor", "end")
            .style('font-size', '14px')
            .style('color', '#fff')
            .text("Year");

        // draw y axis and label    
        svg.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(y).ticks(10));

        svg.append("text")
            .attr('transform', 'rotate(-90)')
            .attr('y', 10 - margin.left)
            .attr('x', 0 - (height / 2))
            .style('font-size', '14px')
            .style('color', '#fff')
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .text("Gender Parity Index (GPI)");

        //use d3 nest function to next lines
        const sumstat = d3.nest()
            .key(d => d.Country)
            .entries(data);

        console.log(sumstat);

        const line = d3.line()
            .x(function(d) { return x(d.Year); })
            .y(function(d) { return y(d.Value); });;

        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#8d99ae")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 3)
            .attr("d", line);

        //append circle 
        svg.selectAll("circle")
            .append("g")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", 4)
            .attr("cx", d => x(d.Year))
            .attr("cy", d => y(d.Value))
            .style("fill", d => color(d.Country));

        // create legend using color function
        svg.selectAll("mydots")
            .data(sumstat)
            .enter()
            .append("rect")
            .attr("x", width - 50)
            .attr("y", function(d, i) { return 10 + i * 25 })
            .attr("width", 15)
            .attr("height", 15)
            .style("fill", "#8d99ae" );

        // create legend labels
        svg.selectAll("mylabels")
            .data(sumstat)
            .enter()
            .append("text")
            .attr("x", width - 30)
            .attr("y", function(d, i) { return 20 + i * 25 })
            .style("fill", "black")
            .text(function(d) { return d.key })
            .attr("text-anchor", "left")
            .style('font-size', '14px')
            .style("alignment-baseline", "middle");

        // Chart Title
        svg.append("text")
            .attr('x', (width / 2))
            .attr('y', 0)
            .attr('text-anchor', 'middle')
            .style('font-size', '18px')
            .style('color', '#fff')
            .text('Carbon Emission Estimates in South America (1995-2017)');
    }


    }, //bubble chart
  }, // methods
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#tsdiv {
  padding-left: 10%;
}
</style>
