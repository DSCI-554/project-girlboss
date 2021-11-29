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

    <div ref="rchart" align="left"></div> 
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "RadialChart",
  mounted: function () {
    d3.csv("education/women-stem.csv").then((data) => {
      this.radialChart(data);
    });
  }, // mounted
  methods: {
    radialChart(data) {

    const margin = { top: 100, right: 0, bottom: 50, left: 0 };
    const height = 1000 - margin.top - margin.bottom; // height
    const width = 800 - margin.left - margin.right; // width
    const innerRadius = 90;
    const outerRadius = 500 / 2;

    data.sort((a, b) => d3.ascending(a.Major_category, b.Major_category));
    const SHARE = d3.mean(data, d => d.ShareWomen);

      const svg = d3
        .select(this.$refs.rchart)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

    var x = d3.scaleBand()
            .range([0, 2 * Math.PI]) // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
            .domain(data.map(function(d) { return d.Major; })); // domain of the X axis is the list of majors.

        var y = d3.scaleRadial()
            .range([innerRadius, outerRadius])
            .domain([0, d3.max(data, d => d.ShareWomen)]); // Domain of Y is from 0 to the max seen in the data


// Add the bars
        svg.append("g")
            .selectAll("path")
            .data(data)
            .enter()
            .append("path")
            .style("fill", "pink")
            .attr("stroke", "white")
            .attr("stroke-width", 1)
            .attr("d", d3.arc() // imagine your doing a part of a donut plot
                .innerRadius(innerRadius)
                .outerRadius(function(d) { return y(d.ShareWomen); })
                .startAngle(function(d) { return x(d.Major); })
                .endAngle(function(d) { return x(d.Major) + x.bandwidth(); })
                .padAngle(0.01)
                .padRadius(innerRadius));

            // Add the labels
        svg.append("g")
            .selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "name")
            .attr("text-anchor", function(d) { return (x(d.Major) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
            .attr("transform", function(d) { return "rotate(" + ((x(d.Major) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")" + "translate(" + (y(d.ShareWomen) + 10) + ",0)"; })
            .append("text")
            .text(function(d) { return (d.Major) })
            .attr("transform", function(d) { return (x(d.Major) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
            .style("font-size", "9px")
            .attr("alignment-baseline", "middle")

        const format = d3.format(".2%")


                svg.append("text")
            .style("font-size", "24px")
            .attr("y", height / innerRadius - 20)
            .attr("x", width / innerRadius - 45)
            .attr("alignment-baseline", "middle")
            .text(format(SHARE));

        svg.append("text")
            .style("font-size", "14px")
            .attr("y", height / innerRadius + 5)
            .attr("x", width / innerRadius - 50)
            .attr("alignment-baseline", "middle")
            .text("Total % Women");

        var yAxis = svg.append("g")
            .attr("text-anchor", "middle")

        var yTick = yAxis.selectAll("g")
            .data(y.ticks(4).slice(1))
            .enter().append("g");

        yTick.append("circle")
            .attr("fill", "none")
            .attr("stroke", "gray")
            .attr("r", y);

        yTick.append("text")
            .attr("y", function(d) { return -y(d); })
            .attr("dy", "0.5em")
            .attr("fill", "none")
            .attr("stroke", "#fff")
            .attr("stroke-width", 7)
            .text(y.tickFormat(4, "s"));

        yTick.append("text")
            .attr("y", function(d) { return -y(d); })
            .style("font-weight", "bold")
            .attr("dy", "0.35em")
            .text(y.tickFormat(4, "%"));

    // Chart Title
    svg.append("text")
        .attr('x', (width / 2))
        .attr('y', -5)
        .attr('text-anchor', 'middle')
        .style('font-size', '18px')
        .style('color', '#fff')
        .text('Gender Share by STEM Majors and Median Salaries (United States)');


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
