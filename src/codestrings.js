const sss = `function simpleSquareSpiral() {
  let loc = [0,0]; // x,y
  let length = 1;
  while (true) {
    for (let i = 0; i < length; i++) {
      loc[0]++
    }
    for (let i = 0; i < length; i++) {
      loc[1]++
    }
    length++;
    for (let i = 0; i < length; i++) {
      loc[0]--
    }
    for (let i = 0; i < length; i++) {
      loc[1]--
    }
    length++;
  }
}`;



const fss = `function squareSpiral(n) {
  let loc = [0, 0];
  let len = 1;
  let direction = 1;
  let axis = 0;
  for (let i = 0; i < n;) {
    for (let j = 0; j < len; j++) {
      drawSquare(loc);
      // Check if we're done
      if (i >= n) { 
        return loc;
      }
      loc[axis] += direction; 
      i++; 
    }

    // Every other time
    if (axis === 1) { 
      len++;
      // Flip between 1 and -1
      direction = -direction;
    }
    // Flip between 0 and 1 (x and y)
    axis ^= 1; 
  }
  return loc;
}`;

const lss = `function linearSpiral(n) {
  let loc = [0, 0];
  let len = 1;
  let direction = 1;
  let axis = 0;
  for (let i = 0; i < n; ) {
    if (i + len > n) {
      loc[axis] += direction * (n - i);
      return loc;
    }
    loc[axis] += direction * len;
    i += len;

    // Every other time
    if (axis === 1) {
      len++;
      // Flip between 1 and -1
      direction = -direction; 
    }
    // Flip between 0 and 1 (x and y)
    axis ^= 1;
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
      loc[0]++;
      i++;
    }
    for (let j = 0; j < len; j++) {
      //up
      if (i === n) {
        break;
      }
      loc[1]++;
      i++;
    }
    len++;
    for (let j = 0; j < len; j++) {
      //left
      if (i === n) {
        break;
      }
      loc[0]--;
      i++;
    }
    for (let j = 0; j < len; j++) {
      //down
      if (i === n) {
        break;
      }
      loc[1]--;
      i++;
    }
    len++;
  }
  return loc;
}`

const mss = `function mathSquareSpiral(n) {
  // Perfect squares are located sqrt(n) steps from the origin
  const lowerRoot = Math.floor(Math.sqrt(n));
  const anchor = lowerRoot ** 2;
  const loc = [Math.floor( -lowerRoot / 2 ), Math.floor( lowerRoot / 2 )];
  // If n is not a perfect square, adjust the y loc by remaining steps
  // If remaining steps > current line length, continue on the x axis
  loc[1] -= Math.min(n - anchor, lowerRoot); 
  loc[0] += Math.max(n - anchor - lowerRoot, 0);
  // If the lower-bound root length is odd, mirror the loc
  if (lowerRoot % 2 !== 0) {
    return loc.map((x) => -x);
  }
  return loc;
}`


const psss = `def simpleSquareSpiral():       
loc = [0, 0] # x,y  
length = 1
while True:
  for _ in range(length):
    loc[0] += 1
  for _ in range(length):
    loc[1] += 1
  length += 1
  for _ in range(length):
    loc[0] -= 1
  for _ in range(length):
    loc[1] -= 1
  length += 1`

const pvss = `def verboseSquareSpiral(n):
  loc = [0, 0]
  length = 1
  i = 0
  while i < n:
    for _ in range(length):
      # Right
      if i >= n:
        break
      loc[0] += 1
      i += 1
    for _ in range(length):
      # Up
      if i >= n:
        break
      loc[1] += 1
      i += 1
    length += 1
    for _ in range(length):
      # Left
      if i >= n:
        break
      loc[0] -= 1
      i += 1
    for _ in range(length):
      # Down
      if i >= n:
        break
      loc[1] -= 1
      i += 1
    length += 1
  return loc`

  const pfss = `def squareSpiral(n):
  loc = [0, 0]
  length = 1
  direction = 1
  axis = 0
  i = 0
  while i < n:
    for j in range(length):
      print(loc)
      # Check if we're done
      if i >= n:
        return loc
      loc[axis] += direction
      i += 1

    # Every other time
    if axis == 1:
      length += 1
      # Flip between 1 and -1
      direction = -direction

    # Flip between 0 and 1 (x and y)
    axis ^= 1
  return loc`

const plss = `def linearSpiral(n):
  loc = [0, 0]
  length = 1
  direction = 1
  axis = 0
  i = 0
  while i < n:
    if i + length > n:
      loc[axis] += direction * (n - i)
      return loc
    loc[axis] += direction * length
    i += length

    # Every other time
    if axis == 1:
      length += 1
      # Flip between 1 and -1
      direction = -direction

    # Flip between 0 and 1 (x and y)
    axis ^= 1
  return loc`

