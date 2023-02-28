/** @format */

import { React, useState } from "react";
import "./CodeBlock.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import syntaxStyle from "./syntaxStyle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function CodeBlock({ codeString, language, setLanguage }) {
	const handleChange = (event) => {
		setLanguage(event.target.value);
	};

	return (
		<div className='codeBlock' style={{ maxHeight: 750 }}>
			<div className='codeBlockTitle'>
				<div>{"Title"}</div>{" "}
				<div style={{ marginLeft: "auto" }}>
					<FormControl size="small">
						<Select
							value={language}
							onChange={handleChange}
							displayEmpty
							inputProps={{ "aria-label": "Without label" }}>
							<MenuItem value={"javascript"}>Javascript</MenuItem>
							<MenuItem value={"python"}>Python</MenuItem>
							<MenuItem value={"c"}>C</MenuItem>
						</Select>
					</FormControl>
				</div>
			</div>

			<SyntaxHighlighter className='codeBlockCode' language={language} style={syntaxStyle}>
				{codeString}
			</SyntaxHighlighter>
		</div>
	);
}

export default CodeBlock;
