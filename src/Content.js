/** @format */

import { React, useState } from "react";
import AIImage from "./AI.png";
import CodepenScreenshot from "./CodepenScreenshot.png";
import Collapse from "@mui/material/Collapse";
import CodeBlock from "./CodeBlock/CodeBlock";
import codestrings from "./codestrings";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import img2n from "./Images/2n.png";
import imgn2 from "./Images/n2.png";
import img4n2 from "./Images/4n2.png";
import gif4n2 from "./Images/4n2.gif";
import gif4n21 from "./Images/4n2+1.gif";

const MathTalics = ({ m }) => {
	return (
		<span style={{ fontSize: "0.8em" }}>
			{" "}
			<InlineMath math={m} />{" "}
		</span>
	);
};

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

function Text3({ code }) {
	return (
		<div className='textBlock'>
			This approach gets us there. The function moves one square at a time and updates the location
			variable at each new square, forever. To make it practical we need to add bounds and output, but
			the function is already repetitive and verbose, and adding these things would make it even worse
			<Footnote num={3} extFootnote={code} /> We can make the function much more concise at the cost of
			some readability. The 4-step pattern is simple to keep track of: every step we change the axis
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
			The time complexity is <MathTalics m='O(n)' /> and the space complexity is <MathTalics m='O(1)' />
			. The code can accept up to ~1 billion squares until it starts to choke up
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
			bottom loop with a single pass, and modified our end check from "if <i>i</i> is greater than n,
			return" to "if <i>i</i> + <i>len</i> is greater than <i>n</i>, do a partial pass then return". Now
			the time to reach out square is dependent on the number of sides we have to draw instead of the
			number of squares. This brings it to <MathTalics m='O\sqrt{n}' /> time complexity. You can
			actually visualize this pretty well if you set <i>n</i> to a high value: it linearly approaches
			the edges of the spiral from the center. Cool!
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
			Every 2nd edge of the spiral ends at a square number which is either diagonally North-West from
			[0,0] or diagonally South-East from [1,0]
			<Footnote num={7} /> If we find the closest square number less than or equal to <i>n</i>, we can
			simply take the difference between that number and <i>n</i> to "skip" directly to our desired
			coordinates. We have to do a little bit of math to determine which direction(s) to move from the
			square number, and then we're there. Since this is a single-step solution, it's hard to make a fun
			animation like the past two. Instead, I'll just try to show off how fast this solution is. The
			block below will calculate a number of random spiral positions within a given range. It will
			accept a quantity up to 1000 (each point is a DOM element so it might hit your performance) and a
			range up to 1e29. Try it out!
		</div>
	);
}
function Text7({ code }) {
	return (
		<div className='textBlock'>
			Pretty cool! After a little bit of performance tuning
			<Footnote num={8} extFootnote={code} punctuation={", "} /> this function can calculate the
			coordinates of any given point in a square spiral up to 1e29 in 5ms-150ms depending on the
			language
			<Footnote num={9} /> This is where my exploration ended. There are many more avenues of inquiry
			like quick coordinate-neighbor calculation
			<Footnote num={5} punctuation={", "} /> deriving a square's number from coordinates, and many
			other things which others have explored at length already
			<Footnote num={10} />
			<br />
			<br />
			You may be wondering if there is practicality to any of this. I would answer with "yes, barely".
			<ul>
				<li>
					There is, of course, the minor performance gain I get from using the{" "}
					<MathTalics m='O(1)' /> rather than <MathTalics m='O(n)' />
					solution in my web app. If the app were to scale, this would be tangible.
				</li>{" "}
				<li>
					For any infinite 2D grid, organizing data is difficult to do efficiently with usual tools.
					In a NoSQL database, for example, a 2D array of indeterminate size is a nightmare to
					organize. You have to make one of two sacrifices: either you check the size of the
					subarrays on each read, or you seperately store and maintain the current size of each
					subarray. Since negative numbers are not supported by arrays, you also have to maintain a
					global offset for use on the frontend. Using a square spiral function is a fast way to
					store the location of any positive or negative point in a single positive integer without
					ever needing to update anything.
				</li>
				<li>
					It allows for a faster generation and analysis of{" "}
					<a href='https://en.wikipedia.org/wiki/Ulam_spiral' target='_blank' rel='noreferrer'>
						Ulam Spirals
					</a>{" "}
					and similar patterns.
				</li>
			</ul>
		</div>
	);
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
			When we draw a square spiral, we are drawing a sequence of squares. Each square's coordinates is
			tied to its position in the sequence. For example, the first square (<i>n</i> = 0) will always be
			at (0, 0), the second will always be at (1, 0), the 64th will always be at (-4, 4), etc. But so
			far we have only tried one type of sequence: calculating the coordinates for every single square,
			every value of <i>n</i>. We don't have to do that if we don't want to. For example, what if you
			skipped every odd square? The new sequence would be <i>2n</i>, and it would look like this.
			<br />
			<img src={img2n} style={{ display: "block", margin: "auto" }} />
			<br />
			You end up with a checkerboard pattern! This is obvious once you think about it but I was shocked
			when I realized. When I talk about "patterns" I am specifically referring to the relationship
			between a given sequence and the geometry it creates in its output. There is some weird, cool
			stuff in here.
			<br />
			The most common pattern that you can see on the grid is based around the series 4n<sup>2</sup>.
			That sequence looks like this.
			<br />
			<img src={img4n2} style={{ display: "block", margin: "auto" }} />
			<br />
			The thing that makes this sequence so interesting is that you can use it to create a similar radii
			in any of the 8 possible directions. By adding or subtracting <i>n</i> from the sequence, you can
			get the same sequence but rotated clockwise or counterclockwise by 45 degrees. Here's a
			visualization of all 8 (technically 9) possible sequences.
			<br />
			<img src={gif4n2} style={{ display: "block", margin: "auto" }} />
			<ul type='1'>
				<li>
					4n<sup>2</sup> - 3n
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
					4n<sup>2</sup> <br /> One of the primary "anchors" I use for the <MathTalics m='O(1)' />{" "}
					solution below
				</li>
				<li>
					4n<sup>2</sup> + 2n
					<br />
					Every even integer squared plus that integer. Think of it like (2n)<sup>2</sup> + 2n or
					2n*(n+1)
				</li>
				<li>
					4n<sup>2</sup> + 4n
					<br />
					The mirror to pattern 1. 4n<sup>2</sup> - 4n generates the same pattern.
				</li>
			</ul>
			These strong patterns are present outside of the origin as well. For example, our second anchor
			point in the mathematically derived solution below is the pattern of every odd square that we find
			diagonally downward from [1,0]. This particular pattern is the same as pattern 7 above but shifted
			by 1. We can actually find patterns in 5 of the 8 of this square's radii.
			<br />
			<img src={gif4n21} style={{ display: "block", margin: "auto" }} />
			<ul type='1'>
				<li>
					{" "}
					4n<sup>2</sup> + n + 1 No pattern until 5
				</li>
				<li>
					{" "}
					4n<sup>2</sup> + 1 No pattern until 6{" "}
				</li>
				<li>
					{" "}
					4n<sup>2</sup> + 7n + 1 No pattern until 12
				</li>
				<li>
					4n<sup>2</sup> + 8n + 1 No pattern until 13
					<br />{" "}
				</li>
			</ul>
			In all 8 squares bordering the origin, you see the same pattern with 5 different calculable radius
			patterns. I spent an afternoon trying to find a generalizable formula for this to no avail. Here's
			what I can tell you:
			<br />
			The 5 common radial patterns above can be <i>almost</i> be generalized for all squares. The path
			which moves directly away from the origin is 4n<sup>2</sup> + the value of the starting square + a
			value dependent on the number of sides/edges which have been visited so far. Taking <i>m</i> to be
			the starting square, and <i>s</i> to be the number of sides/edges visited so far, this would be
			written as 4n<sup>2</sup> + (4+s)n + m. Without a means of deriving <i>s</i> in terms of <i>m</i>,
			I cannot generalize any of the radial formulas. This could be solved programattically, but this
			trivializes the problem either way. If you can generalize <i>s</i> in terms of <i>m</i> without
			any conditional statements or floor/ceiling operations, I'll send you $200. Here's a table of the
			first 50 values <Footnote num={6} />
			<br />
			<br />
			Last few observations in this novel of a footnote:
			<ul>
				<li>
					All diagonals off of the origin are a product of each even square number. Top left is (2n)
					<sup>2</sup> (every even square), top right is (2n)<sup>2</sup> - 2n, bottom left is (2n)
					<sup>2</sup> + 2n, bottom right is (2n)<sup>2</sup> +/- 4n
				</li>
			</ul>
		</div>
	);
}

