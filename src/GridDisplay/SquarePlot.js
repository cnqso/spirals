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

const ScatterPlotEventHandlers = {
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
						return { text: `n: ${props.datum.o}, x: ${props.datum.x}, y: ${props.datum.y}` };
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

function SquarePlot({ squares, index, origin, linear }) {
	const maxima = squares.length / 2 - 1;
	const bounds = maxima + 2;
	const pointSize = 7
	const exampleList = [
		[1, 0, 1],
		[0, 1, 0],
		[0, 0, 0],
	];
	const plotPoints = [];
	for (let i = -1; i < squares.length ** 2; i++) {
		const [x, y] = fastSquareSpiral(i); //TODO: This is so inefficient it is funny. Determine at above level if possible, if not then switch to mathematical approach
		if (squares[y + origin][x + origin] === 1) {
			plotPoints.push({ o: i+1, x: x, y: y });
		}
	}

	return (
		
		<div className='SquareGrid'>
			<VictoryChart
				padding={{ top: 0, bottom: 0, left: 0, right: 0 }}
				theme={VictoryTheme.material}
				domain={{ x: [-bounds, bounds], y: [-bounds, bounds] }}>
				<VictoryAxis gridComponent={<></>}/>
						<VictoryAxis dependentAxis gridComponent={<></>}/>
				{linear - 1 ? (
					<VictoryScatter
						style={{ data: { fill: "#c43a31" } }}
						size={pointSize}
						data={plotPoints}
						labels={() => null}
						events={[ScatterPlotEventHandlers]}
					/>
				) : (
					<VictoryLine
						style={{
							data: { stroke: "#c43a31" },
							parent: { border: "5px solid #ccc" },
						}}
						// data={[{o: 0, x:0, y:0}, {o: 1,x:1, y:0}, {o: 3, x:1, y:1},{o: 4, x:0, y:1},{o: 5, x:-1, y:1},{o: 6, x:-1, y:0},{o: 7, x:-1, y:-1}]}
						data={plotPoints}
						sortKey='o'
					/>
				)}
			</VictoryChart>
		</div>
	);
}

export default SquarePlot;
// "basis", "bundle", "cardinal", "catmullRom", "linear", "monotoneX", "monotoneY", "natural", "step", "stepAfter", "stepBefore"
