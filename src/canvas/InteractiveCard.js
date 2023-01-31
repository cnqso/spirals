/** @format */

import { React, useState, useEffect } from "react";
import SquareGrid from "./SquareGrid";
import SliderInput from "./SliderInput";
import "./SquareGrid.css";

function InteractiveCard() {
	const [squares, setSquares] = useState(25);
    const [squarray, setSquarray] = useState([ //Probably useRef
        [0, 1, 1, 0, 1],
        [1, 0, 0, 1, 0],
        [1, 0, 0, 1, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0],
    ]);
	const [index, setIndex] = useState(-1);

    function newInput (input) {
        setSquares(input)
        setIndex(-1)
    }

	useEffect(() => {
		if (index === -1) {
            const OneDArray = new Array(Math.ceil(Math.sqrt(squares))).fill(0)
            const TwoDArray = new Array(Math.ceil(Math.sqrt(squares))).fill(OneDArray);
            console.log(TwoDArray)
            setSquarray(TwoDArray);
            setIndex(index + 1);
		}

        
	}, [index, squares]);

	return (
		<div className={"DisplayCard"}>
			<SquareGrid
				squares={squarray}
			/>
			<SliderInput className={"Slider"} newInput={newInput} squares={squares} index={index} />
		</div>
	);
}

export default InteractiveCard;
