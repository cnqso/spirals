/** @format */

import { React, useState } from "react";
import AIImage from "./AI.png";
import Collapse from "@mui/material/Collapse";
import CodeBlock from "./CodeBlock/CodeBlock";
import codestrings from "./codestrings";


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
			The first thing you might notice is that we have a constant two-phase pattern. Lets think of{" "}
			<i>m</i> as the length of each "side" of the spiral, starting at <i>m</i> = 1.
			<ol type='1'>
				<li>
					Increment <i>x</i> by <i>m</i>
				</li>
				<li>
					Increment <i>y</i> by <i>m</i>
				</li>
				<li>
					Increment <i>m</i> by 1
				</li>
				<li>
					Decrement <i>x</i> by <i>m</i>
				</li>
				<li>
					Decrement <i>y</i> by <i>m</i>
				</li>
				<li>
					Increment <i>m</i> by 1
				</li>
			</ol>
			This pattern continues forever. The order is a bit unusual, but other than that it seems like a
			pretty simple loop. If I try to write this in javascript, it looks like this:
		</div>
	);
}

function Text3({footnote}) {
	return (
		<div className='textBlock'>
			This approach gets us there. The function moves one square at a time and updates the location
			variable at each new square, forever. To make it practical we need to add bounds and output. The
			function is already repetitive and verbose, and adding these things would make it even worse
			<Footnote num={3} extFootnote={footnote}/> We can make the function more concise by using a direction variable and a
			axis variable: The axis we're moving along changes every step, and the direction we're moving
			reverses every two steps. 
		</div>
	);
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
function Footnote({ num, punctuation = ". ", extFootnote}) {
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
					<h2
						className='footnoteButton'
						onClick={() => {
							setShow(false);
						}}
						style={{ textAlign: "center", marginTop: 0 }}>
						<b>^</b>
					</h2>

					{extFootnote ? extFootnote() : Footnotes[num - 1]()}
				</div>
			</Collapse>
		</>
	);
}

const Content = [Text1, Text2, Text3];

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
While working on my most recent project, I ran into a problem which I thought would be much simpler. 
Without going into too much detail, this was my situation:

I had a game in which many people build cities next to each other. These cities can connect via
roads and power networks, and this would be the main "unique" feature of the game.
Because of this, I wanted to make sure that users were often connected to many other players,
so that "corner" plots were highly rare. I also wanted to make sure that players who joined earlier
would be closer to the center, while players who joined later would be further away. This would
give players an incentive to check back in on their cities to see if new people had built next to them.
Lastly, I wanted a simple way to categorize the location of users, so I needed positions to be somehow deterministic.

I decided that the best way to accomplish this was to have players "spiral" around a central plot. 

<Picture, can just be a doodle>

I assumed that there would be a simple, well known answer to this problem, so I did a quick google search.
I found two different types of approaches:

The first was very theoretical: trying to find a single formula for a point on a spiral given n. 
This was very promising and exactly what I was looking for, but the solutions were incredibly complex,
both in terms of understanding and computation. 

The second was practical and what I will brazenly call the "naive" approach.
This approach was to record every visited square and try to turn right whenever possible.
<Code block> Make sure these can have file titles and different languages (maybe diff themes for languages)
And also include a dropdown options thing for diff languages that also changes all other code blocks
This was more programmatic, sure, but the amount of time needed for each step and the balooning
memory complexity of the operation was untenable to me. My solution didn't need to be efficient, 
but I was frustrated that what I saw as a simple problem had no simple and fast solution. 


I decided to take a shot at it. I started by just drawing a bunch of spirals and seeing what I noticed.
Here were the big patterns.

1. Every spiral operates in a bidirectional pattern. 
Every lap, the blocks move m number of times right and up then m=m+1 times left and down.
The blocks then move m=m+1 number of times right and up, and it continues like this forever.
Ultimately, it seems like we have a small number of simple, predictable variables. 
You have a distance to travel, and a current direction. Every other time the direction changes,
you increase the distance. Continue until you've reached the square n you wanted to find.

Let's summarize: we want a function which takes in a single variable, n, and returns the coordinates of that square
assuming a starting point of (0,0). We can take some examples from manually drawn squares to 
determine if we've reached that goal.

<Code block>
unit tests, gotta learn how to make those look nice.


Here is my implementation:
<Code with squares block>


bla bla bla
This is useful for operations for which n is small or for which you need to do
an operation on each square (as is the case in these visualizations)





<Runs/Laps>

This approach is one I saw on my first google search -- it didn't apply to my immediate problem but got me thinking.
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