const pmss = `def mathSquareSpiral(n):
  # Perfect squares are located sqrt(n) steps from the origin
  lowerRoot = math.floor(math.sqrt(n))
  anchor = lowerRoot ** 2
  loc = [-lowerRoot // 2, lowerRoot // 2]
  # If n is not a perfect square, adjust the y loc by remaining steps
  # If remaining steps > current line length, continue on the x axis
  loc[1] -= min(n - anchor, lowerRoot)
  loc[0] += max(n - anchor - lowerRoot, 0)

  # If the lower-bound root length is odd, mirror the loc
  if (lowerRoot % 2) != 0:
    loc = [-loc[0], -loc[1]]
  
  return loc`

const csss = `int simpleSquareSpiral()
{
  int loc[2] = {0, 0}; // x,y
  int length = 1;
  while (1)
  {
    for (int i = 0; i < length; i++)
    {
      loc[0] += 1;
    }
    for (int i = 0; i < length; i++)
    {
      loc[1] += 1;
    }
    length++;
    for (int i = 0; i < length; i++)
    {
      loc[0] -= 1;
    }
    for (int i = 0; i < length; i++)
    {
      loc[1] -= 1;
    }
    length++;
  }
}`

const cfss = `int squareSpiral(int n, int loc[])
{
  int length = 1;
  int direction = 1;
  int axis = 0;
  int i = 0;
  while (i < n)
  {
    for (int j = 0; j < length; j++)
    {
      printf("%d,%d \n", loc[0], loc[1]);
      // Check if we're done
      if (i >= n)
      {
        return *loc;
      }
      loc[axis] += direction;
      i++;
    }
    if (axis == 1)
    {
      length++;
      // Flip between 1 and -1
      direction = -direction;
    }
    // Flip between 0 and 1 (x and y)
    axis ^= 1;
  }
  return *loc;
}`

const clss = `int linearSpiral(int n, int loc[])
{
  int length = 1;
  int direction = 1;
  int axis = 0;
  int i = 0;
  while (i < n)
  {
    printf("%d,%d", loc[0], loc[1]);
    if (i + length > n)
    {
      loc[axis] += direction * (n - i);
      i += length;
    }
    loc[axis] += direction * length;
    i += length;

    // Every other time
    if (axis == 1)
    {
      length++;
      // Flip between 1 and -1
      direction = -direction;
    }
    // Flip between 0 and 1 (x and y)
    axis ^= 1;
  }
  return *loc;
}`

const cvss = `int verboseSquareSpiral(int n, int loc[])
{
  int length = 1;
  int i = 0;
  while (i < n)
  {
    for (int j = 0; j < length; j++)
    {
      // Right
      if (i >= n)
      {
        return *loc;
      }
      loc[0] += 1;
      i++;
    }
    for (int j = 0; j < length; j++)
    {
      // Up
      if (i >= n)
      {
        return *loc;
      }
      loc[1] += 1;
      i++;
    }
    length++;
    for (int j = 0; j < length; j++)
    {
      // Left
      if (i >= n)
      {
        return *loc;
      }
      loc[0] -= 1;
      i++;
    }
    for (int j = 0; j < length; j++)
    {
      // Down
      if (i >= n)
      {
        return *loc;
      }
      loc[1] -= 1;
      i++;
    }
    length++;
  }
  return *loc;
}
`

const cmss = `int mathSquareSpiral(int n, int *loc)
{
  int lowerRoot = sqrt(n);
  // C uses true integer division, which changes many cases
  // In Python and JS, -1 // 2 == -1, but in C -1 // 2 == 0
  // We can adjust by subtracting 1 from x and y if the root is odd
  int isOdd = lowerRoot % 2 != 0;
  int anchor = pow((int) lowerRoot, 2);
  loc[0] = (-lowerRoot-isOdd)/2;
  loc[1] = (lowerRoot-isOdd)/2;

  loc[1] -= fmin(n - anchor, lowerRoot);
  loc[0] += fmax(n - anchor - lowerRoot, 0);

  if (isOdd)
  {
    loc[0] = -loc[0];
    loc[1] = -loc[1];
  }
}`











const rmss = mss

const codestrings = {javascript: {iss:sss, fss:fss, lss:lss, vss:vss, mss:mss, rmss:mss}, python: {iss:psss, fss:pfss, lss:plss, vss:pvss, mss:pmss, rmss:pmss}, c: {iss:csss, fss:cfss, lss:clss, vss:cvss, mss:cmss, rmss:cmss}}
export default codestrings;