
const fss = `function fastSquareSpiral(n) {
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

const lss = `function lineSquareSpiral(n) {
  let loc = [0, 0];
  let len = 1;
  let i = 0;

  while (i < n) {
    if (n >= i + len * 2 + (len + 1) * 2) {
      i += len * 2 + (len + 1) * 2;
      loc[0] -= 1;
      loc[1] -= 1;
      len += 2;
      continue;
    }
    if (n === i) {
      return loc;
    }
    if (n <= i + len) {
      loc[0] += n - i;
      return loc;
    }
    loc[0] += len;
    i += len;
    if (n <= i + len) {
      loc[1] += n - i;
      return loc;
    }
    loc[1] += len;
    i += len;
    len++; // important
    if (n <= i + len) {
      loc[0] -= n - i;
      return loc;
    }
    loc[0] -= len;
    i += len;
    if (n <= i + len) {
      loc[1] -= n - i;
      return loc;
    }
  }
  return loc;
}`;

const vss = `function verboseSquareSpiral(n) {
  let loc = [0, 0];
  let len = 1;
  let i = 0;
  while (i < n) {
    for (let j = 0; j < len; j++) {
      //right
      if (i === n) {
        break;
      }
      console.log("right");
      loc[0]++;
      i++;
    }
    for (let j = 0; j < len; j++) {
      //up
      if (i === n) {
        break;
      }
      console.log("up");
      loc[1]++;
      i++;
    }
    len++;
    for (let j = 0; j < len; j++) {
      //left
      if (i === n) {
        break;
      }
      console.log("left");
      loc[0]--;
      i++;
    }
    for (let j = 0; j < len; j++) {
      //down
      if (i === n) {
        break;
      }
      console.log("down");
      loc[1]--;
      i++;
    }
    len++;
  }
  return loc;
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

const codestrings = {javascript: {fss:fss, lss:lss, vss:vss, mss:mss}, go: {fss:fss, lss:lss, vss:vss, mss:mss}}
export default codestrings;