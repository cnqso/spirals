/** @format */

import { React, useState, useEffect } from "react";
import SquareGrid from "./SquareGrid";
import SliderInput from "./SliderInput";
import ManualInput from "./ManualInput";
import IconButton from "@mui/material/IconButton";
import { Locked, Unlocked } from "./icons";
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

	useEffect(() => {
		function iterateFastSquareSpiral(origin) {
			const [ix, iy] = lineSquareSpiral(index);
			const [x, y] = [ix + origin, iy + origin];
			const tempSquarray = squarray;
			tempSquarray[y][x] = 1;
			setSquarray(tempSquarray);
			setIndex(index + 1);
		}

		function iterateLineSquareSpiral(origin) {
			let nextHighestSquare = Math.ceil(Math.sqrt(index + 1)) ** 2;
            let tempSquarray = squarray;
            for (let i = index; i < nextHighestSquare; i++) {
                const [ix, iy] = lineSquareSpiral(i);
			    const [x, y] = [ix + origin, iy + origin];
			    tempSquarray[y][x] = 1;
            }
            setSquarray(tempSquarray);
			setIndex(nextHighestSquare);
		}
        const spiralFunctions = {fss: iterateFastSquareSpiral, lss: iterateLineSquareSpiral};

		if (inViewport) {
			const wh = Math.ceil(Math.sqrt(squares));
			const origin = Math.floor((wh - 1) / 2);

			if (index < squares && index >= 0) {
				setTimeout(() => {
                    spiralFunctions[type](origin)
					
				}, 2000 / squares);
			} else {
				setIndex(-1);
			}
		}
	}, [index, inViewport]);

	return (
		<div className={"DisplayCard"} ref={forwardedRef}>
			<SquareGrid squares={squarray} index={index} />
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
			</div>
		</div>
	);
}

export default InteractiveCard;
