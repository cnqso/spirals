/** @format */

import { React, useState } from "react";
import "./CodeBlock.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import syntaxStyle from "./syntaxStyle";

function CodeBlock({ codeString, language, setLanguage }) {


    const capitalLanguage = language[0].toUpperCase() + language.slice(1);
	//Will probably need to recreate solo
	return (
		<div className='codeBlock'>
			<div className='codeBlockTitle' onClick={()=>{setLanguage("go")}}>
				<div>{"Title"}</div>{" "}
				<div style={{ marginLeft: "auto" }}> {capitalLanguage} </div>
			</div>

			<SyntaxHighlighter className='codeBlockCode' language={language} style={syntaxStyle}>
				{codeString}
			</SyntaxHighlighter>
		</div>
	);
}

export default CodeBlock;
