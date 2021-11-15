<template>
  <div>
    <h1>Time Series Chart</h1>
    <!-- USE ref=, not id= -->
    <div ref="tschart"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "TimeSeriesChart",
  // ADD D3 CODE HERE, use refs instead of id, for example:
  // var svg = d3
  // .select(this.$refs.tschart)
  methods: {
    lineChart(data) {
      // console.log("call line chart");
      // console.log(data);
      // Ex from: https://www.d3-graph-gallery.com/graph/line_basic.html

      var margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      var svg = d3
        .select(this.$refs.tschart)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      var x = d3
        .scaleTime()
        .domain(
          d3.extent(data, function (d) {
            return d.date;
          })
        )
        .range([0, width]);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
      var y = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(data, function (d) {
            return +d.value;
          }),
        ])
        .range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Add the line
      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr(
          "d",
          d3
            .line()
            .x(function (d) {
              return x(d.date);
            })
            .y(function (d) {
              return y(d.value);
            })
        );
    },
  },
  mounted: function () {
    console.log("mounted Time Series Chart component");
    d3.csv(
      "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",
      (d) => {
        return { date: d3.timeParse("%Y-%m-%d")(d.date), value: d.value };
      }
    ).then((data) => {
      this.lineChart(data);
    });
  },
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
</style>
