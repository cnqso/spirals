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

export default function ManualInput({ newInput }) {
	const matches = useMediaQuery("(min-width:600px)");
	const quantityRef = useRef(10);
	const maximumRef = useRef(144);
	const buttonRef = useRef();
	function mediaQueryCss() {
		if (matches) {
			return ["off"];
		}
		return ["on"];
	}

	function onEnter() {
		newInput(quantityRef.current.value, maximumRef.current.value);
	}

	return (
		<div>
			<span>Generate   </span>
			<TextField
			variant="standard"
			sx={{ width: '10ch' }}
				id='RandomQuantity'
				type='number'
				defaultValue={10}
				inputRef={quantityRef}
				onKeyDown={(ev) => {
					if (ev.key === "Enter") {
						buttonRef.current.click();
						ev.preventDefault();
					}
				}}
			/>
			<span>
				random points between <i>n</i>=1 and <i>n</i>=
			</span>
			<TextField
			variant="standard"
			sx={{ width: '10ch' }}
				id='RandomRange'
				type='number'
				defaultValue={144}
				inputRef={maximumRef}
				onKeyDown={(ev) => {
					if (ev.key === "Enter") {
						buttonRef.current.click();
						ev.preventDefault();
					}
				}}
			/>
			<IconButton aria-label='input' size='small' ref={buttonRef} onClick={onEnter}>
				<SendIcon fontSize='inherit' />
			</IconButton>
		</div>
	);
}
