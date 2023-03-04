/** @format */

import {React, useRef} from "react";
import "./SquareGrid.css";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import {SendIcon} from "./icons";

export default function ManualInput({ newInput, matches, start = 25 }) {
	const numberRef = useRef(25);
	const buttonRef = useRef();

	const label = matches ? "Squares": null;

	function onEnter() {
		newInput(numberRef.current.value);
	}
	

	
	return (
		<span>
		<TextField
			id="SquaresInput"
			label= {label}
			type="number"
			defaultValue={start}
			inputRef={numberRef}
			onKeyDown={(ev) => {
				if (ev.key === 'Enter') {
					buttonRef.current.click()
				  ev.preventDefault();
				}
			  }}
	  />
	  <IconButton aria-label="input" ref={buttonRef} onClick={onEnter}>
  		<SendIcon fontSize="inherit" />
		</IconButton>
	  </span>
	);
}
