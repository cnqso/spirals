/** @format */

import { React, useState, useEffect } from "react";
import SquareGrid from "./SquareGrid";
import SliderInput from "./SliderInput";
import "./SquareGrid.css";



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
                }}
        len++;
        dir = ~dir + 1;
    }
}




function InteractiveCard() {
	const [squares, setSquares] = useState(25);
    const [squarray, setSquarray] = useState([ //Probably useRef
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ]);
	const [index, setIndex] = useState(0);

    function newInput (input) {
        setSquares(input)
        var newArray = new Array(Math.ceil(Math.sqrt(input)));
         for (var i = 0; i < newArray.length; i++) {
            newArray[i] = new Array(Math.ceil(Math.sqrt(input))).fill(0);
         }
        setSquarray(newArray);
        setIndex(0);
    }


	useEffect(() => {
        const wh = Math.ceil(Math.sqrt(squares)) 
        const origin = Math.floor((wh-1)/2)

        if (index < squares && index >= 0) {
        setTimeout(() => {
            const [ix, iy] = fastSquareSpiral(index-1);   
            const [x, y] = [ix+origin, iy+origin]
            const tempSquarray = squarray
            tempSquarray[y][x] = 1;
            setSquarray(tempSquarray);
            setIndex(index+1);
        }, 1500/squares)
    } else {
        setIndex(-1)
    }
        
	}, [index]);

	return (
		<div className={"DisplayCard"}>
			<SquareGrid
				squares={squarray}
                index={index}
			/>
			<SliderInput className={"Slider"} newInput={newInput} squares={squares} index={index} />
		</div>
	);
}

export default InteractiveCard;
