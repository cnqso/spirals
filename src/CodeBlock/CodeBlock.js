import { React, useState } from 'react';
import './CodeBlock.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import syntaxStyle from './syntaxStyle';


function codeBlock({codeString}) {

    //Will probably need to recreate solo
    return (
        <div className="codeBlock">
            <div className="codeBlockTitle">
             <div>{"Title"}</div> <div style={{marginLeft: 'auto'}}> {"Javascript"} </div>
            </div >

            <SyntaxHighlighter className="codeBlockCode" language="javascript" style={syntaxStyle}>
                    {codeString}
                </SyntaxHighlighter>
        </div>
    )
}

export default codeBlock;