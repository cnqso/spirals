/** @format */

import { React, useState } from "react";
import "./App.css";
import SquareGrid from "./GridDisplay/SquareGrid";
import InteractiveCard from "./GridDisplay/InteractiveCard";
import handleViewport from "react-in-viewport";
//Simple introduction to problem
// Code block
// Visual representation next to code block

// But what if bla bla bla

// Code block
// Visual representation next to code block


 


function App() {





	const ViewportCard = handleViewport(InteractiveCard, /** options: {}, config: {} **/);


	return (
		<div className='App'>
        	<ViewportCard onEnterViewport={() => console.log('enter')} onLeaveViewport={() => console.log('leave')} />
			<ViewportCard onEnterViewport={() => console.log('enter')} onLeaveViewport={() => console.log('leave')} />
			<ViewportCard onEnterViewport={() => console.log('enter')} onLeaveViewport={() => console.log('leave')} />

		</div>
	);
}

export default App;
