const sss = `function simpleSquareSpiral() {
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
      // Check if we're done
      if (i >= n) { 
        return location;
      }
      location[axis] += direction; 
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

    // Every other time
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
      location[0]++;
      i++;
    }
    for (let j = 0; j < len; j++) {
      //up
      if (i === n) {
        break;
      }
      location[1]++;
      i++;
    }
    len++;
    for (let j = 0; j < len; j++) {
      //left
      if (i === n) {
        break;
      }
      location[0]--;
      i++;
    }
    for (let j = 0; j < len; j++) {
      //down
      if (i === n) {
        break;
      }
      location[1]--;
      i++;
    }
    len++;
  }
  return location;
}`

const mss = `function mathSquareSpiral(n) {
  // Perfect squares are located sqrt(n) steps from the origin
  const lowerRoot = Math.floor(Math.sqrt(n));
  const anchor = lowerRoot ** 2;
  const location = [Math.floor( -lowerRoot / 2 ), Math.floor( lowerRoot / 2 )];
  // If n is not a perfect square, adjust the y location by remaining steps
  // If remaining steps > current line length, continue on the x axis
  location[1] -= Math.min(n - anchor, lowerRoot); 
  location[0] += Math.max(n - anchor - lowerRoot, 0);
  // If the lower-bound root length is odd, mirror the location
  if (lowerRoot % 2 !== 0) {
    return location.map((x) => -x);
  }
  return location;
}`


const psss = `def simpleSquareSpiral():
location = [0, 0]
length = 1
while True:
  for _ in range(length):
    location[0] += 1
  for _ in range(length):
    location[1] += 1
  length += 1
  for _ in range(length):
    location[0] -= 1
  for _ in range(length):
    location[1] -= 1
  length += 1`

const pvss = `def verboseSquareSpiral(n):
  location = [0, 0]
  length = 1
  i = 0
  while i < n:
    for _ in range(length):
      # Right
      if i >= n:
        break
      location[0] += 1
      i += 1
    for _ in range(length):
      # Up
      if i >= n:
        break
      location[1] += 1
      i += 1
    length += 1
    for _ in range(length):
      # Left
      if i >= n:
        break
      location[0] -= 1
      i += 1
    for _ in range(length):
      # Down
      if i >= n:
        break
      location[1] -= 1
      i += 1
    length += 1
  return location`

  const pfss = `def squareSpiral(n):
  location = [0, 0]
  length = 1
  direction = 1
  axis = 0
  i = 0
  while i < n:
    for j in range(length):
      print(location)
      # Check if we're done
      if i >= n:
        return location
      location[axis] += direction
      i += 1

    # Every other time
    if axis == 1:
      length += 1
      # Flip between 1 and -1
      direction = -direction

    # Flip between 0 and 1 (x and y)
    axis ^= 1
  return location`

const plss = `def lineSquareSpiral(n):
  location = [0, 0]
  length = 1
  direction = 1
  axis = 0
  i = 0
  while i < n:
    if i + length > n:
      location[axis] += direction * (n - i)
      return location
    location[axis] += direction * length
    i += length

    # Every other time
    if axis == 1:
      length += 1
      # Flip between 1 and -1
      direction = -direction

    # Flip between 0 and 1 (x and y)
    axis ^= 1
  return location`

const pmss = `def mathSquareSpiral(n):
  # Perfect squares are located sqrt(n) steps from the origin
  lowerRoot = math.floor(math.sqrt(n))
  anchor = lowerRoot ** 2
  location = [-lowerRoot // 2, lowerRoot // 2]
  # If n is not a perfect square, adjust the y location by remaining steps
  # If remaining steps > current line length, continue on the x axis
  location[1] -= min(n - anchor, lowerRoot)
  location[0] += max(n - anchor - lowerRoot, 0)

  # If the lower-bound root length is odd, mirror the location
  if (lowerRoot % 2) != 0:
    location = [-location[0], -location[1]]
  
  return location`

const csss = `int simpleSquareSpiral()
{
  int location[2] = {0, 0};
  int length = 1;
  while (1)
  {
    for (int i = 0; i < length; i++)
    {
      location[0] += 1;
    }
    for (int i = 0; i < length; i++)
    {
      location[1] += 1;
    }
    length++;
    for (int i = 0; i < length; i++)
    {
      location[0] -= 1;
    }
    for (int i = 0; i < length; i++)
    {
      location[1] -= 1;
    }
    length++;
  }
}`

const cfss = `int squareSpiral(int n, int location[])
{
  int length = 1;
  int direction = 1;
  int axis = 0;
  int i = 0;
  while (i < n)
  {
    for (int j = 0; j < length; j++)
    {
      printf("%d,%d \n", location[0], location[1]);
      // Check if we're done
      if (i >= n)
      {
        return *location;
      }
      location[axis] += direction;
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
  return *location;
}`

const clss = `int lineSquareSpiral(int n, int location[])
{
  int length = 1;
  int direction = 1;
  int axis = 0;
  int i = 0;
  while (i < n)
  {
    printf("%d,%d \n", location[0], location[1]);
    if (i + length > n)
    {
      location[axis] += direction * (n - i);
      i += length;
    }
    location[axis] += direction * length;
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
  return *location;
}`

const cvss = `int verboseSquareSpiral(int n, int location[])
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
        return *location;
      }
      location[0] += 1;
      i++;
    }
    for (int j = 0; j < length; j++)
    {
      // Up
      if (i >= n)
      {
        return *location;
      }
      location[1] += 1;
      i++;
    }
    length++;
    for (int j = 0; j < length; j++)
    {
      // Left
      if (i >= n)
      {
        return *location;
      }
      location[0] -= 1;
      i++;
    }
    for (int j = 0; j < length; j++)
    {
      // Down
      if (i >= n)
      {
        return *location;
      }
      location[1] -= 1;
      i++;
    }
    length++;
  }
  return *location;
}
`

const cmss = `int mathSquareSpiral(int n, int *location)
{
  int lowerRoot = sqrt(n);
  // C uses true integer division, which changes many cases
  // In Python for example, -1 // 2 == -1, but in C it is 0
  // We can adjust by subtracting 1 from x and y if the root is odd
  int isOdd = lowerRoot % 2 != 0;
  int anchor = pow((int) lowerRoot, 2);
  location[0] = (-lowerRoot-isOdd)/2;
  location[1] = (lowerRoot-isOdd)/2;

  location[1] -= fmin(n - anchor, lowerRoot);
  location[0] += fmax(n - anchor - lowerRoot, 0);

  if (isOdd)
  {
    location[0] = -location[0];
    location[1] = -location[1];
  }
}`











const rmss = mss

const codestrings = {javascript: {iss:sss, fss:fss, lss:lss, vss:vss, mss:mss, rmss:mss}, python: {iss:psss, fss:pfss, lss:plss, vss:pvss, mss:pmss, rmss:pmss}, c: {iss:csss, fss:cfss, lss:clss, vss:cvss, mss:cmss, rmss:cmss}}
export default codestrings;