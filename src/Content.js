/** @format */

import { React, useState } from "react";
import AIImage from "./AI.png";
import CodepenScreenshot from "./CodepenScreenshot.png";
import Collapse from "@mui/material/Collapse";
import CodeBlock from "./CodeBlock/CodeBlock";
import codestrings from "./codestrings";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

function Text1() {
	return (
		<div className='textBlock'>
			I recently ran into a problem which seemed simple: I have a web app where many users build cities
			next to each other on an infinite grid of square plots. I wanted to make sure that users were
			often connected to many other players, and I also wanted to make sure that players who joined
			earlier would be closer to the center, while players who joined later would be further away.
			Lastly, I wanted a way that I could record user location data with a single positive integer
			<Footnote num={1} /> I decided that the best way to accomplish this was to have players "spiral"
			around a central plot.
			<br />
			<br />
			<img src={AIImage} />
		</div>
	);
}

function Text2() {
	return (
		<div className='textBlock'>
			To accomplish this, I needed a function that can acces the coordinates of any square <i>n</i> on a
			spiral. I assumed that there would be a well-known answer to this problem, but my search found a
			massive range of different approaches
			<Footnote num={2} />I wasn't able to find anything that I was happy with, so I decided to take a
			shot at it myself. I started by just drawing a bunch of spirals and seeing what I noticed.
			<br />
			<br />
			<img src={AIImage} />
			<br />
			<br />
			The first thing you might notice is that we have a constant four-phase movement pattern. Lets
			think of <i>len</i> as the length of each "side" of the spiral, starting at <i>len</i> = 1. The
			pattern looks like this:
			<ol type='1'>
				<li>
					Increment <i>x</i> by <i>len</i>
				</li>
				<li>
					Increment <i>y</i> by <i>len</i>
				</li>
				<li>
					Increment <i>len</i> by 1
				</li>
				<li>
					Decrement <i>x</i> by <i>len</i>
				</li>
				<li>
					Decrement <i>y</i> by <i>len</i>
				</li>
				<li>
					Increment <i>len</i> by 1
				</li>
			</ol>
			This pattern continues forever. The order is a bit novel, but other than that it seems like a
			pretty simple loop. If I try to write this in javascript, it looks like this:
		</div>
	);
}

function Text3({ footnote }) {
	return (
		<div className='textBlock'>
			This approach gets us there. The function moves one square at a time and updates the location
			variable at each new square, forever. To make it practical we need to add bounds and output, but
			the function is already repetitive and verbose, and adding these things would make it even worse
			<Footnote num={3} extFootnote={footnote} /> We can make the function much more concise at the cost
			of some readability. The 4-step pattern is simple to keep track of: every step we change the axis
			we're moving along (x or y), and every two steps we increase the length <i>len</i> and change the
			direction we're moving in (positive or negative). We will end up a nested loop: a top level which
			flips the axis, flips the direction, and increases <i>len</i> at the appropriate time, and a
			bottom level which iterates the spiral for <i>len</i> steps. Since the desired number of squares{" "}
			<i>n</i> is not guaranteed to be divisible by <i>len</i>, we will have to check if we've reached
			the end of the spiral at each bottom level loop. Below is my implementation of this function. Use
			the slider on the right to text different values of <i>n</i>.
		</div>
	);
}
function Text4() {
	return (
		<div className='textBlock'>
			This functions works great for me, and is what I ended up using to generate the spiral. It is very
			short at 23 lines and it fit for multiple uses. You can put load bearing functions at every step
			(in the above example I put "drawSquare(location) to draw the spiral on a canvas"), or you can
			call it once to receive the coordinates of the square at position <i>n</i>. It is also very fast.
			The time complexity is O(n), and the space complexity is O(1). The code can accept up to ~1
			billion squares until it starts to choke up
			<Footnote num={4} />
			<br />
			But what if you want to draw a square spiral but don't care about the individual squares? If you
			wanted to draw a square spiral in a game for example, stopping at each pixel to iterate and run
			checks is time wasted.
			<br />
			One easy way we could improve this is to stop moving one square at a time. Since we know the
			length of each side of the spiral ahead of time, we can 'skip' to the end instead of moving one
			square at a time. The only problem here is that we could end up skipping over the square we want,
			so we will have to check for the target square at each step.
		</div>
	);
}
function Text5() {
	return (
		<div className='textBlock'>
			Very few changes needed to be made to the original function to make this work. We replaced the
			bottom loop with a single pass, and modified our end check from "if i is greater than n, return"
			to "if i + len is greater than n, do a partial pass then return". Now the time to reach out square
			is dependent on the number of sides we have to draw instead of the number of squares. This brings
			it to{" "}
			<span style={{ fontSize: "0.8em" }}>
				<InlineMath math={"O\\sqrt{n}"} />
			</span>{" "}
			time complexity. You can actually visualize this pretty well if you set <i>n</i> to a high value:
			it linearly approaches the edges of the spiral from the center. Cool!
			<br />
			If we want to draw a spiral this is a pretty solid solution, but we can't be stop here, right? For{" "}
			<i>finding the coordinates</i> of some given square this is still overkill. It would be great if
			we could find a way to calculate the coordinates of a given square <i>n</i> without having to draw
			the whole spiral - a non-iterative solution. I took a look at the patterns that show up in the
			spiral <Footnote num={5} /> and I found a potential solution that I think is pretty cool.
		</div>
	);
}
function Text6() {
	return (
		<div className='textBlock'>
			Every 2 steps in the spiral ends at a square number which is either diagonally North-West from
			[0,0] if even or diagonally South-East from [1,0] if odd. If we find the closest square number
			less than or equal to <i>n</i>, we can simply take the difference between that number and{" "}
			<i>n</i> to "skip" directly to our desired coordinates. We have to do a little bit of math to
			determine which direction(s) to move from the square number, and then we're there. Since this is a
			single-step solution, it's hard to make a fun animation like the past two. Instead, I'll just try
			to show off how fast this solution is.
		</div>
	);
}
function Text7() {
	return <div className='textBlock'></div>;
}
function Text8() {
	return <div className='textBlock'></div>;
}
function Footnote1() {
	return (
		<div>
			Recording user location data in a 2D array was the most convenient and fast option for my app.
			However, an infinite plane will necessarily require negative coordinates, which are not supported
			by arrays. This requires a "virtual" negative space accomplished by an automatic offset of the
			array so that the lowest in-use x and y values on the plot are above 0. This could be done by just
			offsetting all users' x and y coordinates whenever needed, but this would require many error-prone
			changes to user data and, for reasons specific to my backend, would greatly increase the database
			load per-user. We could also just put everyone at some arbitrarily large X and Y offset, but this
			1. would be very hacky and 2. would increase unecessary database usage by a small but ugly amount.
		</div>
	);
}

