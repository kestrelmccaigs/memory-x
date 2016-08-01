console.log("heyyyyy");

var view = {
	displayTimer: function(){
		//This code will run the timer at the bottom of the page.
		document.getElementById("timer").innerHTML = "Time Remaining: " + "PIZZA";
	},
	displayEndResult: function(){
		//This will display either failure (in the case of the timer running out--love it if it could display a couple screenshots of Wolverine tearing up his room and making excuses (in case of a close call), or just like hulking out and destroying everything(in case of minimal matches beforehand)) or victory (in the case of making all matches before the timer runs out)
	},
	displayCard: function(eventObj){
		var image = eventObj.target;
		var name = image.className;
		name = "img/" + name + ".jpg";
		image.src = name;
		setTimeout(view.displayCover, 15000, image); // this line is going to go once I have the matching system working.
		//This will take care of "turning over" the cards when they're clicked. One code for all different image names
	},
	displayCover: function(image){
		//And this will take care of turning the cards "facedown" either after a set number of seconds (15?) or 3 seconds after a second, non-matching card is clicked. Matched pairs are left face-up, so this function should not mess with them.
		var name = "img/cover.jpg";
		image.src = name;
	},
	displayMatches: function(){
		//This code displays text with the current number of matches on the screen
		document.getElementById("matches").innerHTML = "Matches: " + model.matches;
	},
	startGame: function(){
		//This method pulls up the table when the "start" button is clicked. It also hides the start button.
		document.getElementById("board").style.display = "block";
		document.getElementById("temp").style.display = "none";
		view.displayTimer();
		view.displayMatches();
	},
	displayRoundTwo: function(){
		//this takes care of a few display alterations at the beginning of the second round, including any necessary div resizing and table altering. 
	}
};
var model = {
	boardSize: 4,
	numCards: 16,
	numPairs: 8,
	matches: 0,
	secondsInRound: 180,
	timeRemaining: this.secondsInRound*1000,

	cards: ["zero", "one", "two", "three", "four", "five", "six", "seven",
			"eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen"],
	pairs: [],
	cardLoc: {
		//locations of the chosen cards, by row and column, plus corresponding match-tracker.
		locations: [],
		matches: []
	},

	generatePairs: function(){
		//Chooses pairs by putting them into an array
		while(this.pairs.length < this.numCards){
			var rand = Math.floor(Math.random()*this.cards.length);
			var select = this.cards[rand];
			if(this.pairs.length == 0 || this.pairs.indexOf(select) == -1){
				this.pairs.push(select, select);
			}
		}
		this.generateCardLocations();
	},
	generateCardLocations: function(){
		//I need to loop through and made sure every spot in locations gets filled. And the collision needs to check that nothing is duplicating.
		var loc;
		while(this.cardLoc.locations.length<this.numCards){
			loc = this.placeCards();
			if(this.collision(loc) == false){
				this.cardLoc.locations.push(loc);
			}
		}
		this.cardLoc.matches.length = 16;

	/*		
		var loc = placeCards();
		for(var i=0; i<this.numCards; i++){
			do{
				loc = this.placeCards();
			} while(this.collision(loc));
			this.cardLoc.locations[i] = loc;
		}
	*/
	},
	placeCards: function(){
		//this method places the cards randomly on the board (by adding images with classes to table cells)
		var locations = this.cardLoc.locations;
		var row, col;
		row = Math.floor(Math.random()*this.boardSize);
		col = Math.floor(Math.random()*this.boardSize);
		return row+""+col;
//		var classy = this.cards[2];
//		document.getElementById("00").setAttribute("class", classy);
	},
	placeClass: function(){
		//adds classes to the img elements in the HTML page

	},
	collision: function(loc){
		//this method checks that each card goes in its own cell without adding an extra class to an already-occupied cell
		//var counter = 0;
		var locale = this.cardLoc.locations;
		if(locale.indexOf(loc) == -1){
			return false;
		}
		return true;
		/*
		for(var i=0; i<locale.length; i++){
			if(locale[i] == loc){
				counter++;
			}
		}
		if(counter > 1){
			return true;
		}
		return false;
		*/
	},
	roundTwo: function(){
		//this method updates the variables at the top of the model for the second round of memory, and possibly reiterates a few of initial functions.
	}
};
var controller = {
	startGame: function(){
		//this method tells everything to get running for the first round.
		view.startGame();
		model.generatePairs();
	},
	processGuess: function(){
		//this code determines whether or not the two recently clicked cards are a match. Returns true if they are and false if not.
		//It also makes sure that the pair turns back over (provided they're not a match) if a third card is clicked. So, the third card would turn faceup at the same time the other two turn facedown.
	}
};

window.onload = init;
function init(){
	var images = document.getElementsByTagName("img");
	for(var i=0; i<images.length; i++){
		images[i].onclick = view.displayCard;
	}
	document.getElementById("board").style.display = "none";
	document.getElementById("start").onclick = controller.startGame;
}

/*
	Okay.
		~~~OBJECTIVES~~~
	1. Click a button ("start") to start the game (and a timer, which runs for 3 minutes, or 180 seconds, or 180000 miliseconds). Before that, you can't turn over any of the cards on the board (or maybe it will be empty).
	2. If/when the timer expires, the game ends with ~*~TRAGEDY~*~ (provided all matches are not yet made).
	3. The cards have to randomly place themselves on the board. There has to be two of each card, and they should share a class so I know when there is a match. I have sixteen individual cards right now, but I can only use eight of them on a 16-card board. Might be easier initially to just put 8 of them in for now, but I would eventually like it if 8 could be chose randomly from the 16 cards.
	4. I need something to keep track of the score (say, 5 points for each match).
	5. Once a match is made, those cards stay face-up, and they cannot be turned over anymore.
*/
