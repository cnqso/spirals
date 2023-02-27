/** @format */

import {React, useRef} from "react";
import "./SquareGrid.css";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import {SendIcon} from "./icons";

export default function ManualInput({ newInput, start = 25 }) {
	const numberRef = useRef(25);
	const buttonRef = useRef();



	function onEnter() {
		newInput(numberRef.current.value);
	}
	

	
	return (
		<span>
		<TextField
			id="SquaresInput"
			label="Squares"
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
	  <IconButton aria-label="input" size="small" ref={buttonRef} onClick={onEnter}>
  		<SendIcon fontSize="inherit" />
		</IconButton>
	  </span>
	);
}
