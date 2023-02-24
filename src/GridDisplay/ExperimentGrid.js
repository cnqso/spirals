/** @format */

import { React, useState, useEffect, useRef } from "react";
import SquareGrid from "./SquareGrid";
import SquarePlot from "./SquarePlot";
import ManualInput from "./ManualInput";
import RangeInput from "./RangeInput";
import IconButton from "@mui/material/IconButton";
import { Locked, Unlocked, Plot, Grid } from "./icons";
import "./SquareGrid.css";

const blue = "#71C2A9";
const brown = "#573B2A";
const cream = "#F7E5AE";
const orange = "#DE731D";
const tan = "#EC9C26";
const red = "#75280f";
const baseColor = red;
const highlightColor = tan;


function isPrime(num) {
	if (num <= 1) return false;
	if (num === 2) return true;
  
	// storing the calculated value would be much 
	// better than calculating in each iteration
	var sqrt = Math.sqrt(num);
  
	for (var i = 2; i <= sqrt; i++) 
	  if (num % i === 0) return false;
	return true;
  }

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

function ExperimentGrid({ type }) {
	const [squares, setSquares] = useState(25);
	const [boundary, setBoundary] = useState(25);
	const [plotData, setPlotData] = useState([]);
	const [index, setIndex] = useState(0);
	const [locked, setLocked] = useState(true);
	const [plotMode, setPlotMode] = useState(0);
	const wh = Math.ceil(Math.sqrt(boundary));
	const origin = Math.floor((wh - 1) / 2);


	function newInput(input) {
		if (index !== -1) {
			return;
		}
		setBoundary(input);
		setSquares(input);
		setPlotData([]);
		setIndex(0);
	}

	function customConditional(num) {
		const exampleArray = [1, 1, 4];

		let fullStatement = 0;
		for (let i = 0; i < num; i++) {
			for (let j = 0; j < exampleArray.length; j++) {

				fullStatement += exampleArray[j] * (i ** j);
			}
		}
	}

	function iteratePrimeSquareSpiral(origin) {
        let iterations = Math.ceil(squares/5);
        if (squares < 5) {
            iterations = squares;
        }
        if (squares - index <= iterations) {
            iterations = squares - index;
        }

        for (let i = 0; i < iterations; i++) {
			if (isPrime(index + i)) {
            const [ix, iy] = mathSquareSpiral(index + i);
			const [x, y] = [ix + origin, iy + origin];
            drawSquare(y, x);
			}
        }
		setIndex(index + iterations);
	}

	function iterateLineSquareSpiral(origin) {
		const exampleArray = [1, 1, 4];

		let nextValue = 0;
		// Figure this out tomorrow

			
            const [ix, iy] = mathSquareSpiral(index + i);
			const [x, y] = [ix + origin, iy + origin];
            drawSquare(y, x);

		setIndex(index + );
	}



	useEffect(() => {
		if (plotMode === 0) {
			clearGrid();
		}
	}, [plotMode]);

	useEffect(() => {
		if (index === 0) {
			clearGrid();
		}
		if (index < squares && index >= 0) {
			iterateLineSquareSpiral(origin);
		} else {
			setIndex(-1);
		}
	}, [index]);

	const canvas = useRef(null);
	function drawSquare(x, y, color = highlightColor) {
        if (plotMode === 0) {
		const wh = Math.ceil(Math.sqrt(boundary));
		const squareSz = (1080 / wh) * 0.95;
		const padding = (1080 / wh) * 0.05;
		const yMirrorOffset = 1080 - squareSz; // Y is drawn top to bottom by default
		const ctx = canvas.current.getContext("2d");
		ctx.fillStyle = color;
		ctx.fillRect(
			yMirrorOffset - (y * (squareSz + padding) + padding / 2),
			x * (squareSz + padding) + padding / 2,
			squareSz,
			squareSz
		);
        }
	}

	function clearGrid() {
        if (plotMode === 0) {
		const wh = Math.ceil(Math.sqrt(boundary));
		const ctx = canvas.current.getContext("2d");
		ctx.clearRect(0, 0, 1080, 1080);
		ctx.fillStyle = baseColor;
		for (let i = 0; i < wh; i++) {
			for (let j = 0; j < wh; j++) {
				drawSquare(j, i, ctx.fillStyle);
			}
		}
    }
	}

	return (
		<div >
			{plotMode ? (
				<div className='BigSquareGrid'>
					<SquarePlot
						squarrayLength={Math.ceil(Math.sqrt(boundary))}
						plotData={plotData}
						index={index}
						origin={origin}
						linear={plotMode}
					/>
					<canvas ref={canvas} width={0} height={0} />
				</div>
			) : (
				<canvas className='BigSquareGrid' ref={canvas} width={1080} height={1080} />
			)}
			<br/><br/>
			<div className='bigGridControl'>
				<ManualInput newInput={newInput} squares={squares} index={index} />
			</div>
		</div>
	);
}

export default ExperimentGrid;
// "basis", "bundle", "cardinal", "catmullRom", "linear", "monotoneX", "monotoneY", "natural", "step", "stepAfter", "stepBefore"
