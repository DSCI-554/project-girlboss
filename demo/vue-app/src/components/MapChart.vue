<template>
  <div>
    <h1>Gender Wage Gap Around the World</h1>
    <!-- USE ref=, not id= -->
    <!-- <div ref="chart"></div> -->
    <div class="col-sm-2"><p style="text-align:center" id="value-time"></p></div>
    <b-form-select id="#select" v-model="selected" :options="options" @change="onChange($event)"></b-form-select>
    <!-- <select v-model="selected" id="selectButton"> -->
      <!-- <option value="Gender wage gap at median">Gender wage gap at median</option>
      <option value="Gender wage gap at 9th decile (top)">Gender wage gap at 9th decile (top)</option>
      <option value="Gender wage gap at 1st decile (bottom)">Gender wage gap at 1st decile (bottom)</option> -->
    <!-- </select> -->
    <div id="div_template"></div>
    <div class="container">
        <div class="col">
            <svg id="chart" style="background-color: white"></svg>
            <div class="row align-items-center">
                <div class="col-sm"><div id="slider-time"></div></div>
            </div>
        </div>
        <div class="col">
            <div class="tooltip" style="opacity: 0; text-align:left;"></div>
            <!-- <span id="info"></span> -->
        </div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import * as topojson from "topojson-client";
