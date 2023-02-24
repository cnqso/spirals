/** @format */

import { React, useState, useRef } from "react";
import { VictoryChart, VictoryScatter, VictoryLine, VictoryTheme, VictoryAxis } from "victory";

function fastSquareSpiral(n) {
	let dir = 1;
	let loc = [0, 0];
	let len = 1;
	let runi = 1;
	let i = 0;
	while (true) {
		for (let k = 0; k < 2; k++) {
			runi = len + i;
			while (i < runi) {
				if (n < i) {
					return loc;
				}
				loc[k] += dir;
				i++;
			}
		}
		len++;
		dir = ~dir + 1;
	}
}



function SquarePlot({ squarrayLength, plotData, origin, linear, index, padding = 0 }) {
	const maxima = squarrayLength / 2 - 1;
	const bounds = maxima + 2;
	const pointSize = 3;
	const exampleList = [
		[1, 0, 1],
		[0, 1, 0],
		[0, 0, 0],
	];

	const ScatterPlotEventHandlers = plotData.length > 501 ? {} : {
		target: "data",
		eventHandlers: {
			onMouseOver: () => {
				return [
					{
						target: "data",
						mutation: (props) => {
							return { style: { fill: "black" } };
						},
					},
					{
						target: "labels",
						mutation: (props) => {
							return { text: `n: ${props.datum.n}, x: ${props.datum.x}, y: ${props.datum.y}` };
						},
					},
				];
			},
			onMouseOut: () => {
				return [
					{
						target: "data",
						mutation: (props) => {
							const fill = props.style && props.style.fill;
							return null;
						},
					},
					{
						target: "labels",
						mutation: (props) => {
							return null;
						},
					},
				];
			},
		},
	};

	return (
		
			<VictoryChart
				padding={{ top: padding/2, bottom: padding/2, left: padding, right: padding}}
				theme={VictoryTheme.material}
				domain={{ x: [-bounds, bounds], y: [-bounds, bounds] }}>
				<VictoryAxis gridComponent={<></>} />
				<VictoryAxis dependentAxis gridComponent={<></>} />
				{linear - 1 ? (
					<VictoryLine
						style={{
							data: { stroke: "#c43a31" },
							parent: { border: "5px solid #ccc" },
						}}
						// data={[{n: 0, x:0, y:0}, {n: 1,x:1, y:0}, {n: 3, x:1, y:1},{n: 4, x:0, y:1},{n: 5, x:-1, y:1},{n: 6, x:-1, y:0},{n: 7, x:-1, y:-1}]}
						sortKey='n'
						data={plotData}
						labels={() => null}
						
					/>
				) : (
					<VictoryScatter
						style={{ data: { fill: "#c43a31" }, labels: {fontSize: 7}}}
						size={pointSize}
						data={plotData}
						labels={() => null}
						events={[ScatterPlotEventHandlers]}
					/>
				)}
			</VictoryChart>
	);
}

export default SquarePlot;
// "basis", "bundle", "cardinal", "catmullRom", "linear", "monotoneX", "monotoneY", "natural", "step", "stepAfter", "stepBefore"
