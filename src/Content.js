/** @format */

import { React, useState } from "react";
import AIImage from "./AI.png";
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
			billion squares until it starts to choke up.
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
			If you're trying to draw a spiral
		</div>
	);
}
function Text6() {
	return <div className='textBlock'></div>;
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

function Footnote3() {
	return (
		<div>
			<CodeBlock
				codeString={codestrings["javascript"].fss}
				language={"javascript"}
				setLanguage={Footnote1}
			/>
		</div>
	);
}

const Footnotes = [Footnote1, Footnote2, Footnote3];
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
