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
              <b>Employment</b>
              <hr>
              <li class="nav-item">
                <a class="nav-link active" href="/wagegap">
                  Gender Wage Gap Around the World
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/monthlywages">
                  Monthly Wages by Gender Over Time
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
              <br>
              <b>Education</b>
              <hr>
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
            <h4>Visualizing the Gender Gap in Employment and Education</h4> 
          </div>

        <MapChart />
        
        </main>
      </div>
    </div>
  </div>
</template>

<style>
.nav-link.active,
.nav-link:hover,
.nav-link:focus{
    color: #111;
}
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
