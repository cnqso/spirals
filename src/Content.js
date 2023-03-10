/** @format */

import { React, useState, useRef } from "react";
import Collapse from "@mui/material/Collapse";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
import cityPlots from "./Images/cityPlots.png";
import drawnSquares from "./Images/drawnSquares.png";
import ConditionalAnswer from "./Images/ConditionalAnswer.png";
import CosineAnswer1 from "./Images/CosineAnswer1.png";
import CosineAnswer2 from "./Images/CosineAnswer2.png";
import Summation from "./Images/Summation.png";
import img2n from "./Images/2n.png";
import imgn2 from "./Images/n2.png";
import img4n2 from "./Images/4n2.png";
import gif4n2 from "./Images/4n2.gif";
import gif4n21 from "./Images/4n2+1.gif";

const MathTalics = ({ m }) => {
	return (
		<span style={{ fontSize: "0.95em" }}>
			{" "}
			<InlineMath math={m} />{" "}
		</span>
	);
};

function Text1() {
	return (
		<>
			<div className='textBlock'>
				Recently I've been working on a web app where users build cities on an infinite grid of square
				plots. I wanted to make sure that users were often close to many other users, and I also
				wanted to make sure that users who joined earlier would be closer to the center, while users
				who joined later would be further away. Lastly, I wanted a way that I could record user
				location data with a single positive integer
				<Footnote num={1} /> I decided that the best way to accomplish this was to have new plots
				"spiral" around an origin.
			</div>
			<br />
			<img src={cityPlots} alt="A drawing of 3 city plots with the 4th being places in a spiraling pattern"/>
			<br />
		</>
	);
}

function Text2() {
	return (
		<>
			<div className='textBlock'>
				To accomplish this, I needed a function that can access the coordinates of any square{" "}
				<MathTalics m='n' /> on a spiral. Square spirals are not a new concept ⁠— some of you probably
				recognize the concept from the{" "}
				<a href='https://en.wikipedia.org/wiki/Ulam_spiral' target='_blank' rel='noreferrer'>
					Ulam Spiral
				</a>
				, a square spiral which only shows the points for which <MathTalics m='n' /> is prime. I
				assumed that there would be a well-known method to calculate the coordinates of points on a
				square spiral, but my search found a wide range of different approaches
				<Footnote num={2} />
				None of these were a great fit for my use case, so I decided to take a shot at it myself. I
				started by drawing one manually and seeing what I noticed.
			</div>
			<br />
			<img src={drawnSquares} alt="A drawing of 47 squares, numbered and arranged in a spiral pattern" />
			<br />
			<div className='textBlock'>
				The first thing you might notice is that we have a constant four-phase movement pattern. Lets
				think of <i>length</i> as the number of squares on each continuous "side" of the spiral,
				starting at <i>length</i> = 1. The pattern, starting at the origin (0,0), looks like this:
				<ol type='1'>
					<li>
						Increment <i>x</i> by <i>length</i>
					</li>
					<li>
						Increment <i>y</i> by <i>length</i>
					</li>
					<li>
						Increment <i>length</i> by 1
					</li>
					<li>
						Decrement <i>x</i> by <i>length</i>
					</li>
					<li>
						Decrement <i>y</i> by <i>length</i>
					</li>
					<li>
						Increment <i>length</i> by 1
					</li>
				</ol>
				This pattern continues forever. The order is a bit novel, but other than that it seems like a
				pretty simple loop. Translated to code it would look like this:
			</div>
		</>
	);
}

