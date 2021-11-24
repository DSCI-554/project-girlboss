<template>
  <div id="tsdiv">
    <h1 align="left">Employment by Sector</h1>
    <b-row align-h="start">
      <b-col align-self="start" cols="8">
        <!-- <p align="left">
          Gender equality is crucial to economic growth and sustainable
          development, including equality in the workplace to work and provision
          of fair pay. Women still face significant barriers to work and access
          to decision-making roles and jobs all across the world.
        </p> -->
      </b-col>
    </b-row>

    <div ref="cpchart" align="center"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "CirclePackingChart",
  methods: {
    circlePackingChart(data) {
      console.log("call circle chart");
      console.log(data);

      const color = d3
        .scaleLinear()
        .domain([0, 5])
        .range(["rgb(255, 249, 243)", "rgb(233, 201, 22)"])
        .interpolate(d3.interpolateHcl);
      const pack = (data) =>
        d3.pack().size([932, 932]).padding(3)(
          d3
            .hierarchy(data)
            .sum((d) => d.value)
            .sort((a, b) => b.value - a.value)
        );

      const root = pack(data);
      let focus = root;
      let view;

      const svg = d3
        .select(this.$refs.cpchart)
        .attr("viewBox", `-${932 / 2} -${932 / 2} ${932} ${932}`)
        .style("display", "block")
        .style("margin", "0 -14px")
        .style("background", color(0))
        .style("cursor", "pointer")
        .on("click", (event) => zoom(event, root));

      // this.svg = svg;
      function colorCircles(d) {
        if (d.children) {
          return color(d.depth);
        } else {
          if (d.data.gender == "female") {
            return "#D291BC";
          } else {
            return "#A8B5E0";
          }
        } // else
      }

      const node = svg
        .append("g")
        .selectAll("circle")
        .data(root.descendants().slice(1))
        .join("circle")
        .attr("fill", (d) => colorCircles(d))
        .attr("pointer-events", (d) => (!d.children ? "none" : null))
        .on("mouseover", function () {
          d3.select(this).attr("stroke", "#000");
        })
        .on("mouseout", function () {
          d3.select(this).attr("stroke", null);
        })
        .on(
          "click",
          (event, d) => focus !== d && (zoom(event, d), event.stopPropagation())
        );

      function displayText(d) {
        // Don't display % for root nodes
        if (d.parent === root) {
          return d.data.name;
        } else {
          return d.data.name + ": " + Math.round(d.data.value) + "%";
        }
      }
      const label = svg
        .append("g")
        .attr("class", "zoom-font")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .selectAll("text")
        .data(root.descendants())
        .join("text")
        .style("fill-opacity", (d) => (d.parent === root ? 1 : 0))
        .style("display", (d) => (d.parent === root ? "inline" : "none"))
        .text((d) => displayText(d));

      zoomTo([root.x, root.y, root.r * 2]);

      function zoomTo(v) {
        const k = 932 / v[2];

        view = v;

        label.attr(
          "transform",
          (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`
        );
        node.attr(
          "transform",
          (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`
        );
        node.attr("r", (d) => d.r * k);
      }

      function zoom(event, d) {
        // const focus0 = focus;
        focus = d;
        const transition = svg
          .transition()
          .duration(event.altKey ? 7500 : 750)
          .tween("zoom", () => {
            const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
            return (t) => zoomTo(i(t));
          });
        label
          .filter(function (d) {
            return d.parent === focus || this.style.display === "inline";
          })
          .transition(transition)
          .style("fill-opacity", (d) => (d.parent === focus ? 1 : 0))
          .on("start", function (d) {
            if (d.parent === focus) this.style.display = "inline";
          })
          .on("end", function (d) {
            if (d.parent !== focus) this.style.display = "none";
          });
      }
      return svg.node();
    }, //circlepackingchart
  }, // methods

  mounted: function () {
    d3.json("wages/all_employment_data.json").then((data) => {
      this.circlePackingChart(data);
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
  padding-left: 10%;
}
</style>
