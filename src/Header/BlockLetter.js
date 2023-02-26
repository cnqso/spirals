import { React, useState, useEffect, useRef } from "react";
import "./Header.css";



const blue = "#71C2A9";
const brown = "#573B2A";
const cream = "#F7E5AE";
const orange = "#DE731D";
const tan = "#EC9C26";
const red = "#75280f";
const baseColor = red;
const highlightColor = tan;

function BlockLetter({index, squares, letter, first=false}) {

    const canvasWidth = first ? 504 : 432

    const canvas = useRef(null);
    function drawSquare(x, y, color) {
        const wh = 5;
        const squareSz= 64;
        const padding = 8;
        const yMirrorOffset = 360 - squareSz; // Y is drawn top to bottom by default
        const ctx = canvas.current.getContext("2d");
        ctx.fillStyle = color;
        ctx.fillRect(
            x * (squareSz + padding) + padding/2,
            yMirrorOffset-(y * (squareSz + padding) + padding/2),
            squareSz,
            squareSz
        );
    }
    useEffect(() => {
        const wh = 5;
        const ctx = canvas.current.getContext("2d");
        ctx.clearRect(0, 0, 432, 360);
        ctx.fillStyle = baseColor;
        for (let i = 0; i < wh; i++) {
            for (let j = 0; j < wh+1; j++) {
                if (squares[i][j] === 0) {
                    ctx.fillStyle = blue;
                } else {
                    if (letter[4-i][j] === 1) {
                    ctx.fillStyle = highlightColor;
                    } else {
                        ctx.fillStyle = red;
                    }
                }
                drawSquare(j, i, ctx.fillStyle);
            }
        }

    }, [index]);

    return (
        <canvas
            className='BlockLetter'
            ref={canvas}
            width={432}
            height={360}/>

    );
}

export default BlockLetter;
