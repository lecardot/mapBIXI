import * as d3 from "d3";
import React, { useRef, useEffect } from "react";

function ViolinShape({ main_data, data, binNumber }) {

    const width = 200;
    const height = 50;
    const margin = 7

    let randId = Math.floor(Math.random() * 1000001);

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

    const lineBuilder = d3.line()
        .x((d) => xScale(d.x))
        .y((d) => yScale(d.y));

    const linePath = lineBuilder([
        { x: main_data, y: - height },
        { x: main_data, y: height }
    ]);

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

        var lg = svgElement.append("defs")
            .append("linearGradient")
            .attr("id", "red2green")
            .attr("x1", "0%")
            .attr("x2", "100%")
            .attr("y1", "0%")
            .attr("y2", "0%")

        lg.append("stop")
            .attr("offset", "0%")
            .style("stop-color", "red")

        lg.append("stop")
            .attr("offset", "50%")
            .style("stop-color", "orange")

        lg.append("stop")
            .attr("offset", "100%")
            .style("stop-color", "green")

    }, [yScale, xScale, boundsHeight]);

    return (
        <svg id={randId} style={{ marginLeft: 10, width: boundsWidth + 10, height: boundsHeight }}>
            <path
                d={areaPath || undefined}
                stroke="black"
                fill="url(#red2green)"
                fillOpacity={0.9}
                strokeWidth={1}
            />
            {main_data ?
                <path
                    d={linePath}
                    stroke="black"
                    fill="none"
                    strokeWidth={2}
                /> :
                <></>
            }
            <g
                width={boundsWidth}
                height={boundsHeight}
                ref={axesRef}
            />
        </svg>
    );
};

export default ViolinShape;
