const iss = `function squareSpiral(n) {
  let location = [0,0]; // x,y
  let length = 1;
  while (true) {
    for (let i = 0; i < length; i++) {
      location[0]++
    }
    for (let i = 0; i < length; i++) {
      location[1]++
    }
    length++;
    for (let i = 0; i < length; i++) {
      location[0]--
    }
    for (let i = 0; i < length; i++) {
      location[1]--
    }
    length++;
  }
}`;



const fss = `function squareSpiral(n) {
  let location = [0, 0];
  let len = 1;
  let direction = 1;
  let axis = 0;
  for (let i = 0; i < n;) {
    for (let j = 0; j < len; j++) {
      drawSquare(location);
      if (i >= n) { // Check at each square
        return location;
      }
      location[axis] += direction; 
      i++; 
    }
    if (axis === 1) { 
      len++;
      // Flip between 1 and -1
      direction = -direction;
    }
    // Flip between 0 and 1 (x and y)
    axis ^= 1; 
  }
  return location;
}`;

const lss = `function lineSquareSpiral(n) {
  let location = [0, 0];
  let len = 1;
  let direction = 1;
  let axis = 0;
  for (let i = 0; i < n; ) {
    if (i + len > n) {
      location[axis] += direction * (n - i);
      return location;
    }
    location[axis] += direction * len;
    i += len;

    if (axis === 1) {
      // Every other time
      len++;
      // Flip between 1 and -1
      direction = -direction; 
    }
    // Flip between 0 and 1 (x and y)
    axis ^= 1;
  }
  return location;
}`;

const vss = `function verboseSquareSpiral(n) {
  let location = [0, 0];
  let len = 1;
  let i = 0;
  while (i < n) {
    for (let j = 0; j < len; j++) {
      //right
      if (i === n) {
        break;
      }
      console.log("right");
      location[0]++;
      i++;
    }
    for (let j = 0; j < len; j++) {
      //up
      if (i === n) {
        break;
      }
      console.log("up");
      location[1]++;
      i++;
    }
    len++;
    for (let j = 0; j < len; j++) {
      //left
      if (i === n) {
        break;
      }
      console.log("left");
      location[0]--;
      i++;
    }
    for (let j = 0; j < len; j++) {
      //down
      if (i === n) {
        break;
      }
      console.log("down");
      location[1]--;
      i++;
    }
    len++;
  }
  return location;
}`

const mss = `function mathSquareSpiral(n) {
  const lowerRoot = Math.floor(Math.sqrt(n));
  let anchor = lowerRoot ** 2;
  let location = [0, 0];
  //set location to the anchor point;
  if (lowerRoot % 2 === 0) {
    //if the number is even
    location = [lowerRoot / -2, lowerRoot / 2]; //set location to the anchor point
    location[1] -= Math.min(n - anchor, lowerRoot); //Move down for all remaining numbers up to the current side length
    location[0] += Math.max(n - anchor - lowerRoot, 0); //If there are squares remaining, move right
  } else {
    location = [(lowerRoot - 1) / 2 + 1, (lowerRoot - 1) / -2];
    location[1] += Math.min(n - anchor, lowerRoot); //Move up
    location[0] -= Math.max(n - anchor - lowerRoot, 0); //If there ar
  }

  return location;
}`

const codestrings = {javascript: {iss:iss, fss:fss, lss:lss, vss:vss, mss:mss}, go: {iss:iss, fss:fss, lss:lss, vss:vss, mss:mss}}
export default codestrings;