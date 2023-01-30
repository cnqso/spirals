/** @format */

import { React, useState } from "react";
import "./App.css";
import PixelGrid from "react-pixel-grid";
import SquareGrid from "./canvas/SquareGrid";
import SquareGridv2 from "./canvas/SquareGridv2";

//Simple introduction to problem
// Code block
// Visual representation next to code block

// But what if bla bla bla

// Code block
// Visual representation next to code block

function App() {
	return (
		<div className='App'>
				{/* <SquareGrid/> */}
        <SquareGridv2 squares = {[[0, 1, 1, 0, 1], [1, 0, 0, 1, 0], [1, 0, 0, 1, 0], [0, 1, 1, 0, 0], [0,0,0,0,0]]}/>
		</div>
	);
}

export default App;