function Footnote6() {
	return <img src={CodepenScreenshot} style={{ display: "block", margin: "auto" }} />;
}
function Footnote7() {
	return (
		<div>
			{" "}
			Here is a visualization of these points.
			<img src={CodepenScreenshot} style={{ display: "block", margin: "auto" }} /> Every even number
			squared is in the North-West radius, and every odd number squared is in the South-East radius.
		</div>
	);
}
function Footnote9() {
	return (
		<div>
			I did benchmarks at n=144, n=1e6, and 1e29. I used a weird try/catch binary search to find each
			language's maximum acceptable input. I'm sure someone smarter than me could structure the function
			for any arbitarily large input, but since this is already well beyond the scope of practicality I
			am all set.
			{/* TODO: table */}
		</div>
	);
}

function Footnote10() {
	return (
		<div>
			<ul type='I'>
				<li>
					Jon Seymour has a{" "}
					<a
						href='https://jonseymour.medium.com/investigating-the-properties-of-a-square-spiral-6aa635a4d803'
						target='_blank'
						rel='noreferrer'>
						really excellent post
					</a>{" "}
					that cleverly uses circle geometry to only measure the edges of the spiral.
				</li>{" "}
				<li>
					Sander Evers wrote{" "}
					<a
						href='https://observablehq.com/@sanderevers/square-spiral-function'
						target='_blank'
						rel='noreferrer'>
						a post
					</a>{" "}
					which used a more functional approach to solve a similar problem.
				</li>
			</ul>
		</div>
	);
}

const Footnotes = [
	Footnote1,
	Footnote2,
	null,
	Footnote4,
	Footnote5,
	Footnote6,
	Footnote7,
	null,
	Footnote9,
	Footnote10,
];
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

//Remaining todos:
// X Convert all functions to other languages (Js, go?, python, rust? c?, haskell???)
// X   Impressive header
// X    Add button to ulan spiral to make prime + any other desired features (text on/off etc)
// Many pictures (wait until I'm done with the ulan component)
// Clean up "practicality" section for a shorter smoother transition to final toy. Say goodbye+thanks before the sequencer.
// MUI "css" (remember to use the github theme creator)
// General CSS simplification + determinations

// Replace benchmark promise with try catch binary search code
// Cut down content or move to footnotes
// Add table of first 50 values
// Set min and max value for all inputs (also make the unlock button force grid view)
// Set limits to katex parset (log, sqrt, etc)
