/** @format */

import { React, useState, useEffect, useRef } from "react";
import ManualInput from "./ManualInput";
import Button from "@mui/material/Button";
import "./SquareGrid.css";
import { BlockMath } from "react-katex";
import MathInput from "./MathInput";
import { Parser } from "expr-eval";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import themeOptions from "../themeOptions";

const baseColor = "#75280f";
const highlightColor = "#EC9C26";

const theme = createTheme(themeOptions);

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
	// Perfect squares are located sqrt(n) steps from the origin
	const lowerRoot = Math.floor(Math.sqrt(n));
	const anchor = lowerRoot ** 2;
	const location = [Math.floor(-lowerRoot / 2), Math.floor(lowerRoot / 2)];
	// If n is not a perfect square, adjust the y location by remaining steps
	// If remaining steps > current line length, continue on the x axis
	location[1] -= Math.min(n - anchor, lowerRoot);
	location[0] += Math.max(n - anchor - lowerRoot, 0);
	// If the lower-bound root length is odd, mirror the location
	if (lowerRoot % 2 !== 0) {
		return location.map((x) => -x);
	}
	return location;
}

function ExperimentGrid() {
	const [squares, setSquares] = useState(250);
	const [index, setIndex] = useState(0);
	const [formulaText, setFormulaText] = useState("4*n^2 - 4*n + 1");
	const [katexText, setKatexText] = useState("4n^2 - 4n + 1");
	const [primeMode, setPrimeMode] = useState(true);

	const formulaRef = useRef("");
	const wh = Math.ceil(Math.sqrt(squares));
	const origin = Math.floor((wh - 1) / 2);

	function togglePrime() {
		setPrimeMode(!primeMode);
	}

	function newInput(input) {
		try {
			// Hacky way of avoiding common bugs with this library
			const val = Parser.evaluate(formulaText, { n: 0 }) / 5;
			setSquares(input);
			setIndex(0);
		} catch (e) {
			// If we get a Parser bug, reset
			setIndex(-1);
		}
	}

	function updateFormula() {
		const input = formulaRef.current.value;
		try {
			// Hacky way of avoiding common bugs with this library
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
		} catch (e) {
			// If we get a Parser bug, reset
			setIndex(-1);
		}
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
				drawSquare(x, y, baseColor, "");
			}
		}
		setIndex(index + iterations);
	}

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
		if (index === 0) {
			clearGrid();
		}
		if (index < squares && index >= 0) {
			if (primeMode) {
				iteratePrimeSquareSpiral(origin);
			} else {
				iterateConditional(origin);
			}
		} else {
			console.log("done");
			setIndex(-1);
		}
	}, [index]);

	const canvas = useRef(null);
	function drawSquare(x, y, color, text) {
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
		if (text.length > 0 && squares < 15000) {
			ctx.fillStyle = "black";
			ctx.fillText(text, xCoord + leftOffset, yCoord + squareSz - bottomOffset, squareSz);
		}
	}

	function clearGrid() {
		const ctx = canvas.current.getContext("2d");
		ctx.clearRect(0, 0, 1080, 1080);
		ctx.fillStyle = baseColor;
		if (squares > 20000) {
			ctx.fillRect(0, 0, 1080, 1080);
		}
		for (let i = 0; i < wh; i++) {
			for (let j = 0; j < wh; j++) {
				drawSquare(j, i, baseColor, "");
			}
		}
	}

	return (
		<div>
			<canvas className='BigSquareGrid' ref={canvas} width={1080} height={1080} />
			<br />
			<br />
			<div className='bigGridControl'>
				<ThemeProvider theme={theme}>
					<Button variant='outlined' onClick={togglePrime} sx={{ margin: 1 }}>
						{primeMode ? "Ulam Spiral" : "Custom Pattern"}
					</Button>
					{primeMode ? (
						<ManualInput
							label='Squares'
							newInput={newInput}
							squares={squares}
							index={index}
							start={250}
						/>
					) : (
						<MathInput
							newInput={newInput}
							formulaRef={formulaRef}
							updateFormula={updateFormula}
						/>
					)}

					<div style={{ fontSize: "2em" }}>
						{primeMode ? (
							<>
								<br />
								<br />
								<br />
							</>
						) : (
							<BlockMath math={katexText} />
						)}
					</div>
				</ThemeProvider>
			</div>
		</div>
	);
}

export default ExperimentGrid;
// "basis", "bundle", "cardinal", "catmullRom", "linear", "monotoneX", "monotoneY", "natural", "step", "stepAfter", "stepBefore"
