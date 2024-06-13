import React, { useEffect } from "react";
import * as d3 from "d3";

function BarChart({ elementId, data, width, height }) {
    useEffect(() => {
        drawChart();
    }, [data]); // Depend on data prop

    const drawChart = () => {
        // Remove the old svg
        d3.select(`#${elementId}`).select("svg").remove();

        // Create scale functions
        const xScale = d3.scaleBand()
            .domain(data.map((_, i) => i))
            .range([0, width])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([height, 0]);

        // Create the SVG canvas
        const svg = d3.select(`#${elementId}`)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // Draw bars
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (_, i) => xScale(i))
            .attr("y", d => yScale(d))
            .attr("width", xScale.bandwidth())
            .attr("height", d => height - yScale(d))
            .attr("fill", "green");

        // Draw labels
        svg.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .text(d => d)
            .attr("x", (_, i) => xScale(i) + xScale.bandwidth() / 2)
            .attr("y", d => yScale(d) - 2)
            .attr("text-anchor", "middle")
            .attr("font-size", "10px");
    }

    return (
        <div id={elementId}></div>
    );
}

export default BarChart;