function Footnote2() {
	return (
		<div>
			The first was very theoretical: trying to find a single formula for a point on a spiral given n.
			This was very promising and exactly what I was looking for, but the solutions were incredibly
			complex, both in terms of understanding and computation. The second was practical and what I will
			brazenly call the "naive" approach. This approach was to record every visited square and try to
			turn right whenever possible. This was more programmatic, sure, but the amount of time needed for
			each step and the balooning memory complexity of the operation was untenable to me. My solution
			didn't need to be efficient, but I was frustrated that what I saw as a simple problem had no
			simple and fast solution.
			<br />
			<Footnote num={1} />
		</div>
	);
}

function Footnote4() {
	return (
		<div>
			If you're interested in benchmarking or comparing any functions, you can check out the codepen{" "}
			<a href='https://codepen.io/cnqso/pen/QWBQMbo' target='_blank' rel='noopener noreferrer'>
				here
			</a>
			. This is a spartan implementation that runs the functions directly without the overhead that
			comes from React and canvas animations.
		</div>
	);
}

function Footnote5() {
	return (
		<div>
			So when I talk about "patterns" I am specifically referring to the relationship between a square's
			location and its placement <i>n</i> along the spiral. There is some weird, cool stuff in here.
			Some of it makes clear sense, like the pattern of square numbers I talk about below. Some of it,
			on the other hand, is completely foreign to me. You can check out the codepen
			<Footnote num={4} punctuation={" "} />
			for a visual representation of this. Maybe you can find some patterns I missed!
			<br />
			If you follow the radii of the spiral coming straight and diagonally from the origin, you find a
			symetrical pattern that starts at <i>n</i> = 4.
			<br />
			<img src={CodepenScreenshot} style={{ display: "block", margin: "auto" }} />
			<ol type='1'>
				<li>
					0, 4, 16, 36, 64... = 4n^2 <br /> Every even integer squared. One of the primary "anchors"
					I use for the O(1) solution below
				</li>
				<li>0, 3, 14, 33, 60... = 4n^2 - n</li>
				<li>0, 2, 12, 30, 56... = 4n^2 - 2n</li>
				<li>
					0, 1, 10, 27, 52... = 4n2 - 3n
					<br />
					Every{" "}
					<a
						href='https://en.wikipedia.org/wiki/Decagonal_number'
						target='_blank'
						rel='noopener noreferrer'>
						decagonal number.
					</a>
				</li>
				<li>
					0, 8, 24, 48, 80... = 4n^2 + 4n
					<br />
					The mirror to pattern 1. 4n^2 - 4n generates the same pattern.
				</li>
				<li>0, 7, 22, 45, 76... = 4n^2 + 3n</li>
				<li>
					0, 6, 20, 42, 72... = 4n^2 + 2n
					<br />
					Every even integer squared plus that integer. You can think of it as (2n)^2 + 2n or 2n *
					(n+1)
				</li>
				<li>5, 18, 39, 68... = 4n^2 + n</li>
			</ol>
			These strong patterns are present outside of the origin as well. For example, our second anchor
			point in the mathematically derived solution below is the pattern of every odd square that we find
			diagonally downward from [1,0]. This particular pattern is the same as pattern 7 above but shifted
			by 1. We can actually find patterns in 5 of the 8 of this square's radii.
			<br />
			<img src={CodepenScreenshot} style={{ display: "block", margin: "auto" }} />
			<ol type='1'>
				<li>
					1, 3, 15, 35, 63 = No pattern unless we begin at 3<br />{" "}
				</li>
				<li> 1, 2, 13, 32, 59... = No pattern unless we begin at 2</li>
				<li> 1, 11, 29, 55... = 4n2 + 6n + 1</li>
				<li> 1, 10, 27, 52... = 4n2 + 5n + 1</li>
				<li> 1, 9, 25, 49... = 4n2 + 4n + 1</li>
				<li> 1, 8, 23, 46... = 4n2 + 3n + 1</li>
				<li> 1, 7, 21, 43... = 4n2 + 2n + 1</li>
				<li> 1, 0, 5, 18... = No pattern. </li>
			</ol>
			In all 8 squares bordering the origin, you see the same pattern with 5 different calculable radius
			patterns. I spent an afternoon trying to find a generalizable formula for this to no avail. Here's
			what I can tell you:
			<br />
			The 5 common radial patterns above can be <i>almost</i> be generalized for all squares. The path
			which moves directly away from the origin is 4n^2 + the value of the starting square + a value
			dependent on the number of sides/edges which have been visited so far. Taking <i>m</i> to be the
			starting square, and <i>s</i> to be the number of sides/edges visited so far, this would be
			written as 4n^2 + (4+s)n + m. Without a means of deriving <i>s</i> in terms of <i>m</i>, I cannot
			generalize any of the radial formulas. This could be solved programattically, but this trivializes
			the problem either way. If you can generalize <i>s</i> in terms of <i>m</i> without any
			conditional statements or floor/ceiling operations, I'll send you $200. Here's a table of the
			first 50 values <Footnote num={6} />
			<br />
			<br />
			Last few observations in this novel of a footnote:
			<ol>
				<li>
					If you display with a checkerboard pattern, every odd number is one color and every even
					number is the other. This is obvious once you think about it but I was shocked when I
					realized.
				</li>
				<li>
					All diagonals off of the origin are a product of each even square number. Top left is
					(2n)^2 (every even square), top right is (2n)^2 - 2n, bottom left is (2n)^2 + 2n, bottom
					right is (2n)^2 +/- 4n
				</li>
			</ol>
		</div>
	);
}

