/** @format */

import { React, useState, useRef } from "react";
import "./App.css";
import InteractiveCard from "./GridDisplay/InteractiveCard";
import handleViewport from "react-in-viewport";
import CodeBlock from "./CodeBlock/CodeBlock";
import codestrings from "./codestrings";
import Content from "./Content";
import Collapse from "@mui/material/Collapse";
import SquarePlot from "./GridDisplay/SquarePlot";
import BigGrid from "./GridDisplay/BigGrid";



function fastSquareSpiral(n) {
	let dir = 1;
	let loc = [0, 0];
	let len = 1;
	let runi = 1;
	let i = 0;
	while (true) {
		for (let k = 0; k < 2; k++) {
			runi = len + i;
			while (i < runi) {
				if (n < i) {
					return loc;
				}
				loc[k] += dir;
				i++;
			}
		}
		len++;
		dir = ~dir + 1;
	}
}



function Header() {
	return <h1>Square Spirals</h1>;
}





function App() {
	const ViewportIntCard = handleViewport(InteractiveCard /** options: {}, config: {} **/);
	const [language, setLanguage] = useState("javascript");

	function codeBlockFootnote() {
		return (
			<div style={{ fontSize: "0.8em" }}>
				<CodeBlock
					codeString={codestrings[language].vss}
					language={language}
					setLanguage={setLanguage}
				/>
			</div>
		);
	}

	return (
		<div className='App'>
			<Header />

			{Content[0]()}
			{Content[1]()}

			<CodeBlock codeString={codestrings[language].iss} language={language} setLanguage={setLanguage} />

			{Content[2]({ footnote: codeBlockFootnote })}

			<div className='codeAndDisplay'>
				<CodeBlock
					codeString={codestrings[language].fss}
					language={language}
					setLanguage={setLanguage}
				/>
				<ViewportIntCard type='fss' />
			</div>
			{Content[3]()}

			<div className='codeAndDisplay'>
				<CodeBlock
					codeString={codestrings[language].lss}
					language={language}
					setLanguage={setLanguage}
				/>
				<ViewportIntCard type='lss' />
			</div>
			{Content[4]()}
			<CodeBlock
				codeString={codestrings[language].rmss}
				language={language}
				setLanguage={setLanguage}
			/>
			{Content[5]()}


			<br/><br/>
				<BigGrid type='mss' />
			<br/><br/>


			<div className='codeAndDisplay'>
				<CodeBlock
					codeString={codestrings[language].mss}
					language={language}
					setLanguage={setLanguage}
				/>
				<ViewportIntCard type='fss' />
			</div>
			

		</div>
	);
}

export default App;
