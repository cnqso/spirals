import { React, useState } from 'react';
import './CodeBlock.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import syntaxStyle from './syntaxStyle';


function codeBlock(props) {


    const codeString =`
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
                }
            }
            len++;
            dir = ~dir + 1;
        }
    }`;
    //Will probably need to recreate solo
    return (
        <div className="codeBlock">
            <div className="codeBlockTitle">
             <div>{"Title"}</div> <div style={{marginLeft: 'auto'}}> {"Javascript"} </div>
            </div >

            <div className="codeBlockCode">
            <SyntaxHighlighter language="javascript" style={syntaxStyle}>
                    {codeString}
                </SyntaxHighlighter>
            </div>
        </div>
    )
}

export default codeBlock;