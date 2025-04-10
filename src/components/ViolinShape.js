import * as d3 from "d3";
import React, { useRef, useEffect } from "react";

function ViolinShape({ data, binNumber }) {

    let width = 200;
    let height = 50;

    let randId = Math.floor(Math.random() * 1000001);

    const margin = 7

    const xScale = d3
        .scaleLinear()
        .domain([0, 100])
        .range([margin, width - margin]);

    const binBuilder = d3
        .bin()
        .domain([0, 100])
        .thresholds(xScale.ticks(binNumber))
        .value((d) => d);

    const bins = binBuilder(data);

    const biggestBin = Math.max(...bins.map((b) => b.length));

    const yScale = d3
        .scaleLinear()
        .domain([-biggestBin, biggestBin])
        .range([0, height]);

    const areaBuilder = d3
        .area()
        .y0((d) => yScale(-d.length))
        .y1((d) => yScale(d.length))
        .x((d) => xScale(d.x0 || 0))
        .curve(d3.curveBumpY)

    const areaPath = areaBuilder(bins);

    const axesRef = useRef(null);
    const boundsWidth = width;
    const boundsHeight = height;

    useEffect(() => {
        const svgElement = d3.select(axesRef.current);
        svgElement.selectAll("*").remove();
        const xAxisGenerator = d3.axisBottom(xScale)
            .ticks(2)
            .tickFormat(d => d % 50 ? null : `${d}%`)

        svgElement
            .append("g")
            .attr("transform", `translate(0, ${boundsHeight / 2})`)
            .call(xAxisGenerator);

        /*
        const yAxisGenerator = d3.axisLeft(yScale)
            .ticks(2)
            .tickFormat(d => null)

        svgElement
            .append("g")
            .attr("transform", `translate(${margin}, 0)`)
            .call(yAxisGenerator);
        */

    }, [yScale, xScale, boundsHeight]);

    return (
        <svg id={randId} style={{ marginLeft: 10, width: boundsWidth + 10, height: boundsHeight }}>
            <path
                d={areaPath || undefined}
                opacity={1}
                stroke="#9a6fb0"
                fill="#9a6fb0"
                fillOpacity={0.1}
                strokeWidth={2}
            />
            <g
                width={boundsWidth}
                height={boundsHeight}
                ref={axesRef}
            />
        </svg>
    );
};

export default ViolinShape;
