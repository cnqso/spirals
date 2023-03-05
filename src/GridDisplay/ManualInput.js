/** @format */

import { React, useRef } from "react";
import "./SquareGrid.css";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { SendIcon } from "./icons";

export default function ManualInput({ maxSquares = 9999, newInput, matches, start = 25, label = matches ? "Squares" : null }) {
	const numberRef = useRef(25);
	const buttonRef = useRef();

	function onEnter() {
		newInput(numberRef.current.value);
	}

	return (
		<span>
			<TextField
			sx={{maxWidth: '90%'}}
				variant='standard'
				color="error"
				id='SquaresInput'
				InputProps={{
					inputProps: { 
						max: maxSquares, min: 0
					}
				}}
				label={label}
				type='number'
				defaultValue={start}
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
	);
}
