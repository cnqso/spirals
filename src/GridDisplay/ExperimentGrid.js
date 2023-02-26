/** @format */

import { React, useState, useEffect, useRef } from "react";
import SquareGrid from "./SquareGrid";
import SquarePlot from "./SquarePlot";
import ManualInput from "./ManualInput";
import RangeInput from "./RangeInput";
import IconButton from "@mui/material/IconButton";
import { Locked, Unlocked, Plot, Grid } from "./icons";
import "./SquareGrid.css";
import { InlineMath, BlockMath } from "react-katex";
import MathInput from "./MathInput";
import { Parser } from "expr-eval";

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

	for (var i = 2; i <= sqrt; i++) if (num % i === 0) return false;
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
	const [squares, setSquares] = useState(250);
	const [plotData, setPlotData] = useState([]);
	const [index, setIndex] = useState(0);
	const [conditionalIndex, setConditionalIndex] = useState(0);
	const [showText, setShowText] = useState(true);
	const [plotMode, setPlotMode] = useState(0);
	const [formulaText, setFormulaText] = useState("4*n^2 - 4*n + 1");
	const [katexText, setKatexText] = useState("4n^2 - 4n + 1");

	const formulaRef = useRef("");
	const wh = Math.ceil(Math.sqrt(squares));
	const origin = Math.floor((wh - 1) / 2);

	function newInput(input) {
		try {
			const val = Parser.evaluate(formulaText, { n: 0 }) / 5;
			setSquares(input);
			setConditionalIndex(0);
			setIndex(0);
		} catch (e) {setIndex(-1)}
	}
	function updateFormula() {
		const input = formulaRef.current.value;
		try {
			const val = Parser.evaluate(input, { n: 0 }) / 5;
			setFormulaText(input);

			let katexified = "";
			for (let i = 0; i < input.length; i++) {
				if (input[i] === "*") {
					if (input[i + 1] === "n") {
						i++;
					}
				}
					katexified += input[i];
			}
			setKatexText(katexified);

		} catch (e) {setIndex(-1)}
		//setFormulaArray();
	}

	function iteratePrimeSquareSpiral(origin) {
		let iterations = Math.ceil(squares / 5);
		if (squares < 5) {
			iterations = squares;
		}
		if (squares - index <= iterations) {
			iterations = squares - index;
		}

		for (let i = 0; i < iterations; i++) {
			const [ix, iy] = mathSquareSpiral(index + i);
			const [x, y] = [ix + origin, iy + origin];
			if (isPrime(index + i)) {
				drawSquare(x, y, highlightColor, `${index + i}`);
			} else {
				drawSquare(x, y, blue, "");
			}
		}
		setIndex(index + iterations);
	}
	//todo: ban operations like sqrt from the parser and determine if I want to set any harder limits
	function iterateConditional(origin) {
		let n = 0;
		for (let i = 0; i < squares; i++) {
			
			const fullStatement = Parser.evaluate(formulaText, { n: n });
			if (fullStatement > squares) {
				setIndex(-1);
				return;
			}
			const [ix, iy] = mathSquareSpiral(fullStatement);
			const [x, y] = [ix + origin, iy + origin];
			drawSquare(x, y, highlightColor, `${fullStatement}`);
			n++;
		}
		setIndex(-1);
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
			iterateConditional(origin);
		} else {
			console.log("done");
			setIndex(-1);
		}
	}, [index]);

	const canvas = useRef(null);
	function drawSquare(x, y, color, text) {
		if (plotMode === 0) {
			const wh = Math.ceil(Math.sqrt(squares));
			const squareSz = (1080 / wh) * 0.95;
			const padding = (1080 / wh) * 0.05;
			const yMirrorOffset = 1080 - squareSz;
			const xCoord = x * (squareSz + padding) + padding / 2;
			const yCoord = yMirrorOffset - (y * (squareSz + padding) + padding / 2);
			const ctx = canvas.current.getContext("2d");
			ctx.fillStyle = color;
			const fontSize = squareSz - (squareSz * text.length) / 10;
			const bottomOffset = (text.length + 1) * (squareSz / 15);
			const leftOffset = Math.max(0, (3 - text.length) * (squareSz / 7));
			ctx.font = `${fontSize}px serif`;

			ctx.fillRect(
				xCoord,
				yCoord,

				squareSz,
				squareSz
			);
			if (showText && text.length > 0) ctx.fillStyle = "black";
			ctx.fillText(text, xCoord + leftOffset, yCoord + squareSz - bottomOffset, squareSz);
		}
	}

	function clearGrid() {
		if (plotMode === 0) {
			const wh = Math.ceil(Math.sqrt(squares));
			const ctx = canvas.current.getContext("2d");
			ctx.clearRect(0, 0, 1080, 1080);
			for (let i = 0; i < wh; i++) {
				for (let j = 0; j < wh; j++) {
					drawSquare(j, i, baseColor, "");
				}
			}
		}
	}

	return (
		<div>
			{plotMode ? (
				<div className='BigSquareGrid'>
					<SquarePlot
						squarrayLength={Math.ceil(Math.sqrt(squares))}
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
			<br />
			<br />
			<div className='bigGridControl'>
				<ManualInput newInput={newInput} squares={squares} index={index} start={250} />
				<MathInput formulaRef={formulaRef} updateFormula={updateFormula} />
				<BlockMath math={katexText} />
			</div>
		</div>
	);
}

export default ExperimentGrid;
// "basis", "bundle", "cardinal", "catmullRom", "linear", "monotoneX", "monotoneY", "natural", "step", "stepAfter", "stepBefore"
