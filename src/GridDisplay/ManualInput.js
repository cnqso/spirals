/** @format */

import {React, useRef} from "react";
import { useMediaQuery } from "@mui/material";
import "./SquareGrid.css";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import {LogOutIcon, SendIcon, QuestionIcon, SunMoonIcon, GithubIcon, WebsiteIcon, ResidentialIcon, IndustrialIcon, CommercialIcon} from "./icons";

export default function ManualInput({ newInput, start = 25 }) {
	const matches = useMediaQuery("(min-width:600px)");
	const numberRef = useRef(25);
	const buttonRef = useRef();
	function mediaQueryCss() {
		if (matches) {
			return ['off'];
		}
		return ['on'];
	}


	function onEnter() {
		newInput(numberRef.current.value);
	}
	

	
	return (
		<div>
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
	  </div>
	);
}
