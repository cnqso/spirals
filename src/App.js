import {React, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import PixelGrid from "react-pixel-grid";





// function renderFastSquareSpiral(n) {
//   var canvas = document.getElementById("canvas");
//   var ctx = canvas.getContext("2d");
//   const squareSize = 5000/Math.sqrt(n)
//   const fontSize = `${(squareSize/2).toString()}px serif`
//   const offset = 5000 - squareSize
//   ctx.fillStyle = "#000000";
//   ctx.fillRect(0, 0, 10000, 10000) 
//   let dir = 1;
//   let loc = [0, 0];
//   let len = 1;
//   let runi = 1;
//   let i = 0;
//   while (true) {
//       for (let k = 0; k < 2; k++) {
//           runi = len + i;
//           while (i < runi) {
//               ctx.fillStyle = "#" + Math.floor((Math.random()*14680064)+2097151).toString(16);
//               ctx.fillRect(5000-loc[0]*squareSize, 5000-loc[1]*squareSize, squareSize, squareSize);
//               ctx.fillStyle = "#FFFFFF"
//               ctx.font = fontSize;
//               ctx.fillText(i, 5000-loc[0]*squareSize, (5000-(loc[1]*squareSize))+squareSize);
//               loc[k] += dir;
//               i++;
//               if (n < i) {
//                   return loc;
//       }}}
//       len++;
//       dir = ~dir + 1;
//   }
// }


//Simple introduction to problem
// Code block
// Visual representation next to code block

// But what if bla bla bla

// Code block
// Visual representation next to code block


function App() {

  const [nSquares, setNSquares] = useState(73)
  const [squareData, setSquareData] = useState(Array(nSquares).fill(0).map(Math.random))

  function fastSquareSpiral(n) {
    let dir = 1;
    let loc = [0, 0];
    let len = 1;
    let runi = 1;
    let i = 0;
    let maxWidth = Math.ceil(n^(1/2))
    let minWidth = Math.floor(n^(1/2))
    let outputArray = [...Array(minWidth)].map(e => Array(maxWidth));
    
    while (true) {
        for (let k = 0; k < 2; k++) {
            runi = len + i;
            while (i < runi) {
              console.log(i/n)
                outputArray[loc[0]][loc[1]] = (i / n)
                loc[k] += dir;
                i++;
                if (n < i) {
                  return outputArray;
        }}}
        len++;
        dir = ~dir + 1;
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => setSquareData(fastSquareSpiral(nSquares))}>+</button>
Hello
<PixelGrid
  data={squareData}
  options={{
    size: (Math.ceil(nSquares^(1/2)) + 1),
    padding: 2,
    background: [0, 0, 0],
  }}
/>
      </header>
    </div>
  );
}

export default App;
