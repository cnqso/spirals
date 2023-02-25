/** @format */

import {React, useRef} from "react";
import { useMediaQuery } from "@mui/material";
import "./SquareGrid.css";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import {LogOutIcon, SendIcon, QuestionIcon, SunMoonIcon, GithubIcon, WebsiteIcon, ResidentialIcon, IndustrialIcon, CommercialIcon} from "./icons";

export default function MathInput({ formulaRef, newMathInput, updateFormula }) {
	const matches = useMediaQuery("(min-width:600px)");
	const buttonRef = useRef();
	function mediaQueryCss() {
		if (matches) {
			return ['off'];
		}
		return ['on'];
	}
	

	
	return (
		<div>
		<TextField
			id="FormulaInput"
			label="Pattern"
			type="text"
			defaultValue={"4*n^2 - 4*n + 1"}
			inputRef={formulaRef}
			onChange={updateFormula}
	  />
	  </div>
	);
}
