/** @format */

import { React, useState, useRef, useEffect } from "react";
import BlockLetter from "./BlockLetter";
import "./Header.css";
import {LogOutIcon, SendIcon, QuestionIcon, SunMoonIcon, GithubIcon, WebsiteIcon, ResidentialIcon, IndustrialIcon, CommercialIcon} from "../GridDisplay/icons";


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

const letterS = [
	[1, 1, 1, 1, 1],
	[1, 0, 0, 0, 0],
	[1, 1, 1, 1, 1],
	[0, 0, 0, 0, 1],
	[1, 1, 1, 1, 1],
];
const letterQ = [
	[1, 1, 1, 1, 1],
	[1, 0, 0, 0, 1],
	[1, 0, 0, 0, 1],
	[1, 0, 0, 1, 1],
	[1, 1, 1, 1, 1],
];
const letterU = [
	[1, 0, 0, 0, 1],
	[1, 0, 0, 0, 1],
	[1, 0, 0, 0, 1],
	[1, 0, 0, 0, 1],
	[1, 1, 1, 1, 1],
];
const letterA = [
	[1, 1, 1, 1, 1],
	[1, 0, 0, 0, 1],
	[1, 1, 1, 1, 1],
	[1, 0, 0, 0, 1],
	[1, 0, 0, 0, 1],
];
const letterR = [
	[1, 1, 1, 1, 1],
	[1, 0, 0, 0, 1],
	[1, 1, 1, 1, 1],
	[1, 0, 0, 1, 0],
	[1, 0, 0, 0, 1],
];
const letterE = [
	[1, 1, 1, 1, 1],
	[1, 0, 0, 0, 1],
	[1, 1, 1, 0, 0],
	[1, 0, 0, 0, 1],
	[1, 1, 1, 1, 1],
];
const letterP = [
	[1, 1, 1, 1, 1],
	[1, 0, 0, 0, 1],
	[1, 1, 1, 1, 1],
	[1, 0, 0, 0, 0],
	[1, 0, 0, 0, 0],
];
const letterI = [
	[1, 1, 1, 1, 1],
	[0, 0, 1, 0, 0],
	[0, 0, 1, 0, 0],
	[0, 0, 1, 0, 0],
	[1, 1, 1, 1, 1],
];
const letterL = [
	[1, 0, 0, 0, 0],
	[1, 0, 0, 0, 0],
	[1, 0, 0, 0, 0],
	[1, 0, 0, 0, 0],
	[1, 1, 1, 1, 1],
];
const initSquarray = [
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
];
function Header() {
	const [index, setIndex] = useState(0);
	const [squarray, setSquarray] = useState(initSquarray);
	const wh = 5;
	const origin = 2;

	function reset() {
		if (index !== -1) return;
		// We can't use setSquarray(initSquarray) because of React's diffing.
		// These types of limitations are small but make for ugly/hacky code.
		// In my last project I had to implement a checksum of the array to solve this.
		// Makes me want to move to Guandong and program microcontrollers in assembly.
		setSquarray([
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
		]);
		setIndex(0);
		console.log("reset", squarray, index);
	}

	function iterateFastSquareSpiral(origin) {
		const [ix, iy] = mathSquareSpiral(index);
		const [x, y] = [ix + origin, origin + iy];
		const tempSquarray = squarray;
		tempSquarray[y][x] = 1;
		setSquarray(tempSquarray);
		setIndex(index + 1);
	}
	useEffect(() => {
		if (index < 25 && index >= 0) {
			setTimeout(() => {
				iterateFastSquareSpiral(origin);
			}, 110);
		} else {
			setIndex(-1);
		}
	}, [index]);

	return (
		<div onClick={reset} className='Header'>
			<div className='HeaderRow'>
				<BlockLetter index={index} squares={squarray} letter={letterS} first={true} />
				<BlockLetter index={index} squares={squarray} letter={letterQ} />
				<BlockLetter index={index} squares={squarray} letter={letterU} />
				<BlockLetter index={index} squares={squarray} letter={letterA} />
				<BlockLetter index={index} squares={squarray} letter={letterR} />
				<BlockLetter index={index} squares={squarray} letter={letterE} />

			</div>
			<div className='HeaderRow'>
				<BlockLetter index={index} squares={squarray} letter={letterS} first={true}/>
				<BlockLetter index={index} squares={squarray} letter={letterP} />
				<BlockLetter index={index} squares={squarray} letter={letterI} />
				<BlockLetter index={index} squares={squarray} letter={letterR} />
				<BlockLetter index={index} squares={squarray} letter={letterA} />
				<BlockLetter index={index} squares={squarray} letter={letterL} />
				<BlockLetter index={index} squares={squarray} letter={letterS} />
			</div>
            <div className='links'>
                <GithubIcon ic="linkIcon" />
                <WebsiteIcon ic="linkIcon"/>
                </div>
		</div>
	);
}

export default Header;
