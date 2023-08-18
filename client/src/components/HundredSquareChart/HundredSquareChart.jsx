import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './HundredSquareChart.css';

const HundredSquareChart = ({ data }) => {
  
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 620;
    const height = 620;
    const waffleSize = 600;
    const padding = { x: 10, y: 10 };

    const totalPullRequests = data.reduce((acc, val) => acc + (typeof val === 'number' ? val : 0), 0);

    const svg = d3.select(svgRef.current)
      .style("cursor", "default")
      .attr("viewBox", [0, 0, width, height]);

    const g = svg.append("g")
      .attr("transform", `translate(${padding.x}, ${padding.y})`);

    const processedData = data.reduce((result, item, index) => {
      if (index % 2 === 0) {
        const trainee = item;
        const pullRequests = data[index + 1];
        const percentage = (pullRequests / totalPullRequests) * 100;
        result.push({ trainee, unroundedPercentage: percentage, roundedPercentage: Math.round(percentage), pullRequests });
      }
      return result;
    }, []);

    // Round percentages
    let remainingSquares = 100;
    processedData.forEach((d, i) => {
      if (i === processedData.length - 1) {
        d.roundedPercentage = remainingSquares; // Leaves the last person with remaining squares
      } else {
        const roundedPercentage = Math.round(d.roundedPercentage);
        d.roundedPercentage = roundedPercentage;
        remainingSquares -= roundedPercentage;
      }
    });

    const waffleData = [];
    processedData.forEach((d, i) => {
      const numSquares = d.roundedPercentage;
      for (let j = 0; j < numSquares; j++) {
        waffleData.push({ traineeIndex: i });
      }
    });

    const scale = d3.scaleBand()
      .domain(d3.range(10))
      .range([0, waffleSize])
      .padding(0.1);

    // Sequence of the colors used for the squares for each trainee
    const colorScale = d3.scaleOrdinal()
      .domain(d3.range(processedData.length))
      .range(["#cc0099", "#ff99ff", "#000099", "#3399ff", "#ff6600", "#ffcc99"]);

    const cells = g.selectAll("rect")
      .data(waffleData)
      .join("rect")
      .attr("x", (_, i) => scale(i % 10))
      .attr("y", (_, i) => scale(Math.floor(i / 10)))
      .attr("width", scale.bandwidth())
      .attr("height", scale.bandwidth())
      .attr("rx", 10) // Set the horizontal corner radius to 10 pixels
      .attr("ry", 10) // Set the vertical corner radius to 10 pixels
      .attr("fill", d => colorScale(d.traineeIndex));

    const tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("padding", "5px")
      .style("border", "1px solid #ddd")
      .style("border-radius", "3px")
      .style("font-size", "12px");

    cells.on("mouseover", function (event, d) {
        d3.select(this).attr("stroke", "white").attr("stroke-width", 2);
        // The next line defines the content (text) of the tooltip
        const tooltipText = `${processedData[d.traineeIndex]?.trainee}: ${processedData[d.traineeIndex]?.unroundedPercentage.toFixed(2)}% (Pull Requests: ${processedData[d.traineeIndex]?.pullRequests})`;
        tooltip.text(tooltipText).style("visibility", "visible");
      })
      .on("mousemove", function (event) {
        tooltip.style("top", event.pageY - 10 + "px").style("left", event.pageX + 10 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).attr("stroke", "none");
        tooltip.style("visibility", "hidden");
      });

  }, [data]);

  return (
    <div>
      <svg ref={svgRef} className="hundred-square-chart"></svg>
    </div>
  );
}

export default HundredSquareChart;