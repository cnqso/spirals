import { React } from "react";
import {
	VictoryChart,
	VictoryScatter,
	VictoryLine,
	VictoryTheme,
	VictoryAxis,
	VictoryPortal,
	VictoryLabel,
} from "victory";

function SquarePlot({ squarrayLength, plotData, origin, linear, index, padding = 0 }) {
	const maxima = squarrayLength / 2 - 1;
	const bounds = maxima + 2;
	const pointSize = 3;

	const ScatterPlotEventHandlers =
		plotData.length > 501
			? {}
			: {
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
									return {
										text: `n: ${props.datum.n},\n x: ${props.datum.x},\n y: ${props.datum.y}`,
									};
								},
							},
						];
					},
					onMouseOut: () => {
						return [
							{
								target: "data",
								mutation: (props) => {
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
			padding={{ top: padding / 2, bottom: padding / 2, left: padding, right: padding }}
			theme={VictoryTheme.material}
			domain={{ x: [-bounds, bounds], y: [-bounds, bounds] }}>
			<VictoryAxis
				gridComponent={<></>}
				tickFormat={(t) => (Math.abs(bounds) > 1e6 ? t.toExponential() : t)}
			/>
			<VictoryAxis
				dependentAxis
				gridComponent={<></>}
				tickFormat={(t) => (Math.abs(bounds) > 1e6 ? t.toExponential() : t)}
			/>
			{linear - 1 ? (
				<VictoryLine
					style={{
						data: { stroke: "#c43a31" },
						parent: { border: "5px solid #ccc" },
					}}
					sortKey='n'
					data={plotData}
					labels={() => null}
				/>
			) : (
				<VictoryScatter
					style={{ data: { fill: "#c43a31" }, labels: { fontSize: 10, fill: "black" } }}
					size={pointSize}
					data={plotData}
					labels={() => null}
					labelComponent={
						<VictoryPortal>
							<VictoryLabel />
						</VictoryPortal>
					}
					events={[ScatterPlotEventHandlers]}
				/>
			)}
		</VictoryChart>
	);
}

export default SquarePlot;