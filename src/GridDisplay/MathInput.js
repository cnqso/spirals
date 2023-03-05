/** @format */

import { React, useRef } from "react";
import { useMediaQuery } from "@mui/material";
import "./SquareGrid.css";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import {
	LogOutIcon,
	SendIcon,
	QuestionIcon,
	SunMoonIcon,
	GithubIcon,
	WebsiteIcon,
	ResidentialIcon,
	IndustrialIcon,
	CommercialIcon,
} from "./icons";

export default function MathInput({ formulaRef, newMathInput, newInput, updateFormula }) {
	const buttonRef = useRef();

	const numberRef = useRef(25);

	function onEnter() {
		newInput(numberRef.current.value);
	}
	

	return (
		<>
			<span>
				<TextField
					variant='standard'
					id='FormulaInput'
					label='Pattern'
					type='text'
					defaultValue={"4*n^2 - 4*n + 1"}
					inputRef={formulaRef}
					onKeyDown={(ev) => {
						if (ev.key === "Enter") {
							buttonRef.current.click();
							ev.preventDefault();
						}
					}}
					onChange={updateFormula}
				/>
			</span>
			<span>
				<TextField
					variant='standard'
					id='SquaresInput'
					label="Squares"
					type='number'
					defaultValue={250}
					inputRef={numberRef}
					onKeyDown={(ev) => {
						if (ev.key === "Enter") {
							buttonRef.current.click();
							ev.preventDefault();
						}
					}}
				/>
				<IconButton aria-label='input' ref={buttonRef} onClick={onEnter}>
					<SendIcon fontSize='inherit' />
				</IconButton>
			</span>
		</>
	);
}
