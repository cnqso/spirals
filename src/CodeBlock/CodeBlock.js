import {React, useState} from 'react';
import './CodeBlock.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';


function codeBlock (props) {


  const codeString = `function fastSquareSpiral(n) {
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
}`;
//Will probably need to recreate solo
    return (
        <div className="codeBlock">
            <div className="codeBlockTitle">
                {3}
            </div>
            <SyntaxHighlighter language="javascript" style={docco}> 
      {codeString}
    </SyntaxHighlighter>
            <div className="codeBlockCode">
                {3}
            </div>
        </div>
    )
}

export default codeBlock;