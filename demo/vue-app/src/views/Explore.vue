<template>
  <div class="dashboard">
    <div class="container-fluid">
      <div class="row">
        <nav
          id="sidebarMenu"
          class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
        >
          <div class="sidebar-sticky pt-3">
            <ul class="nav flex-column">
              <b align="left">Explore</b>
              <hr />
              <li class="nav-item">
                <a class="nav-link active" align="left" href="/monthlywages">
                  Monthly Wages by Gender Over Time
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" align="left" href="/wagegap">
                  Gender Wage Gap Around the World
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <div
            class="
              d-flex
              justify-content-between
              flex-wrap flex-md-nowrap
              align-items-center
              pt-3
              pb-2
              mb-3
              border-bottom
            "
          >
            <h4>Visualizing the Gender Gap in Employment and Education</h4>
          </div>

          <!-- <TimeSeriesAggChart /> -->
          <TimeSeriesChart />
          <!-- <AnimatedMap /> -->
          <!-- <MapChart /> -->
          <!-- <CirclePackingChart /> -->
          <!-- <MapboxMap /> -->
        </main>
      </div>
    </div>
  </div>
</template>

<style>
.nav-link.active,
.nav-link:hover,
.nav-link:focus {
  color: #111;
}
</style>

<script>
// @ is an alias to /src
// import MapChart from "../components/MapChart";
// import AnimatedMap from "../components/AnimatedMap";
// import TimeSeriesAggChart from "../components/TimeSeriesAggChart";
import TimeSeriesChart from "../components/TimeSeriesChart";
// import CirclePackingChart from '../components/CirclePackingChart'
// import MapboxMap from "../components/MapboxMap";

export default {
  name: "dashboard",
  components: {
    // MapChart,
    // AnimatedMap,
    // TimeSeriesAggChart,
    TimeSeriesChart
    // CirclePackingChart,
    // MapboxMap
  }
};
</script>
