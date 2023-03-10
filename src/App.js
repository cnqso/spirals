/** @format */

import { React, useState } from "react";
import "./App.css";
import InteractiveCard from "./GridDisplay/InteractiveCard";
import handleViewport from "react-in-viewport";
import CodeBlock from "./CodeBlock/CodeBlock";
import codestrings from "./codestrings";
import Content from "./Content";
import BigGrid from "./GridDisplay/BigGrid";
import ExperimentGrid from "./GridDisplay/ExperimentGrid";
import Header from "./Header/Header";

function App() {
	const ViewportIntCard = handleViewport(InteractiveCard /** options: {}, config: {} **/);
	const [language, setLanguage] = useState("javascript");

	function codeBlockFootnote1() {
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
	function codeBlockFootnote2() {
		return (
			<div style={{ fontSize: "0.8em" }}>
				<CodeBlock
					codeString={codestrings[language].mss}
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
			<CodeBlock codeString={codestrings[language].iss} language={language} setLanguage={setLanguage} id='solo' />
			{Content[2]({ code: codeBlockFootnote1 })}
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
			{Content[4]()}{" "}
			<CodeBlock
				codeString={codestrings[language].rmss}
				language={language}
				setLanguage={setLanguage}
				id='solo'
			/>
			{Content[5]()}
			<br />
			<br />
			<BigGrid type='mss' />
			<br />
			<br />
			{Content[6]({ code: codeBlockFootnote2 })}
			<br />
			<br />
			<ExperimentGrid />
		</div>
	);
}

export default App;
