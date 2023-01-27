/** @format */

import { React, useState, useEffect, useRef } from "react";
import "./SquareGrid.css";
import SliderInput from "./SliderInput";
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Box,
    MdGraphicEq
  } from '@chakra-ui/react'
import useMediaQuery from '@mui/material/useMediaQuery';


const blue = "#71C2A9";
const brown = "#573B2A";
const cream = "#F7E5AE";
const orange = "#DE731D";
const tan = "#EC9C26";
const red = "#75280f";





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
//If the nearest lower square is odd, offset x to the right by 1
//81+ - 10x10 origin xy = 5
//64+ - 9x9 origin xy = 4
//49+ - 8x8 origin xy = 4
//36+ - 7x7 origin xy = 3
//25+ - 6x6 origin xy = 3
//16+ - 5x5 origin xy = 2
//9+ - 4x4 origin xy = 2
//4+ - 3x3 origin xy = 1
//1+ - 2x2 origin xy = 1
//0 - 1x1 origin xy = 0

//We can generalize this formula as follows:
//origin xy = (sqrt(n)-1)/2






function SquareGrid() {
	const [index, setIndex] = useState(-1);
    const [squares, setSquares] = useState(36);
    const matches = useMediaQuery('(min-width:600px)');
    const resetHandler = () => {
        if (index >= squares) {
            setIndex(-1)
        }
    }
    //Change so that we have a set pixel width and height and squares just fall into those
    let squareWidth = 60;
    let padding = Math.floor((18-Math.ceil(Math.sqrt(squares)))/2);
    if (!matches) {
        padding = 0;
    }
    const baseColor = red;
    const highlightColor = tan;
    const enteredColor = orange;
    const cardColor = blue;
    const backgroundColor = cream;

    const wh = Math.ceil(Math.sqrt(squares)) 
    useEffect(() => {
        console.log("resetting on squares")
        setIndex(-1)
    }, [squares])


	const canvas = useRef(null);
	useEffect(() => {

		const ctx = canvas.current.getContext("2d");
        const origin = Math.floor((wh-1)/2)
        const sqrsz = (squareWidth*(12/wh))
		if (index === -1) {
            ctx.fillStyle = cardColor;
        ctx.fillRect(0, 0, 12 * squareWidth, 12 * squareWidth);
            ctx.fillStyle = baseColor;
			for (let i = 0; i < wh; i++) {
				for (let j = 0; j < wh; j++) {
					ctx.fillStyle = baseColor;
					ctx.fillRect(
						i * sqrsz,
						j * sqrsz,
						sqrsz - padding,
						sqrsz - padding
					);
				}
			}
            ctx.fillStyle = highlightColor;
            setIndex(index+1)
		} else if (index < squares) {
            setTimeout(() => {
                const [ix, iy] = fastSquareSpiral(index-1);   
                const [x, y] = [ix+origin, iy+origin]
                ctx.fillRect(
                    x * sqrsz,
                    y * sqrsz,
                    sqrsz - padding,
                    sqrsz - padding
                );
                setIndex(index+1)
            }, 1200/squares)
        }

	}, [index, matches]);
    
	return (
		<div className={"DisplayCard"}>
			<canvas
				className='Canvas'
				ref={canvas}
				width={720}
				height={720}></canvas>
                <br/>
                <SliderInput className={"Slider"} setSquares = {setSquares} squares={squares} index={index}/>
		</div>
	);
}

export default SquareGrid;
