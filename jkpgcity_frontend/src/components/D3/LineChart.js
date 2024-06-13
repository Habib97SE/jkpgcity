import React, { useEffect } from "react";
import * as d3 from "d3";

function LineChart({ elementId, data, width, height, backgroundColor = "lightgrey", foregroundColor = "blue" }) {
    useEffect(() => {
        drawChart();
    }, [data]); // Depend on data prop

    const drawChart = () => {

        const margin = { top: 20, right: 30, bottom: 40, left: 50 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

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

        // Set the background color
        svg.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill", backgroundColor);

        // Draw line
        const line = d3.line()
            .x((_, i) => xScale(i) + xScale.bandwidth() / 2)
            .y(d => yScale(d));

        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", foregroundColor) // Set custom foreground color
            .attr("stroke-width", 2)
            .attr("d", line);

        // Draw x-axis
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale));

        // Draw y-axis
        svg.append("g")
            .call(d3.axisLeft(yScale));

        // Y-axis title
        svg.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 20)
            .attr("x", -margin.top)
            .text("Y-axis Title");

        // X-axis title
        svg.append("text")
            .attr("text-anchor", "end")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .text("X-axis Title");
    }

    // Style for the div container
    const chartStyle = {
        backgroundColor: backgroundColor, // Set custom background color for the container
    };

    return (
        <div id={elementId} style={chartStyle}></div>
    );
}

export default LineChart;
