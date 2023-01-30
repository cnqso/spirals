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
    const squareSz= Math.floor(720 / wh)
    const padding = Math.ceil((720 / wh) * 0.05)
    const canvas = useRef(null);
    useEffect(() => {

        const ctx = canvas.current.getContext("2d");
        ctx.fillStyle = baseColor;
        for (let i = 0; i < wh; i++) {
            for (let j = 0; j < wh; j++) {
                if (squares[j][i] === 0) {
                    ctx.fillStyle = baseColor;
                } else {
                    ctx.fillStyle = highlightColor;
                }
                ctx.fillRect(
                    i * squareSz,
                    j * squareSz,
                    squareSz - padding,
                    squareSz - padding
                );
            }
        }

    }, [squares]);

    return (
        <canvas
            style={{paddingLeft: padding/2, paddingTop: padding/2}}
            className='Canvas'
            ref={canvas}
            width={720}
            height={720}/>

    );
}

export default SquareGrid;
