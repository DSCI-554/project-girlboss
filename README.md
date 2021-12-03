# DSCI 554 Project

## Team

<!-- 🎒 Complete to include all the information requested. -->

Team name: *Team Girlboss*

Team members:

- Erin Szeto <erinszet@usc.edu>
- Erica Xia <ericaxia@usc.edu>
- Madeleine Thompson <mjt43250@usc.edu>
- Sarah Pursley <spursley@usc.edu>

## Artifacts

<!-- 🎒 Complete and ensure that all the links work! -->

- [Project proposal](https://docs.google.com/presentation/d/10bKIzyufguNpWEI1ctUmEc4_5Azgg6CX6jQvGCalh-4/edit?usp=sharing)
- Final presentation: [Transcript](presentation/TRANSCRIPT.md) | [slides](presentation/presentation.sozi.pdf)
- Paper: [Overleaf read-only link](https://www.overleaf.com/read/twcpxmqjtnvf) | [PDF](paper/paper.pdf)
- [Demo link](demo/vue-app/)
- Video [Transcript](video/TRANSCRIPT.md) | [YouTube link](https://youtu.be/fftbNES3kxg)


## Project Summary

Gender discrimination is an issue that has plagued modern economies, and although female participation in the workforce has been climbing, there are still many issues left to be addressed, especially outside of the US and in specific disciplines such as STEM. In this project, we create an interactive infographic that allows users to explore data documenting the gender gap in employment and in education. Visualizations in the infographic showcase information about the average female-to-male earnings ratio, gender wage gap, gender distribution by job sector, and more. The resulting website and infographic can be used by everyone curious about learning more about how this gender gap affects women across the world.

## Contributions

<!-- 🎒 Complete for each project member. -->

### Proposal presentation

[Erin Szeto](mailto:erinszet@usc.edu)

- With help of all team members, created slides
- Gave presentation in class

### Final presentation

[Madeleine Thompson](mailto:mjt43250@usc.edu)

- Prepared transcript and slides for final presentation
- Gave final presentation in class on 12/1/2021

### Paper

[Madeleine Thompson](mailto:mjt43250@usc.edu)

- Contributed to Abstract, Related Work, Data, Approach, System, and Conclusion sections
- Included screenshots of visualizations used in the demo and cited all relevant references

[Erin Szeto](mailto:erinszet@usc.edu)
- Wrote Introduction section and contributed to Abstract, Data, Approach, System, and Conclusion sections

[Erica Xia](mailto:ericaxia@usc.edu)
- Contributed to Related Work, Data, Approach, and System sections


### Demo

[Erin Szeto](mailto:erinszet@usc.edu)

- Animated and interactive d3 choropleth map using OECD gender wage gap, employment, and GDP data
- Created Vue app and formatted website with Bootstrap

[Erica Xia](mailto:ericaxia@usc.edu)

- Interactive responsive time series line chart using monthly wage data
- Aggregated static time series line chart of female-male earnings ratio
- Zoomable circle packing chart using employment data
- Contributed to Vue app development and formatting website with Bootstrap

[Madeleine Thompson](mailto:mjt43250@usc.edu)

- Interactive Mapbox map using median annual income data
- Contributed to Vue app formatting

[Sarah Pursley](mailto:spursley@usc.edu)

- Interactive bar chart using student enrollment data
- Line chart of gender parity indices with drop-down selection for country-specific views
- Interactive bubble chart using college majors and wage data
- Interactive radial bar chart using college major data

### Video

[Erin Szeto](mailto:erinszet@usc.edu)

- Wrote transcript and recorded video

# Visualizations created in the Demo

## Check-list of required visualizations

<!-- 🎒 Complete the table using ✅ or ❌. -->

| Requirement                            | Label        | Done |
| -------------------------------------- | ------------ | ---- |
| responsive d3 chart                    | responsive   | ✅   |
| interactive d3 chart                   | interactive  | ✅   |
| d3 chart with an animated transition   | animated     | ✅   |
| d3 layout                              | layout       | ✅   |
| d3 map                                 | map          | ✅   |
| Mapbox map                             | mapbox       | ✅   |

## Table of visualizations used by page

<!-- 🎒 Complete the table using the Label of the required visualizations. -->

| Page name | Chart description | Libraries used | Requirement label |
| --------- | ----------------- | -------------- | ----------------- |
| Employment page | line chart of gender disparity in wages         | d3   | d3 layout               |
| Employemnt page | circle packing chart    | d3   | layout             |
| Employment page | choropleth map on gender wage gap | d3, topojson | d3 map, animated transition  |
| Employment page | map of median annual income of US women | Mapbox | Mapbox map |
| Education page | bar chart of student enrollment | d3               |                   |
| Education page | line chart of education parity indices | d3               |                   |
| Education page | bubble chart of college majors & median salaries | d3               |                   |
| Education page | radial bar chart of college majors | d3               |                   |
| Explore page |   line chart of monthly wages by country      |       d3         |       responsive, interactive, animated            |
| Explore page | choropleth map on gender wage gap  | d3, topojson, d3-simple-slider | d3 map, interactive  |

## Summary table of visualization forms used

<!-- 🎒 Complete the table . -->

| Type             | Count |
| ---------------- | ----- |
| interactive maps | 3     |
| interactive line chart                 |   1    |
| static line chart                 |   1    |
|  circle packing chart                |   1    |
|                  |       |
|                  |       |
