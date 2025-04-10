import * as d3 from "d3";
import React, { useRef, useEffect } from "react";

function ViolinShape({ data, binNumber }) {

    let width = 200;
    let height = 50;

    const yScale = d3
        .scaleLinear()
        .domain([0, 100])
        .range([0, width]);

    const binBuilder = d3
        .bin()
        .domain([0, 100])
        .thresholds(yScale.ticks(binNumber))
        .value((d) => d);

    const bins = binBuilder(data);

    const biggestBin = Math.max(...bins.map((b) => b.length));

    const wScale = d3
        .scaleLinear()
        .domain([-biggestBin, biggestBin])
        .range([0, height]);

    const areaBuilder = d3
        .area()
        .y0((d) => wScale(-d.length))
        .y1((d) => wScale(d.length))
        .x((d) => yScale(d.x0 || 0))
        .curve(d3.curveBumpY)

    const areaPath = areaBuilder(bins);

    const axesRef = useRef(null);
    const boundsWidth = width;
    const boundsHeight = height;

    useEffect(() => {
        const svgElement = d3.select(axesRef.current);
        svgElement.selectAll("*").remove();
        const xAxisGenerator = d3.axisBottom(yScale);
        svgElement
            .append("g")
            .attr("transform", "translate(0," + boundsHeight + ")")
            .call(xAxisGenerator);

        const yAxisGenerator = d3.axisLeft(wScale);
        svgElement.append("g").call(yAxisGenerator);
    }, [wScale, yScale, boundsHeight]);

    return (
        <>
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
                transform={`translate(20, 0)`}
            />
        </>
    );
};

export default ViolinShape;
