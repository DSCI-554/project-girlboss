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
              <li class="nav-item">
                <a class="nav-link active" href="/">
                  Gender Wage Gap Around the World
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/monthlywages">
                  Monthly Wages Time Series Chart
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Circle Packing Chart
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Mapbox Map
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Bar Chart
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
            <!-- <h1 class="h2">Dashboard</h1>-->
            <h4>Visualizing the Gender Gap in Employment and Education</h4> 
            <!-- <div class="btn-toolbar mb-2 mb-md-0">
              <div class="btn-group mr-2">
                <button type="button" class="btn btn-sm btn-outline-secondary">
                  Share
                </button>
                <button type="button" class="btn btn-sm btn-outline-secondary">
                  Export
                </button>
              </div>
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary dropdown-toggle"
              >
                <span data-feather="calendar"></span>
                This week
              </button>
            </div> -->
          </div>

        <MapChart />
        
        </main>
      </div>
    </div>
  </div>
</template>

<style>
/* .col,
.col-4,
.col-8 {
  background-color: #ccc;
  border: 0.5px solid black;
} */
</style>

<script>
// @ is an alias to /src
import MapChart from '../components/MapChart'

export default {
  name: 'dashboard',
  components: {
    MapChart
  }
}
</script>
