/** @format */

import { React, useState, useEffect } from "react";
import SquareGrid from "./SquareGrid";
import SquarePlot from "./SquarePlot";
import SliderInput from "./SliderInput";
import ManualInput from "./ManualInput";
import IconButton from "@mui/material/IconButton";
import { Locked, Unlocked, Plot, Grid } from "./icons";
import "./SquareGrid.css";

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

function lineSquareSpiral(n) {
	let loc = [0, 0];
	let len = 1;
	let i = 0;

	while (i < n) {
		if (n >= i + len * 2 + (len + 1) * 2) {
			i += len * 2 + (len + 1) * 2;
			loc[0] -= 1;
			loc[1] -= 1;
			len += 2;
			continue;
		}
		if (n === i) {
			return loc;
		}
		if (n <= i + len) {
			loc[0] += n - i;
			return loc;
		}
		loc[0] += len;
		i += len;
		if (n <= i + len) {
			loc[1] += n - i;
			return loc;
		}
		loc[1] += len;
		i += len;
		len++; // important
		if (n <= i + len) {
			loc[0] -= n - i;
			return loc;
		}
		loc[0] -= len;
		i += len;
		if (n <= i + len) {
			loc[1] -= n - i;
			return loc;
		}
	}
	return loc;
}

function InteractiveCard({ inViewport, forwardedRef, type }) {
	const [squares, setSquares] = useState(25);
	const [squarray, setSquarray] = useState([
		//Probably useRef
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
	]);
	const [index, setIndex] = useState(0);
	const [locked, setLocked] = useState(true);
	const [plotMode, setPlotMode] = useState(false);
	const wh = Math.ceil(Math.sqrt(squares));
	const origin = Math.floor((wh - 1) / 2);

	const spiralFunctions = {
		fss: { fn: iterateFastSquareSpiral, delay: 2000, range: [4, 144] },
		lss: { fn: iterateLineSquareSpiral, delay: 7000, range: [4, 144] },
	};
	let drawDelay = Math.min(spiralFunctions[type].delay / squares, 100);
	if (drawDelay < 10) {
		drawDelay = 0;
	}

	function newInput(input) {
		if (index !== -1) {
			return;
		}
		setSquares(input);
		var newArray = new Array(Math.ceil(Math.sqrt(input)));
		for (var i = 0; i < newArray.length; i++) {
			newArray[i] = new Array(Math.ceil(Math.sqrt(input))).fill(0);
		}
		setSquarray(newArray);
		setIndex(0);
	}

	function toggleLock() {
		setLocked(!locked);
	}
	function togglePlot() {
		setPlotMode((plotMode + 1) % 3);
	}

	function iterateFastSquareSpiral(origin) {
		const [ix, iy] = lineSquareSpiral(index);
		const [x, y] = [ix + origin, origin + iy];
		const tempSquarray = squarray;
		tempSquarray[y][x] = 1;
		setSquarray(tempSquarray);
		setIndex(index + 1);
	}

	function iterateLineSquareSpiral(origin) {
		let nextHighestSquare = Math.ceil(Math.sqrt(index + 1)) ** 2;
		if (nextHighestSquare - index > Math.sqrt(nextHighestSquare)) {
			nextHighestSquare = nextHighestSquare - Math.sqrt(nextHighestSquare);
		}
		if (nextHighestSquare + 1 > squares) {
			nextHighestSquare = squares - 1;
		}
		let tempSquarray = squarray;
		for (let i = index; i < nextHighestSquare + 1; i++) {
			const [ix, iy] = lineSquareSpiral(i);
			const [x, y] = [ix + origin, iy + origin];
			tempSquarray[y][x] = 1;
		}
		setSquarray(tempSquarray);
		setIndex(nextHighestSquare + 1);
	}

	

	useEffect(() => {
		if (inViewport) {
			if (index < squares && index >= 0) {
				setTimeout(() => {
					spiralFunctions[type].fn(origin);
				}, drawDelay);
			} else {
				setIndex(-1);
			}
		}
	}, [index, inViewport]);

	return (
		<div className={"DisplayCard"} ref={forwardedRef}>
			{plotMode ? (
				<SquarePlot squares={squarray} index={index} origin={origin} linear={plotMode} />
			) : (
				<SquareGrid squares={squarray} index={index} />
			)}
			<div className='gridControl'>
				<div className='sliderBox'>
					{locked ? (
						<SliderInput newInput={newInput} squares={squares} index={index} />
					) : (
						<ManualInput newInput={newInput} squares={squares} index={index} />
					)}
				</div>
				<IconButton aria-label='lock' size='small' onClick={toggleLock} className='lockButton'>
					{locked ? <Locked fontSize='inherit' /> : <Unlocked fontSize='inherit' />}
				</IconButton>
				<IconButton aria-label='lock' size='small' onClick={togglePlot} className='lockButton'>
					{plotMode ? <Plot fontSize='inherit' linear={plotMode} /> : <Grid fontSize='inherit' />}
				</IconButton>
			</div>
		</div>
	);
}

export default InteractiveCard;
