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

    <div ref="bchart" align="left"></div> 
  </div>

  
</template>

<script>
import * as d3 from "d3";
export default {
  name: "BubbleChart",
  mounted: function () {
    d3.csv("education/total-majors.csv").then((data) => {
      this.bubbleChart(data);
    });
  }, // mounted
  methods: {
    bubbleChart(data) {
        console.log(data);

    const margin = { top: 50, right: 20, bottom: 50, left: 90 };
    const height = 550 - margin.top - margin.bottom; // height
    const width = 900 - margin.left - margin.right; // width

      const svg = d3
        .select(this.$refs.bchart)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

            // Add X axis
    var x = d3.scaleLinear()
        .domain([0, 1])
        .range([0, width]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .style('font-size', '14px')
        .call(d3.axisBottom(x).tickFormat(d3.format("~%")));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 100000])
        .range([height, 0]);

    // population scale
    var z = d3.scaleLinear()
        .domain([0, 100000])
        .range([0, 15]);

    svg.append("g").style('font-size', '14px')
        .call(d3.axisLeft(y).tickFormat(d3.format("$~s")));

            // total sample size for bubble scale
    const color = d3.scaleOrdinal()
        .domain(data.map(function(d) { return d.Major_category; }))
        .range(d3.quantize(d3.interpolateHcl("#f4e153", "#362142"), 7));


            // Draw bubbles and color code using color function
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d) => {
            return x(d.ShareWomen);
        })
        .attr("cy", (d) => {
            return y(d.Median);
        })
        .attr("r", (d) => {
            return z(d.Total);
        })
        .style("opacity", ".7")
        .style("fill", function(d) { return color(d.Major_category); })
        .on("mouseover", function () {
          d3.select(this).attr("stroke", "#000");
        })
        .on("mouseout", function () {
          d3.select(this).attr("stroke", null);
        });



    // Create bubble labels and center them 
    svg.selectAll(".text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", (d) => {
            return x(d.ShareWomen);
        })
        .attr("y", (d) => {
            return y(d.Median);
        })
        .text(function(d) {
            return d.Major_category;
        })
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .style('font-weight', 'bold')
        .style('font-size', '16px');

    // X Axis Label
    svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + 45) + ")")
        .style("text-anchor", "middle")
        .style('font-size', '14px')
        .style('color', '#fff')
        .text("Percent of Women Students");

    // Y Axis Label 
    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left)
        .attr('x', 0 - (height / 2))
        .style('font-size', '14px')
        .style('color', '#fff')
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text('Median Salary');

    // Chart Title
    svg.append("text")
        .attr('x', (width / 2))
        .attr('y', -5)
        .attr('text-anchor', 'middle')
        .style('font-size', '18px')
        .style('font-weight', 'bold')
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
