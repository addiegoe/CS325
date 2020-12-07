//event listener to start game
var button = document.getElementById("guess_button");
button.addEventListener("click", playGame);


//arrays and global variables for game play
var colors = ["blue", "red", "yellow", "orange", "green", "purple"]
var colors_used = []
round = 1
won = false


//helper function to count number of occurrences of a color in array
function count(n, arr)
{
	var c = 0;
	for (var i = 0; i < arr.length; i++)
	{
		if (arr[i] == n){
			c++;
		}
	}
	return c;
}


//helper shuffle function randomizes order of clues
//Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var curr = array.length, temp, rand_index;

  // While there remain elements to shuffle
  while (0 !== curr) {

    // Pick a remaining element
    rand_index = Math.floor(Math.random() * curr);
    curr -= 1;

    // swap with the current element
    temp = array[curr];
    array[curr] = array[rand_index];
    array[rand_index] = temp;
  }

  return array;
}


//helper function checkGuess makes sure all colors are allowed by game rules
function checkGuess(arr)
{
	yes = true;
	for (var i = 0; i < 4; i++){
		if (colors.includes(arr[i]) == false){
			yes = false;
			break
		}
	}
	for (var i = 0; i < 4; i++){
		if (count(arr[i], arr) > 1){
			yes = false;
		}
	}
	return yes;
}


//constructor for Peg objects
class Peg {
	constructor(position, color)
	{
		this.position = position;
		this.color = color;
	}
}


//setUp function populates array of four peg objects
function setUp()
{
	var pegs = [];
	for (var i = 0; i < 4; i++){
		p = new Peg(i + 1, colors[Math.floor(Math.random() * 6)]);
//ensure no colors are repeated
		while (colors_used.includes(p.color))
		{
			p = new Peg(i + 1, colors[Math.floor(Math.random() * 6)]);
		}

		pegs.push(p);
		colors_used.push(p.color);
	}
	for (var i in pegs){
		console.log(pegs[i].position, pegs[i].color);
	}
	return pegs;
}


//getGuess function gets guess from user input
function getGuess()
{
	var guess = [];
	var c1 = document.getElementById("p1").value;
	p1 = new Peg(1, c1);
	guess.push(p1);
	var c2 = document.getElementById("p2").value;
	p2 = new Peg(2, c2);
	guess.push(p2);
	var c3 = document.getElementById("p3").value;
	p3 = new Peg(3, c3);
	guess.push(p3);
	var c4 = document.getElementById("p4").value;
	p4 = new Peg(4, c4);
	guess.push(p4);

	return guess;
}


//masterMind function checks user's guess against solution and returns true
//if guess is correct, or an array of clues
//Rules for game: https://www.youtube.com/watch?v=wsYPsrzCKiA
function masterMind(s, g)
{
	c = 0
	clue = []
//check if position and color are the same
	for (var i in g){
		if (g[i].position == s[i].position && g[i].color == s[i].color)
		{
			clue.push("black")
			c++
		}
//if not, check if color is in array of colors used
		else if (colors_used.includes(g[i].color))
		{
			clue.push("white")
		}
		else {
			clue.push("x")
		}
	}
//randomize clues
	new_clue = shuffle(clue);

	if (c == 4)
		{
			return true;
		}
		else {
			return new_clue;
		}
}



//getGuessImg returns address of correctly-colored image
function getGuessImg(g)
{
	if (g == "red"){

		return "imgs/peg_red.png";
	}
	else if (g == "blue"){
		return "imgs/peg_blue.png";
	}
	else if (g == "yellow"){
		return "imgs/peg_yellow.png";
	}
	else if (g == "green"){
		return "imgs/peg_green.png";
	}
	else if (g == "orange"){
		return "imgs/peg_orange.png";
	}
	else {
		return "imgs/peg_purple.png";
	}

}


//getClueImg returns address of correctly-colored image
function getClueImg(c)
{
	if (c == "black"){

		return "imgs/pin_black.png";
	}
	else if (c == "white"){
		return "imgs/pin_white.png";
	}
	else {
		return "imgs/no_clue.png";
	}

}