export default {
  name: "MapChart",
  // ADD D3 CODE HERE, use refs instead of id, for example:
  // var svg = d3
  // .select(this.$refs.tschart)
  data () {
    return {
      selected: 'Gender wage gap at median',
      options: [
        { value: 'Gender wage gap at median', text: 'Gender wage gap at median' },
        { value: 'Gender wage gap at 9th decile (top)', text: 'Gender wage gap at 9th decile (top)' },
        { value: 'Gender wage gap at 1st decile (bottom)', text: 'Gender wage gap at 1st decile (bottom)'}
      ]
    }
  },
  methods: {
    onChange() {
      var sliderValue = '2019';
      var select = this.selected;
      var update_data = this.data.filter(function(row){
          var time = row['Time'];
          var indicator = row['Indicator'];
          return time === sliderValue &&  indicator === select;
      });

      update_data = new Map(update_data.map((d) => [d.id, +d.Value]));

      d3.selectAll('.country')
          .data(topojson.feature(this.world, this.world.objects.countries).features)
          .attr("fill", d => ((typeof(update_data.get(d.id)) == "undefined") ? '#ccc' : this.color(update_data.get(d.id))))
          .text(d => `Country: ${d.properties.name} OECD Gender Wage Gap: ${update_data.get(d.id)}`);

      var display_data = this.data.filter(function(row) {
          var indicator = row['Indicator'];
          return indicator === select;
      });

      this.display_data = display_data;
    },
    mapChart() {
      var margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 975 - margin.left - margin.right,
        height = 610 - margin.top - margin.bottom;

      var world = this.values[0];
      this.world = world;
      var data = this.values[1];
      this.data = data;

      var max = d3.max(this.combineWageGapData(data), function(d) { return Math.round(+d.Value,2); });
      var min = d3.min(this.combineWageGapData(data), function(d) { return Math.round(+d.Value,2); });

      var default_data = data.filter(function(row){
        var time = +row['Time'];
        var indicator = row['Indicator'];
        return time === 2019 && indicator === 'Gender wage gap at median';
      });
      default_data = new Map(default_data.map((d) => [d.id, +d.Value]));
      //default_data.title = "Gender Wage Gap (2019)";

      var display_data = data.filter(function(row){
        var indicator = row['Indicator'];
        return indicator === 'Gender wage gap at median';
      });

      var json = topojson.feature(world, world.objects.countries);
      var color = d3.scaleQuantize([min, max], d3.schemeYlOrRd[8]);
      this.color = color;

      var dataTime = [2000,2005,2010,2015,2016,2017,2018,2019].map(function(d) {
        return new Date(d,10,3);
      });
      var sliderValue = d3.timeFormat('%Y')(dataTime[0]);
      this.sliderValue = sliderValue;

      var svg = d3.select('#chart')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

      var projection = d3.geoEquirectangular()
        .fitSize([width, height], json);

      var path = d3.geoPath()
        .projection(projection);

      svg.append("g")
        .attr("transform", "translate(600,20)")
        .append(() => this.legend({ color, title: 'OECD Gender Wage Gap', width: 260 }));
      console.log('svg');

      var div = d3.select(".tooltip");
      var country;
      var country_id;

      svg.append("g")
        .selectAll("path")
        .data(topojson.feature(world, world.objects.countries).features)  //🎒 explain: topojson.feature converts us counties features TopoJSON to GeoJSON
        .join("path")
        .attr("fill", d => ((typeof(default_data.get(d.id)) == "undefined") ? '#ccc' : color(default_data.get(d.id))))
        .attr("d", path)
        .attr("class", 'country')
        .on("mouseover", function() {
            svg.select('.selected')
                .classed('selected', false);
            d3.select(this)
                .classed('selected', true);		
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            country = this.__data__.properties.name;
            country_id = this.__data__.id;
            div.html(obtainStats(sliderValue, country_id, country, data));
            })					
        .on("mouseout", function() {
            // svg.select('.selected')
            //     .classed('selected', false);
            d3.select(this)
                .classed('selected', false);			
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	
        });

      svg.append("path")
        .datum(topojson.mesh(world, world.objects.countries, (a, b) => a !== b))
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-linejoin", "round")
        .attr("d", path);

      var sliderTime = d3
        .sliderHorizontal()
        .min(d3.min(dataTime))
        .max(d3.max(dataTime))
        .width(925)
        .displayValue(false)
        .on('onchange', val => {
            d3.select('p#value-time').text("OECD Gender Wage Gap on Year "+d3.timeFormat('%Y')(val));
            this.updateTimeframe(display_data, d3.timeFormat('%Y')(val), world, color);
            sliderValue = d3.timeFormat('%Y')(val);
            this.sliderValue = sliderValue;
      });

      sliderTime.tickValues(dataTime)
        .marks(dataTime)
        .tickFormat(d3.timeFormat('%Y'));

      var gTime = d3
        .select('div#slider-time')
        .append('svg')
        .attr('width', 975)
        .attr('height', 100)
        .append('g')
        .attr('transform', 'translate(30,30)');

      gTime.call(sliderTime);

      d3.select('p#value-time').text("OECD Gender Wage Gap on Year "+d3.timeFormat('%Y')(sliderTime.value()));

      var allGroup = ['Gender wage gap at median', 'Gender wage gap at 9th decile (top)', 'Gender wage gap at 1st decile (bottom)'];
        // add the options to the button
      d3.select("#selectButton")
          .selectAll('option')
          .data(allGroup)
          .enter()
          .append('option')
          .text(function (d) { return d; }) // text showed in the menu
          .attr("value", function (d) { return d; }); // corresponding value returned by the button

      // d3.select("#selectButton").on("change", function() {
      //         // recover the option that has been chosen
      //         var selectedOption = d3.select(this).property("value");
      //         // run the updateChart function with this selected option
      //         display_data = this.updateMapData(selectedOption, sliderValue, data, world, color);
      // });

      d3.select("#select").on("change", function() {
              // recover the option that has been chosen
              var selectedOption = d3.select(this).property("value");
              this.selectedOption = selectedOption;
              // run the updateChart function with this selected option
              display_data = this.updateMapData(selectedOption, sliderValue, data, world, color);
      });

      function obtainStats(sliderValue, country_id, country, data) {
        var update_data = data.filter(function(row){
            var time = row['Time'];
            var id = row['id'];
            var indicator = row['Indicator'];
            return time === sliderValue & id === country_id & indicator !== 'Gender wage gap at median' & indicator !== 'Gender wage gap at 9th decile (top)' & indicator !== 'Gender wage gap at 1st decile (bottom)';
        });

        var tooltip = `<b>Country</b>: ${country}`;

        update_data.forEach(function(row) {
            var indicator = row['Indicator'];
            var value = row['Value'];
            tooltip = tooltip + `<br/><b>${indicator}</b>: ${value}`
        });

        return tooltip;
      }
    },
    combineWageGapData(data) {
      var wagegap_data = data.filter(function(row){
        var indicator = row['Indicator'];
        return indicator === 'Gender wage gap at median' || indicator === 'Gender wage gap at 1st decile (bottom)' || indicator === 'Gender wage gap at 9th decile (top)';
      });
      return wagegap_data;
    },
    obtainStats(sliderValue, country_id, country, data) {
      var update_data = data.filter(function(row){
          var time = row['Time'];
          var id = row['id'];
          var indicator = row['Indicator'];
          return time === sliderValue & id === country_id & indicator !== 'Gender wage gap at median' & indicator !== 'Gender wage gap at 9th decile (top)' & indicator !== 'Gender wage gap at 1st decile (bottom)';
      });

      var tooltip = `<b>Country</b>: ${country}`;

      update_data.forEach(function(row) {
          var indicator = row['Indicator'];
          var value = row['Value'];
          tooltip = tooltip + `<br/><b>${indicator}</b>: ${value}`
      });

      return tooltip;
    },
    updateMapData(selectedOption, sliderValue, data, world, color) {
      var update_data = data.filter(function(row){
          var time = row['Time'];
          var indicator = row['Indicator'];
          return time === sliderValue &&  indicator === selectedOption;
      });

      update_data = new Map(update_data.map((d) => [d.id, +d.Value]));

      d3.selectAll('.country')
          .data(topojson.feature(world, world.objects.countries).features)
          .attr("fill", d => ((typeof(update_data.get(d.id)) == "undefined") ? '#ccc' : color(update_data.get(d.id))))
          .text(d => `Country: ${d.properties.name} OECD Gender Wage Gap: ${update_data.get(d.id)}`);

      var display_data = data.filter(function(row) {
          var indicator = row['Indicator'];
          return indicator === selectedOption;
      });

      return display_data;
    },
    updateTimeframe(data, sliderValue, world, color) {
      var update_data = data.filter(function(row){
          var time = row['Time'];
          return time === sliderValue;
      });

      update_data = new Map(update_data.map((d) => [d.id, +d.Value]));

      d3.selectAll('.country')
          .data(topojson.feature(world, world.objects.countries).features)
          .attr("fill", d => ((typeof(update_data.get(d.id)) == "undefined") ? '#ccc' : color(update_data.get(d.id))))
          .text(d => `Country: ${d.properties.name} OECD Gender Wage Gap: ${update_data.get(d.id)}`);
    },
    legend({
        color,
        title,
        tickSize = 6,
        width = 320,
        height = 44 + tickSize,
        marginTop = 18,
        marginRight = 0,
        marginBottom = 16 + tickSize,
        marginLeft = 0,
        ticks = width / 64,
        tickFormat,
        tickValues}
        = {}) {  //🎒 explain: define legend function with parameters color, title, tickSize...

        const svg = d3.create("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])
            .style("overflow", "visible")
            .style("display", "block");

        let x;

        // Continuous
        if (color.interpolator) {
            x = Object.assign(color.copy()
                .interpolator(d3.interpolateRound(marginLeft, width - marginRight)),
                { range() { return [marginLeft, width - marginRight]; } });

            svg.append("image")
                .attr("x", marginLeft)
                .attr("y", marginTop)
                .attr("width", width - marginLeft - marginRight)
                .attr("height", height - marginTop - marginBottom)
                .attr("preserveAspectRatio", "none")
                .attr("xlink:href", this.ramp(color.interpolator()).toDataURL());

            //scaleSequentialQuantile doesn’t implement ticks or tickFormat.
            if (x.ticks) {
                if (tickValues === undefined) {
                    const n = Math.round(ticks + 1);
                    tickValues = d3.range(n).map(i => d3.quantile(color.domain(), i / (n - 1)));
                    //console.log(tickValues);
                    //console.log(ticks);
                }
                if (typeof tickFormat !== "function") {
                    tickFormat = d3.format(tickFormat === undefined ? ",f" : tickFormat);
                }
            }
        }

        //discrete
        else if (color.invertExtent) {
            const thresholds
                = color.thresholds ? color.thresholds() // scaleQuantize
                    : color.quantiles ? color.quantiles() // scaleQuantile
                        : color.domain(); // scaleThreshold

            const thresholdFormat
                = tickFormat === undefined ? d => d
                    : typeof tickFormat === "string" ? d3.format(tickFormat)
                        : tickFormat;

            x = d3.scaleLinear()
                .domain([-1, color.range().length - 1])
                .rangeRound([marginLeft, width - marginRight]);

            svg.append("g")
                .selectAll("rect")
                .data(color.range())
                .join("rect")
                .attr("x", (d, i) => x(i - 1))
                .attr("y", marginTop)
                .attr("width", (d, i) => x(i) - x(i - 1))
                .attr("height", height - marginTop - marginBottom)
                .attr("fill", d => d);

            tickValues = d3.range(thresholds.length);
            // tickValues.map(function(e) { return Math.round(e,2)});
            // console.log(tickValues);
            tickFormat = i => thresholdFormat(thresholds[i], i);
        }

        svg.append("g")
            .attr("transform", `translate(0, ${height - marginBottom})`)
            .call(d3.axisBottom(x)
                .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
                .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
                .tickSize(tickSize)
                .tickValues(tickValues))
            .call(g => g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height))
            .call(g => g.select(".domain").remove())
            .call(g => g.append("text")
                .attr("y", marginTop + marginBottom - height - 6)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .attr("font-weight", "bold")
                .text(title));

        return svg.node();
    },
    lineChart(data) {
      // console.log("call line chart");
      // console.log(data);
      // Ex from: https://www.d3-graph-gallery.com/graph/line_basic.html

      var margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 975 - margin.left - margin.right,
        height = 610 - margin.top - margin.bottom;

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
    ramp(color, n = 256) {
      const canvas = document.getElementById("canvas");
      //const canvas = DOM.canvas(n, 1);
      const context = canvas.getContext("2d");
      // d3.select(canvas).attr("width", n)
      // .attr("height", 1);
      for (let i = 0; i < n; ++i) {
          context.fillStyle = color(i / (n - 1));
          context.fillRect(i, 0, 1, 1);
      }
      return canvas;
    }
  },
  mounted: function () {
    let recaptchaScript = document.createElement('script');
    recaptchaScript.setAttribute('src', 'https://unpkg.com/d3-simple-slider');
    document.head.appendChild(recaptchaScript);

    // recaptchaScript = document.createElement('script');
    // recaptchaScript.setAttribute('src', '../../node_modules/topojson/dist/topojson.min.js');
    // document.head.appendChild(recaptchaScript);

    console.log("mounted Map Chart component");

    var promises = [];
    var world_file = 'gendergap/countries-110m.json';
    var data_file = 'gendergap/oecd_data.csv';

    promises.push(d3.json(world_file));
    promises.push(d3.csv(data_file));

    Promise.all(promises).then( data => {
      this.values = data;
      this.mapChart();
    });
    // d3.csv(
    //   "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",
    //   (d) => {
    //     return { date: d3.timeParse("%Y-%m-%d")(d.date), value: d.value };
    //   }
    // ).then((data) => {
    //   this.lineChart(data);
    // });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h3 {
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
} */
.container {
    display: flex; }

.col {
flex: 1; }

.selected {
fill: rgb(0, 132, 255);
}

div.tooltip {	
    position: absolute;			
    text-align: center;			
    width: 250px;					
    height: 100px;					
    padding: 2px;				
    font: 12px sans-serif;		
    background: lightsteelblue;	
    border: 0px;		
    border-radius: 8px;			
    pointer-events: none;			
}
</style>
