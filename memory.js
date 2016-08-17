console.log("heyyyyy");

var view = {
	cover: "img/cover.jpg",
	matched: "img/match.jpg",
	winner: "url(img/winner.jpg)",
	noCigar: "url(img/nocigar.jpg)",
	loser: "url(img/loser.jpg)",
	roundTwoChoice: "url(img/nextlevel1.jpg)",
	roundThreeChoice: "url(img/nextlevel2.jpg)",
	boardSize: "500px",
	displayTimer: function(){
		//This code will run the timer at the bottom of the page.
		document.getElementById("timer").innerHTML = "Time Remaining: " + model.secondsInRound;
	},
	displayEndResult: function(){
		document.getElementById("timer").style.display = "none";
		document.getElementById("score").style.display = "block";
		this.displayScore();
		var board = document.getElementById("board");
		board.innerHTML = "";
		if(model.matches == model.numPairs){
			//winner.jpg!
			//this'll have to be altered somewhat if there's more than one level
			board.style.background = this.winner;
			board.style["background-size"] = this.boardSize;
		} else if (model.matches < model.numPairs && model.matches > model.numPairs/2){
			board.style.background = this.noCigar;
			board.style["background-size"] = this.boardSize;
			//nocigar.jpg
		} else {
			board.style.background = this.loser;
			board.style["background-size"] = this.boardSize;
			//loser.jpg
		}
		//This will display either failure (two versions--one in case of a close call when the timer runs out, the other in case of abject failure) or victory (in the case of making all matches before the timer runs out)
	},
	displayCard: function(eventObj){
		var image = eventObj.target;
		var name = image.className;
		name = "img/" + name + ".jpg";
		image.src = name;
		//if(faceCard2){
			//I'm just trying to set it up so that only two cards can be face up at a time but I can't figure it out today
			//image.src = name;
			//setTimeout(view.displayCover, 15000, image);  // this line is going to go once I have the matching system working.
		//}
		//This will take care of "turning over" the cards when they're clicked. One code for all different image names
	},
	displayCover: function(image){
		//And this will take care of turning the cards "facedown" either after a set number of seconds (15?) or 3 seconds after a second, non-matching card is clicked. Matched pairs are left face-up, so this function should not mess with them.
		document.getElementById(image).src = this.cover;
	},
	displayMatches: function(){
		//This code displays text with the current number of matches on the screen
		document.getElementById("score").innerHTML = "Matches: " + model.matches;
	},
	displayMatched: function(imageOne, imageTwo){
		var one = document.getElementById(imageOne);
		var two = document.getElementById(imageTwo);
		one.src = this.matched;
		two.src = this.matched;
		one.removeAttribute("class");
		one.setAttribute("class", "matched");
		two.removeAttribute("class");
		two.setAttribute("class", "matched");
//		imageOne.src = this.matched;
//		imageTwo.src = this.matched;
	},
	displayScore: function(){
		//calculates and shows the final score.
		document.getElementById("score").innerHTML = "Score: " + model.score;
	},
	startGame: function(){
		//This method pulls up the table when the "start" button is clicked. It also hides the start button.
		document.getElementById("board").style.display = "block";
		document.getElementById("score").style.display = "block";
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
	secondsInRound: 60,
	timeRemaining: "",
	score: 0,

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
		this.cardLoc.matches.length = this.numCards;
		this.placeClass();
	},
	placeCards: function(){
		//this method places the cards randomly on the board (by adding images with classes to table cells)
		var locations = this.cardLoc.locations;
		var row, col;
		row = Math.floor(Math.random()*this.boardSize);
		col = Math.floor(Math.random()*this.boardSize);
		return row+""+col;
	},
	placeClass: function(){
		//adds classes to the img elements in the HTML page
		var locale = this.cardLoc.locations;
		for(var i=0; i<locale.length; i++){
			var classy = this.pairs[i];
			document.getElementById(locale[i]).setAttribute("class", classy);
		}

	},
	collision: function(loc){
		//this method checks that each card goes in its own cell without adding an extra class to an already-occupied cell
		var locale = this.cardLoc.locations;
		if(locale.indexOf(loc) == -1){
			return false;
		}
		return true;
	},
	roundTwo: function(){
		//this method updates the variables at the top of the model for the second round of memory, and possibly reiterates a few of initial functions.
	}
};
var controller = {
	clicks: 0,
	firstChoice: "",
	secondChoice: "",
	targetOne: "",
	targetTwo: "",
	startGame: function(){
		//this method tells everything to get running for the first round.
		view.startGame();
		model.generatePairs();
		model.timeRemaining = window.setInterval(function(){
			model.secondsInRound -= 1;
			console.log(model.secondsInRound);
			view.displayTimer();
			if(model.secondsInRound <= 0){
				controller.endGame();
			}
		}, 1000);
	},
	isMatch: function(first, second){
		//ALLLLL this method does is check for a match between two turned-over cards. Returns true for a match and false otherwise.
		
		if(firstMatch == secondMatch){
			model.matches++;
			view.displayMatches();
			return true;
		}
		return false;
	},
	check: function(one, two){
		//clearInterval(timer);
		console.log("checking!")
		if(one == two && controller.targetOne !== controller.targetTwo){
			model.matches++;
			view.displayMatches();
			window.setTimeout(function(){ view.displayMatched(controller.targetOne, controller.targetTwo); }, 400);
			console.log("it's a match made in heaven!");
		} else {
			window.setTimeout(function(){
				view.displayCover(controller.targetOne);
				view.displayCover(controller.targetTwo);
			}, 400);
			console.log("no matches here!");
		}
		if(model.matches == model.numPairs){
			window.setTimeout(function(){controller.endGame();}, 400);
		}
/*		if(this.isMatch(this.firstChoice, this.secondChoice)){
			view.displayMatched(this.targetOne, this.targetTwo);
			model.matches++;
			console.log("it's a match made in heaven")
		} else {
			view.displayCover(this.targetOne);
			view.displayCover(this.targetTwo);
			console.log("no matches here!")
		}
*/
	},
	chooseCard: function(eventObj){
//		if(this.clicks == 2){
//			this.clicks = 0;
//		}
		if(eventObj.target.className !== "matched"){
			if(controller.clicks === 0){
				controller.targetOne = eventObj.target.id;
				controller.firstChoice = eventObj.target.className;
				view.displayCard(eventObj);
				controller.clicks = 1;
			} else {
				controller.targetTwo = eventObj.target.id;
				controller.secondChoice = eventObj.target.className;
				view.displayCard(eventObj);
				controller.clicks = 0;
				controller.check(controller.firstChoice, controller.secondChoice);
			}
			console.log(controller.firstChoice + " " + controller.secondChoice);
			console.log(controller.targetOne + " " + controller.targetTwo);
		} else {
			console.log("nice try bub");
		}
	},
	processGuess: function(){
		var images = document.getElementsByTagName("img");
		var faceCard = 0;
		for(var i=0; i<model.cardLoc.locations.length; i++){
			if(images[i].src.search("cover") > -1){
				faceCard++;
			}
		}
		//Gathers the info about the two most recent matches.
		//It also makes sure that the pair turns back over (provided they're not a match) if a third card is clicked. So, the third card would turn faceup at the same time the other two turn facedown.
	},
	endGame: function(){
		//stops the timer (once I get the timer working at all), and pulls up the endlevel display.
		window.clearInterval(model.timeRemaining);
		model.score = model.matches + Math.floor(model.secondsInRound/2);
		view.displayEndResult();
	},
	thing: function(){
		var faceCard = 0;
		var images = document.getElementsByTagName("img");
		for(var i=0; i<model.cardLoc.locations.length; i++){
			var imgsrc = images[i].src;
			if(imgsrc !== "img/cover.jpg"){
				faceCard++;
				console.log(faceCard);
			}
		}
		if(faceCard < 3){
			image.src = name;
		} else if(faceCard == 3){
			for(var i=0; i<model.cardLoc.locations.length; i++){
				images[i].src = "img/cover.jpg";
			}
			image.src = name;
			faceCard = 0;
		}
	}
};

window.onload = init;
function init(){
	var images = document.getElementsByTagName("img");
	for(var i=0; i<images.length; i++){
		//images[i].onclick = view.displayCard;
		images[i].onclick = controller.chooseCard;
	}
	document.getElementById("board").style.display = "none";
	document.getElementById("score").style.display = "none";
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