function Footnote6() {
	return <img src={CodepenScreenshot} style={{ display: "block", margin: "auto" }} />;
}

const Footnotes = [Footnote1, Footnote2, null, Footnote4, Footnote5, Footnote6];
function Footnote({ num, punctuation = ". ", extFootnote }) {
	const [show, setShow] = useState(false);
	return (
		<>
			<span
				className={"footnoteButton"}
				onClick={() => {
					setShow(!show);
				}}>
				<sup style={{ color: "#de731d" }}>[{num}]</sup>
				{punctuation}
			</span>

			<Collapse in={show} timeout='auto' unmountOnExit>
				<div className='footnote'>
					<div
						className='footnoteButton'
						onClick={() => {
							setShow(false);
						}}
						style={{ textAlign: "center", marginTop: 0, fontSize: "2em" }}>
						<b>^</b>
					</div>

					{extFootnote ? extFootnote() : Footnotes[num - 1]()}
				</div>
			</Collapse>
		</>
	);
}

const Content = [Text1, Text2, Text3, Text4, Text5, Text6, Text7, Text8];

export default Content;

//Simple introduction to problem
// Code block
// Visual representation next to code block

// But what if bla bla bla

// Code block
// Visual representation next to code block

/*

<Square Spirals> Maybe this is made of blocks. Soft fade in otherwise
<Site, github> in top right corner
<Big header image of a bunch of squares doing cool patterns>
This is useful for operations for which n is small or for which you need to do
an operation on each square (as is the case in these visualizations)





<Runs/Laps>

This approach is one I saw on my first google search -- 
it didn't apply to my immediate problem but got me thinking.
https://jonseymour.medium.com/investigating-the-properties-of-a-square-spiral-6aa635a4d803
Here, instead of iterating through a spiral of points we iterate through a spiral of lines.
This is much faster at drawing a square spiral, though it lacks some of the practicality.
We could, however, combine the two approaches to get a function which arrives at individual 
coordinates very quickly. Here is the basic structure: run through entire laps to start, adding the
length of the laps to a tally each time. If the square n you are looking for is in the next lap,
calculate how many squares away it is and only do the portion of the lap it takes you to
get to that square. You now have your coordinate.
<code and example>

But now that I've tried a multi-phase algorithm, I can't help but wonder if we could do more.
"Skip ahead until you're close, then walk over" is a good idea, it increased our capacity from
1 billion 10 billion (or whatever). But what if we could skip faster?

You may not have noticed yet, but if we label the squares with numbers you might notice a pattern with the corners

(square numbers)


(binary search square numbers?)



Header - Image, text, personal icons, etc
Text - can be in box or not. Full width
Image - can be in box or not. 3/4 - full width
Solo Code - 3/4 width
Code with squares - full width
    Discrete square mode, linear mode, coordinate mode
	1. Finished!
	2. Same as before, but try rendering the "runs" (better version of run)
	3. Coordinate mode -- could show on scatter plot?


*/
