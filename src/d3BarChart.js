import React, { Component } from "react";
import "./App.css";
import * as d3 from "d3";
import Button from "@material-ui/core/Button";
class BarChart extends Component {
  constructor(props) {
    super(props);
    this.createBarChart = this.createBarChart.bind(this);
  }
  componentDidMount() {
    this.createBarChart();
  }
  componentDidUpdate() {
    this.createBarChart();
  }
  createBarChart() {
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv(
      "https://raw.githubusercontent.com/yw-zhou/FocusPocus/master/src/sampleData.csv",
      function (d) {
        console.log(d);
        return {
          Date: d.Date,
          PCount: JSON.parse(d.PCount),
          DCount: JSON.parse(d.DCount),
        };
      }
    ).then(function (data) {
      // X axis
      console.log(data);

      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Date;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 40]).range([height, 0]);

      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Date);
        })
        .attr("y", function (d) {
          return y(d.PCount);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.PCount);
        })
        .attr("fill", "#69b3a2");
      this.setState({ data, y });
    });
  }
  handleUpdate(selectedVar) {}
  render() {
    return (
      <div>
        <div id="my_dataviz"></div>
        <Button variant="contained">Default</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleUpdate("PCount")}
        >
          Productivity
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.handleUpdate("DCount")}
        >
          Distraction
        </Button>
      </div>
    );
  }
}
export default BarChart;
