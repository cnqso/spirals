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
				if (n <= i) {
					return loc;
				}
				loc[k] += dir;
				i++;
			}
		}
		len++;
		dir = ~dir + 1;
	}
}

function longSquareSpiral(n) {
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
}

function lineSquareSpiral(n) {
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
}