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
import themeOptions from "../themeOptions";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
const masterTheme = createTheme(themeOptions)
const theme = createTheme(masterTheme, {})



function CodeBlock({ codeString, language, setLanguage, id='' }) {
	const handleChange = (event) => {
		setLanguage(event.target.value);
	};

	

	return (
		<div className='codeBlock' id={id} style={{ maxHeight: 750 }}>
			<ThemeProvider theme={theme} >

			
			<SyntaxHighlighter className='codeBlockCode' language={language} style={syntaxStyle}>
				{codeString}
			</SyntaxHighlighter>
			<div style={{position: 'absolute',  top: 2, right: 2 }}>
					<FormControl size="small" color="primary">
						<Select
							sx={{paddingLeft: 0.7, paddingTop: 0.2}}
							variant="standard"
							style={{backgroundColor: 'rgba(247,229,174, 0.9)', color: '#573b2a' }}
							value={language}
							onChange={handleChange}
							displayEmpty
							inputProps={{ "aria-label": "Without label" }}>
							<MenuItem variant value={"javascript"}>Javascript</MenuItem>
							<MenuItem value={"python"}>Python</MenuItem>
							<MenuItem value={"c"}>C</MenuItem>
						</Select>
					</FormControl>
			</div>
			</ThemeProvider>
		</div>
	);
}

export default CodeBlock;
