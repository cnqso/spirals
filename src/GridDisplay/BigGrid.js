/** @format */

import { React, useState, useEffect } from "react";
import SquarePlot from "./SquarePlot";
import RangeInput from "./RangeInput";
import "./SquareGrid.css";


function mathSquareSpiral(n) {
	const lowerRoot = Math.floor(Math.sqrt(n));
	let anchor = lowerRoot ** 2;
	let location = [0, 0];
	//set location to the anchor point;
	if (lowerRoot % 2 === 0) {
		//if the number is even
		location = [lowerRoot / -2, lowerRoot / 2]; //set location to the anchor point
		location[1] -= Math.min(n - anchor, lowerRoot); //Move down for all remaining numbers up to the current side length
		location[0] += Math.max(n - anchor - lowerRoot, 0); //If there are squares remaining, move right
	} else {
		location = [(lowerRoot - 1) / 2 + 1, (lowerRoot - 1) / -2];
		location[1] += Math.min(n - anchor, lowerRoot); //Move up
		location[0] -= Math.max(n - anchor - lowerRoot, 0); //If there ar
	}
	return location;
}

function BigGrid({ type }) {
	const [squares, setSquares] = useState(10);
	const [boundary, setBoundary] = useState(144);
	const [plotData, setPlotData] = useState([]);
	const [index, setIndex] = useState(0);
	const wh = Math.ceil(Math.sqrt(boundary));
	const origin = Math.floor((wh - 1) / 2);

	function mssInput(quantity, maximum) {
		if (index !== -1 || quantity > 5000 || maximum > 10e28) {
			return;
		}
		setBoundary(maximum);
		setSquares(quantity);
		setPlotData([]);
		setIndex(0);
	}

	function iterateMathSquareSpiral(origin) {
        let iterations = squares/3;
        if (squares < 3) {
            iterations = squares;
        }
        if (squares - index <= iterations) {
            iterations = squares - index;
        }
        const tempPlotData = plotData;
        for (let i = 0; i < iterations; i++) {
            const randomN = Math.ceil(Math.random() * boundary);
            const [x, y] = mathSquareSpiral(randomN);
            tempPlotData.push({ n: randomN, x: x, y: y });
        }
		
		
		
		setPlotData(tempPlotData);
		setIndex(index + iterations);
	}

	useEffect(() => {
		if (index < squares && index >= 0) {
			iterateMathSquareSpiral();
		} else {
			setIndex(-1);
		}
	}, [index]);

	return (
		<div className="BigGrid">
				<SquarePlot
					squarrayLength={Math.ceil(Math.sqrt(boundary))}
					plotData={plotData}
					index={index}
					origin={origin}
					linear={1}
					padding = {40}
				/>

			
			<div className='bigGridControl'>
				<RangeInput newInput={mssInput} squares={squares} index={index} />
			</div>
		</div>
	);
}

export default BigGrid;
// "basis", "bundle", "cardinal", "catmullRom", "linear", "monotoneX", "monotoneY", "natural", "step", "stepAfter", "stepBefore"