//showGuess function displays guess as colored peg array
function showGuess(guess_colors){
	var g = document.getElementById("guesses");
	var g_0 = document.createElement("div");
	var label = document.createTextNode("Guess " + round + ":");
	g_0.appendChild(label);
	var img1 = document.createElement("img");
	img1.src = getGuessImg(guess_colors[0]);
	img1.setAttribute("class", "peg");
	g_0.appendChild(img1);
	var img2 = document.createElement("img");
	img2.src = getGuessImg(guess_colors[1]);
	img2.setAttribute("class", "peg");
	g_0.appendChild(img2);
	var img3 = document.createElement("img");
	img3.src = getGuessImg(guess_colors[2]);
	img3.setAttribute("class", "peg");
	g_0.appendChild(img3);
	var img4 = document.createElement("img");
	img4.src = getGuessImg(guess_colors[3]);
	img4.setAttribute("class", "peg");
	g_0.appendChild(img4);
	g.appendChild(g_0);

}

//showGuess function displays guess as colored peg array
function showClue(pins){
	
	var g = document.getElementById("guesses");
	var c_0 = document.createElement("div");
	var label = document.createTextNode("Clue " + round + ":");
	c_0.appendChild(label);
	var img1 = document.createElement("img");
	img1.src = getClueImg(pins[0]);
	img1.setAttribute("class", "pin");
	c_0.appendChild(img1);
	var img2 = document.createElement("img");
	img2.src = getClueImg(pins[1]);
	img2.setAttribute("class", "pin");
	c_0.appendChild(img2);
	var img3 = document.createElement("img");
	img3.src = getClueImg(pins[2]);
	img3.setAttribute("class", "pin");
	c_0.appendChild(img3);
	var img4 = document.createElement("img");
	img4.src = getClueImg(pins[3]);
	img4.setAttribute("class", "pin");
	c_0.appendChild(img4);
	g.appendChild(c_0);

	}

//reset clears input fields and advances round
function reset(){
	document.getElementById("p1").value = "";
	document.getElementById("p2").value = "";
	document.getElementById("p3").value = "";
	document.getElementById("p4").value = "";
	document.getElementById("game_status").innerHTML = "<h3>" + "Round " + round + "</h3>";
}


function showSolution(sol){
	s_colors = [];
	for (var i in sol){
		s_colors.push(sol[i].color);

	}
	console.log(s_colors);
	var s = document.getElementById("final");
	s.innerHTML = "<i>" + "Solution: " + "</i>"
	var img1 = document.createElement("img");
	img1.src = getGuessImg(s_colors[0]);
	img1.setAttribute("class", "peg");
	s.appendChild(img1);
	var img2 = document.createElement("img");
	img2.src = getGuessImg(s_colors[1]);
	img2.setAttribute("class", "peg");
	s.appendChild(img2);
	var img3 = document.createElement("img");
	img3.src = getGuessImg(s_colors[2]);
	img3.setAttribute("class", "peg");
	s.appendChild(img3);
	var img4 = document.createElement("img");
	img4.src = getGuessImg(s_colors[3]);
	img4.setAttribute("class", "peg");
	s.appendChild(img4);

	var new_par = document.createElement("p");
	var play_again = document.createElement("a");
	var link = document.createTextNode("Click here to play again");
	play_again.appendChild(link);
	play_again.href="index.html";
	new_par.appendChild(play_again);
	s.appendChild(new_par);


	document.getElementById("p1").value = "";
	document.getElementById("p2").value = "";
	document.getElementById("p3").value = "";
	document.getElementById("p4").value = "";


}

//create global variable for solution
solution = setUp();

//playGame simulates game play
function playGame(){
		var g = getGuess();
		var guess_colors = []
		for (var i in g){
			guess_colors.push(g[i].color);
			}
	if ((round < 8) && (won == false)){
//control for correct input
		if (checkGuess(guess_colors) == false) {
			alert("Please enter a valid color: blue, red, orange, green, yellow, or purple. Remember to only enter ONE of each color.")
		}
		else{
		var m = masterMind(solution, g);
		showGuess(guess_colors);
//display message if won
		if (m == true){
			won = true;
			document.getElementById("message").innerHTML = "<h3>" + "Congratulations! You've guessed the solution!" + "</h3>";
			showSolution(solution);
		}
		else{
			showClue(m);

		}
		round++
		reset();
	
	}
	}
	else if (won == true)
	{
		
	}
	else {
		showGuess(guess_colors);
		document.getElementById("message").innerHTML = "<h3>" + "Game Over! Sorry, you didn't guess the solution in time!" + "</h3>";
		showSolution(solution);
	}
}
