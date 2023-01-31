/** @format */

import { React, useState, useEffect, useRef } from "react";
import "./SquareGrid.css";
import useMediaQuery from '@mui/material/useMediaQuery';


const blue = "#71C2A9";
const brown = "#573B2A";
const cream = "#F7E5AE";
const orange = "#DE731D";
const tan = "#EC9C26";
const red = "#75280f";
const baseColor = red;
const highlightColor = tan;

function SquareGrid({squares}) {

    const wh = Math.max(squares.length, squares[0].length);
    const squareSz= (720 / wh) * 0.95;
    const padding = (720 / wh) * 0.05;
    const canvas = useRef(null);
    useEffect(() => {

        const ctx = canvas.current.getContext("2d");
        ctx.clearRect(0, 0, 720, 720);
        ctx.fillStyle = baseColor;
        for (let i = 0; i < wh; i++) {
            for (let j = 0; j < wh; j++) {
                if (squares[j][i] === 0) {
                    ctx.fillStyle = baseColor;
                } else {
                    ctx.fillStyle = highlightColor;
                }
                ctx.fillRect(
                    i * (squareSz + padding) + padding/2,
                    j * (squareSz + padding) + padding/2,
                    squareSz,
                    squareSz
                );
            }
        }

    }, [squares]);

    return (
        <canvas
            className='Canvas'
            ref={canvas}
            width={720}
            height={720}/>

    );
}

export default SquareGrid;