function Text3({ code }) {
	return (
		<div className='textBlock'>
			This approach gets us there. The function moves one square at a time and updates the location
			variable at each new square, forever. To make it practical we need to add bounds and output, but
			this would make the function unbearably repetitive
			<Footnote num={3} extFootnote={code} /> We can make the function much more concise at the cost of
			some readability. The 4-step pattern is simple to keep track of: we change the axis we're moving
			along (x or y) on every step, and we increase the <i>length</i> and change our direction (positive
			or negative) on every second step. We will end up a nested loop: a top level which flips the axis,
			flips the direction, and increases <i>length</i>, and a bottom level which iterates the spiral for{" "}
			<i>length</i> steps. Since we could reach our final iteration in the middle of the lower loop, we
			will have to check for the end at every step. Below is my implementation of this function ⁠— Use
			the slider on the right to test different values of <MathTalics m='n.' />
		</div>
	);
}
function Text4() {
	return (
		<div className='textBlock'>
			This function works pretty well and might be all you every need. It is very short at 23 lines and
			it fit for multiple uses. You can put load bearing functions at every step (in the above example I
			put "drawSquare(loc) to draw the spiral on the canvas), or you can call it once to receive the
			coordinates of square <MathTalics m='n.' /> The time complexity is <MathTalics m='O(n)' /> and the
			space complexity is <MathTalics m='O(1).' />
			If you remove the drawing function, it can generate up to ~1 billion squares without choking up
			<Footnote num={4} />
			<br />
			<br />
			But what if you want to draw a square spiral but don't care about the individual squares? If you
			wanted to draw a square spiral in a game for example, stopping at each pixel to iterate and run
			checks is time wasted. One easy way we could improve this is to stop moving one square at a time.
			Since we know the length of each side of the spiral ahead of time, we can 'skip' to the end
			instead of moving one square at a time. The only problem here is that we could end up skipping
			over the square we want, so we will have to check for the target square at each step.
		</div>
	);
}
function Text5() {
	return (
		<div className='textBlock'>
			As you can see, all we had to do was replace the length-iteration loop with a check and add some
			math before we return the location. Now the time to reach out square is dependent on the number of
			sides we have to draw rather than the number of squares. This brings it to{" "}
			<MathTalics m='O\sqrt{n}' /> time complexity. You can actually visualize this pretty well if you
			set <MathTalics m='n' /> to a high value: it linearly approaches the edges of the spiral from the
			center. Cool!
			<br />
			<br />
			If we want to draw a spiral this is a pretty solid solution, but we can't be stop here, right?
			This is still overkill if our goal is to find the coordinates of any given square. Even with the
			faster solution, the iterative approach limits the practicality of the function. I took a look at
			the patterns that show up in the spiral <Footnote num={5} punctuation=',' /> and I found a
			solution that I think is pretty cool.
		</div>
	);
}
function Text6() {
	return (
		<div className='textBlock'>
			Every other edge of the spiral ends at a square number which is either diagonally Northwest from
			[0,0] or diagonally Southeast from [1,0]
			<Footnote num={6} /> If we find the closest square number less than or equal to{" "}
			<MathTalics m='n,' /> we can simply take the difference between that number and{" "}
			<MathTalics m='n' /> to "skip" directly to our desired coordinates. We just have to do a little
			bit of math to determine how far and in which direction to move. Since this is a single-step
			solution, it's hard to make a fun animation like the previous two. Instead, I'll just try to show
			off how fast this solution is. The block below will calculate a number of random spiral positions
			within a given range. It will accept a range up to 1e29. Try it out!
		</div>
	);
}
function Text7({ code }) {
	return (
		<div className='textBlock'>
			Pretty cool! This function can calculate the coordinates of any given point in a square spiral in
			a few milliseconds. This is decided to end my exploration. There are many more avenues of inquiry
			like quick coordinate-neighbor calculation
			<Footnote num={5} punctuation={", "} /> deriving a square's number from coordinates, and many
			other things which others have explored at length by others
			<Footnote num={7} />
			<br />
			<br />
			What's the practicality of any of this?
			<ul>
				<li>
					There is, of course, a minor performance gain I get from using the <MathTalics m='O(1)' />{" "}
					rather than <MathTalics m='O(n)' />
					solution in my web app. This doesn't matter much now, but would be a noticeable
					improvement at scale.
				</li>{" "}
				<li>
					It's a novel and decently efficient way to store 2D location data in a single integer.
					There are some (relatively niche) cases where this method is probably the most
					bandwidth-efficient way to store location information in a database.
				</li>
				<li>
					It allows for noticeably faster generation and analysis of Ulam Spirals and similar
					patterns.
				</li>
			</ul>
			<br />
			Thanks for reading. To close, here's a tool you can use to explore some of the spiral patterns
			yourself. Let me know if you find anything interesting!
		</div>
	);
}
function Text8() {
	return <div className='textBlock'></div>;
}
function Footnote1() {
	return (
		<div>
			Recording user location data in a 2D array was the most intuitive option, but an infinite plane
			will necessarily require negative coordinates, which are not supported by arrays. This requires a
			"virtual" negative space accomplished by an automatic offset of the array so that the lowest
			in-use x and y values on the plot are above 0. This could be done by offsetting all users' x and y
			coordinates whenever needed, but this would require many error-prone changes to user data and, for
			reasons specific to my backend, would greatly increase the database load per-user. We could also
			just put everyone at some arbitrarily large X and Y offset, but this would be too ugly of a
			solution for a hobby project. I needed my back end to have some layer of abstraction which allowed
			for offsets to be made without directly editing user data. Using a single positive integer is a
			scaleable and NoSQL-friendly way to do this.
		</div>
	);
}

function Footnote2() {
	return (
		<div>
			The first is the naive approach: move one square forward, try to turn left and draw a
			square/point. It's simple and intuitive, the way you might program a square-spiral drawing robot.
			However, it requires that you keep track of every square you visit, which will eventually be quite
			a bit. Even if you add some restriction like "only store coordinates that are similarly distant
			from the origin as the current coordinate", you are still operating at{" "}
			<MathTalics m='O\sqrt{n}' /> space complexity along with the <MathTalics m='O(n)' /> time complexity.
			<br />
			The second was more complex: trying to find a single formula for a point on a spiral given{" "}
			<MathTalics m='n.' /> These solutions were very interesting. Most sources I was able to find all
			pointed back to the same thread on Mathematics Stack Exchange called {" "}
			<a
				href='https://math.stackexchange.com/questions/3157030/parametrizing-the-square-spiral'
				target='_blank'
				rel='noopener noreferrer'>
				"Parametrizing the square spiral"
			</a>
			. These solutions were all attempted with equations rather than algorithms. The most commonly
			cited solution, also the top response in the thread, looks like this.
			<br />
			<img src={ConditionalAnswer} alt="A screenshot of the first stackexchange answer" style={{ display: "block", margin: "auto" }} />I really like this
			solution. It was the most elegant expression of this problem in equative terms
			that I was able to find. My issue with this approach is that the marriage of algorithm and
			equation gives you the worst of both worlds. You would hope that the equative solution would
			remove the need for iterations and conditional logic, as they do for combinatorics
			problems. However, this solution hides logic in the variables (<MathTalics m='{\^n}' /> contains
			both a conditional and a floor operation) and then performs conditional logic using those variables.
			Since I'm trying to apply this solution to a program, I either want the full benefits of an
			equative approach (reduced complexity and easy copy-paste-ability) or the full benefits of an
			algorithmic approach (readability and modularity). Speaking of hiding logic in the variables,
			check out this solution from the same thread.
			<br />
			<img src={CosineAnswer1} alt="A screenshot of the second stackexchange answer" style={{ display: "block", margin: "auto" }} />
			This solution is fun. At first I was very excited: it opens with removing the conditional logic
			used in the above solution to determine what "side" of the spiral you're currently on. It does
			this using sine and cosine functions, approaching the square spiral like a traditional Archimedean
			spiral. Unfortunately, conditional logic comes in at the very last second.
			<br />
			<img src={CosineAnswer2} alt="A screenshot of the end of the second stackexchange answer" style={{ display: "block", margin: "auto" }} />
			Right at the finish line we get a new variable defined as the "greatest odd perfect square smaller
			than k". This requires not only a floor operation (<MathTalics m='\lfloor{\sqrt{k}}\rfloor^2' />
			), but also a conditional statement which may lead to another floor operation. We traded in 4
			conditionals for another floor operation. Not necessarily a bad deal, but it retains all the same
			problems as the first solution for my use case. The last solution looked like this:
			<br />
			<img src={Summation} alt="A screenshot of the final stackexchange answer" style={{ display: "block", margin: "auto" }} />
			This is the shortest answer you are likely to find anywhere. The fact that the x and y formulas
			are identical except for the swap betwen sine and cosine is pretty cool! However, this is even
			slower than the naive approach so we can safely rule it out.
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
			tied to its position in the sequence. For example, the first square (<MathTalics m='n=0' />) will
			always be at (0, 0), the second will always be at (1, 0), the 64th will always be at (-4, 4), etc.
			But so far we have only tried one type of sequence: calculating the coordinates for every single
			square, every value of <MathTalics m='n.' /> We don't have to do that if we don't want to. For
			example, what if you skipped every odd square? The new sequence would be <MathTalics m='2n' />,
			and it would look like this.
			<br />
			<img src={img2n} alt="A visualization of a grid of a 2n square spiral" style={{ display: "block", margin: "auto" }} />
			<br />
			You end up with a checkerboard pattern! This is obvious once you think about it but I was shocked
			when I realized. When I talk about "patterns" I am specifically referring to the relationship
			between a given sequence and the geometry it creates in its output. There is some weird, cool
			stuff in here.
			<br />
			The most common pattern that you can see on the grid is based around the series{" "}
			<MathTalics m='n^2' />. That sequence looks like this.
			<br />
			<br />
			<img src={imgn2} alt="A visualization of a grid of a n^2 square spiral" style={{ display: "block", margin: "auto" }} />
			You end up with every perfect square on the grid. You might notice that every even square is on a
			diagonal Northwest of the origin, and every odd square is on a diagonal Southeast from (1,0). We
			can isolate these sides to interesting effect. For even numbers, this would look like{" "}
			<MathTalics m='(2n)^2' />, which evaluates to <MathTalics m='4n^2' /> That sequence looks like
			this.
			<br />
			<img src={img4n2} alt="A visualization of a grid of a 4n^2 square spiral" style={{ display: "block", margin: "auto" }} />
			The thing that makes this sequence so interesting is that you can use it to create a similar radii
			in any of the 8 possible directions. By adding or subtracting <MathTalics m='n' /> from the
			sequence, you can get the same sequence but rotated clockwise or counterclockwise by 45 degrees.
			Here's a visualization of all 8 (technically 9) possible sequences.
			<br />
			<img src={gif4n2} alt="A gif of a grid cycling through square spirals from 4n^2-4n to 4n^2+4n" style={{ display: "block", margin: "auto" }} />
			<br />
			Some notable sequences:
			<ul type='1'>
				<li>
					<MathTalics m='4n^2-3n' />
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
					<MathTalics m='4n^2' /> <br /> Every even perfect square. One of the primary "anchors" I
					use for the <MathTalics m='O(1)' /> solution below.
				</li>
				<li>
					<MathTalics m='4n^2+2n' />
					<br />
					Every even integer squared plus that integer. Think of it like (2n)<sup>2</sup> + 2n or
					2n*(n+1)
				</li>
				<li>
					<MathTalics m='4n^2+4n' /> and <MathTalics m='4n^2-4n' />
					<br />
					Two squences that generate the same pattern of every odd perfect square minus one. The
					mirror to <MathTalics m='4n^2' />
				</li>
			</ul>
			These strong patterns are present outside of the origin as well. For example, our second anchor
			point in the mathematically derived solution below is the pattern of every odd square that we find
			diagonally downward from [1,0]. This particular pattern is the same as pattern 7 above but shifted
			by 1. 5 out of 8 of this square's radii can be drawn with a similar sequence.
			<br />
			<img src={gif4n21} alt="A gif of a grid cycling through square spirals from 4n^2+1 to 4n^2+8n+1"style={{ display: "block", margin: "auto" }} />
			<br />
			These 4 sequences do not cast a radii directly from the source:
			<ul type='1'>
				<li>
					{" "}
					<MathTalics m='4n^2+1' /> No pattern until 5
				</li>
				<li>
					{" "}
					<MathTalics m='4n^2+n+1' /> No pattern until 6{" "}
				</li>
				<li>
					{" "}
					<MathTalics m='4n^2+7n+1' /> No pattern until 12
				</li>
				<li>
					<MathTalics m='4n^2+8n+1' /> No pattern until 13
					<br />{" "}
				</li>
			</ul>
			In all 8 squares bordering the origin, you see the same pattern with 5 different calculable radius
			sequences. I spent an afternoon trying to find a generalizable formula for this to no avail.
			Here's what I can tell you:
			<br />
			The 5 common radial patterns above can <i>almost</i> be generalized for all squares. The path
			which moves directly away from the origin is <MathTalics m='4n^2' /> + the value of the starting
			square + the number of sides/edges which have been visited so far. Taking <MathTalics m='k' /> to
			be the starting square, and <MathTalics m='s' /> to be the number of sides/edges visited so far,
			this would be written as <MathTalics m='4n^2+n(s+4)+k.' /> Without a means of deriving{" "}
			<MathTalics m='s' /> in terms of <MathTalics m='k' />, I cannot generalize any of the radial
			formulas. This could be solved alogrithmically without much trouble, but this trivializes the
			problem. If you can generalize <MathTalics m='s' /> in terms of <MathTalics m='k' /> without
			conditional statements or floor/ceiling operations, I'll send you $100.
			<br />
			<br />
			Last few unrealted observations in this novel of a footnote:
			<ul>
				<li>
					All diagonals off of the origin are a product of each even positive integer. Top left is{" "}
					<MathTalics m='(2n)^2' />
					(every even square), top right is <MathTalics m='(2n)^2-2n,' /> bottom left is{" "}
					<MathTalics m='(2n)^2+2n' />, bottom right is <MathTalics m='(2n)^2\pm4n' />
				</li>
				<li>
					<MathTalics m='n^2' /> has more interesting patterns to look at.{" "}
					<MathTalics m='n^2\pm n' /> draws a Southwest-Northeast diagonal centered around the
					origin.
				</li>
			</ul>
		</div>
	);
}

function Footnote6() {
	return (
		<div>
			{" "}
			Here is a visualization of these points:
			<img src={imgn2} alt="A visualization of a grid of a n^2 square spiral" style={{ display: "block", margin: "auto" }} /> Every even number squared is in
			the North-West radius, and every odd number squared is in the Southeast radius.
		</div>
	);
}


function Footnote7() {
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

const Footnotes = [Footnote1, Footnote2, null, Footnote4, Footnote5, Footnote6, Footnote7];
function Footnote({ num, punctuation = ". ", extFootnote }) {
	const scrollRef = useRef(null);
	const [show, setShow] = useState(false);
	const scrollBack = () => {
		scrollRef.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
		setShow(false);
	};

	return (
		<>
			<span
				className={"footnoteButton"}
				onClick={() => {
					setShow(!show);
				}}>
				<sup ref={scrollRef} style={{ color: "#de731d" }}>
					[{num}]
				</sup>
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
				<div style={{ padding: "30px", cursor: "pointer" }} onClick={scrollBack}>
					<hr style={{ borderTop: "1px solid #de731d" }} />
				</div>
			</Collapse>
		</>
	);
}

const Content = [Text1, Text2, Text3, Text4, Text5, Text6, Text7, Text8];

export default Content;
