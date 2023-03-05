/** @format */

import { React, useRef } from "react";
import "./SquareGrid.css";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { SendIcon } from "./icons";

export default function ManualInput({ newInput }) {
	const maximumRef = useRef(144);
	const buttonRef = useRef();

	function onEnter() {
		newInput(maximumRef.current.value);
	}

	return (
		<div>
			<span>
				Generate 100 random points between <i>n</i>=1 and <i>n</i>=
			</span>
			<TextField
				variant='standard'
				sx={{ width: "9ch", ml: 0.5 }}
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
