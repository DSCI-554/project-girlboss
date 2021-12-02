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
    <b-container>
      <b-row align-h="start">
        <b-col align-self="start" cols="1"
          ><b-form-select
            id="#select"
            v-model="selected"
            :options="options"
            @change="onChange($event)"
            class="dropdown"
          ></b-form-select
        ></b-col>
      </b-row>
    </b-container>
    <div ref="lchart" align="left"></div> 
  </div>

  
</template>

<script>
import * as d3 from "d3";
export default {
  name: "LineChart",
  data() {
    return {
      selected: "Australia",
    };
  }, //data
    computed: {
    options: () => [
      "Australia",
      "Austria",
      "Azerbaijan",
      // "Belarus",
      "Belgium",
      "Brazil",
      "Bulgaria",
      "Cambodia",
      "Canada",
      "Colombia",
      "Costa Rica",
      "Croatia",
      "Cyprus",
      "Czech Republic",
      // "Congo, Dem. Rep.",
      // "Denmark",
      "Ecuador",
      "Egypt, Arab Rep.",
      "El Salvador",
      "Estonia",
      "Finland",
      "France",
      "Georgia",
      "Germany",
      // "Ghana",
      // "Guatemala",
      "Guyana",
      "Honduras",
      "Iceland",
      "Iraq",
      "Ireland",
      "Israel",
      "Japan",
      "Jordan",
      "Kazakhstan",
      "Latvia",
      "Lebanon",
      "Lithuania",
      "Luxembourg",
      "Mexico",
      "Mongolia",
      "Myanmar",
      "Nepal",
      "Netherlands",
      "New Zealand",
      "Norway",
      "Oman",
      "Pakistan",
      "Panama",
      "Paraguay",
      "Peru",
      "Philippines",
      "Poland",
      "Portugal",
      "Qatar",
      "Korea, Rep.",
      "Romania",
      "Singapore",
      "Slovak Republic",
      "Spain",
      "Sri Lanka",
      "Eswatini",
      "Sweden",
      "Switzerland",
      "Syrian Arab Republic",
      "Thailand",
      "Timor-Leste",
      "Turkey",
      "Ukraine",
      "United Kingdom",
      "Uruguay",
      "Venezuela, RB",
      "Vietnam",
      "United States",
    ],
  },
  methods: {
      onChange() {
          
          console.log("call onChange");
          let selectedCountry = this.selected;
        const selectCountry = this.data.filter(([key]) => key == selectedCountry); // this is the ARRAY          
          
          let newMin = d3.min(selectCountry, d => d.Value);
          let newMax = d3.max(selectCountry, d => d.Value);
          
          this.y.domain([newMin, newMax]);
          let yAxis = d3.axisLeft().scale(this.y);
          
          // REMOVE old Y-Axis
          d3.select("#yAxis").remove();
          
          // create NEW Y-axis
          this.svg
          .append("g")
          .attr("class", "axis")
          .attr("id", "yAxis").call(yAxis)
          .attr("font-size", "12px")
          .append("text") // y-axis Label
          .attr("id", "yAxisLabel")
          .attr("fill", "black")
          .attr("transform", "rotate(-90)")
          .attr("x", 0)
          .attr("y", 5)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Wages");
          
          // Select all of the grouped elements and update the data
          const selectCountryGroups = this.svg
          .selectAll(".countryGroups")
          .data(selectCountry);
          
          // Select all the lines and transition to new positions
          selectCountryGroups
          .selectAll("path.line")
          .data(([, values]) => values)
          .transition()
          .duration(600)
          .attr("d", (d) => this.valueLine(Array.from(d.values())[1]));
    }, // onChange

    lineChart(data) {
        console.log(data);
        //data = data.filter(d => d.Country == selectCountry)

        const countryMenu = d3.select("#countryDropdown");

        const margin = { top: 50, right: 30, bottom: 150, left: 75 };
        const height = 700 - margin.top - margin.bottom; // height
        const width = 500 - margin.left - margin.right; // width

        const svg = d3.select(this.$refs.lchart)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

        const valueLine = d3.line()
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.Value); });

        this.valueLine = valueLine;

        //nest variable aka GROUP
        const nest = d3.nest()
            .key(d => d.country)
            .entries(data);

        this.nest = nest;
        console.log(nest);

        countryMenu
        .append("select")
        .selectAll("option")
        .data(nest)
        .enter()
        .append("option")
        .attr("value", d => d.key)
        .text(d => d.key);

        console.log( nest.key);

        //scale x axis 
        const x = d3.scaleTime()
        .domain(d3.extent(nest, d => d.Year))
        .range([0, width]);

        //scale y axis
        const y = d3.scaleLinear()
        .domain([d3.min(nest, d => d.Value) - .1, d3.max(nest, d => d.Value) + .1])
        .range([height, 0]);
        
        this.x = x;
        this.y = y;

    // Init graph
      const initialGraph = function (selected) {
        // Create AXES
        let xAxis = d3
          .axisBottom()
          .scale(x)
          .ticks(10)
          .tickFormat(d3.format("d"))
          .tickSize(7);
        let yAxis = d3.axisLeft().scale(y).tickSize(7);
        svg
          .append("g")
          .attr("class", "axis")
          .attr("id", "xAxis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
          .attr("font-size", "12px")
          .append("text") // X-axis Label
          .attr("id", "xAxisLabel")
          .attr("fill", "black")
          .attr("y", -10)
          .attr("x", width)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Year");
        
        // Y-axis
        svg
          .append("g")
          .attr("class", "axis")
          .attr("id", "yAxis")
          .call(yAxis)
          .attr("font-size", "12px")
          .append("text") // y-axis Label
          .attr("id", "yAxisLabel")
          .attr("fill", "black")
          .attr("transform", "rotate(-90)")
          .attr("x", 0)
          .attr("y", 5)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Wages");

        const selectCountry = nest.filter(d => d.key == selected);

        const selectCountryGroups = svg
          .selectAll(".countryGroups")
          .data(selectCountry, function (d) {
            return d ? d.key : this.key;
          })
          .enter()
          .append("g")
          .attr("class", "countryGroups");

        // color palette
        const color = d3.scaleOrdinal().range(["#e41a1c", "#377eb8"]);

        const initialPath = selectCountryGroups
          .selectAll(".line")
          .data(([, values]) => values)
          .enter()
          .append("path")
          .attr("fill", "none") // ADDED
          .attr("stroke", function (d) {
            return color(d[0]);
          })
          .attr("stroke-width", 2.5);

        initialPath
          .attr("d", (d) => valueLine(Array.from(d.values())[1]))
          .attr("class", "line");
      }; // initialGraph

      // Create initial graph
      // initialGraph("AUS")
      initialGraph("Australia");

    }, //linechart
  }, // methods
  mounted: function () {
    d3.csv("education/gpi.csv").then((data) => {
      this.lineChart(data);
      this.data = data;
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

#tsdiv {
  padding-left: 20%;
}
</style>
