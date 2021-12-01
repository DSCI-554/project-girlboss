<template>
  <div id="tsdiv2">
    <h2 align="left" id="gender_disparity_wages">Gender Disparity in Wages</h2>
    <h3 align="left">Female to Male Earnings Ratio (1995-2011)</h3>
    <p align="left">
      The total female-to-male earnings ratio is calculated as average monthly wages of
      females divided by average monthly wages of males. We calculate the earnings ratio to provide an overeview of data from countries with different local currencies. The data is sourced from the No Ceilings dataset for 85 unique countries between the years
      1995 to 2011.
    </p>
    <div ref="tschartoverview" align="left"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "TimeSeriesAggChart",
  methods: {
    lineChart(data) {
      const margin = { top: 10, right: 30, bottom: 30, left: 30 },
        width = 800 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;

      const svg = d3
        .select(this.$refs.tschartoverview)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      //Read the data
      //   d3.csv(url).then((data) => {
      // console.log(data)

      var x = d3.scaleLinear().domain([1995, 2011]).range([0, width]);

      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

      // Add Y axis
      var y = d3
        .scaleLinear()
        .domain([
          0.65,
          d3.max(data, function (d) {
            return +d.w_m_ratio;
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
        .attr("stroke-width", 3)
        .attr(
          "d",
          d3
            .line()
            .x(function (d) {
              return x(d.year);
            })
            .y(function (d) {
              return y(d.w_m_ratio);
            })
        );
      //   }); // .tjem
    }, //linechart
  }, // methods
  mounted: function () {
    d3.csv("wages/wages_agg.csv").then((data) => {
      this.lineChart(data);
      this.data = data;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
/* stylize the menu */
.dropdown {
  border-radius: 5px;
  padding: 5px;
  margin: 10%;
  cursor: pointer;
}
option:hover {
  cursor: pointer;
}

#tsdiv2 {
  width: 80%;
  padding-left: 3%;
  padding-bottom: 5%;
  padding-top: 5%;
}
</style>
