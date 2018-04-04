/*
 * Create a list that holds all of your cards
 */
const cardArray = Object.values(document.getElementsByClassName("card"));

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function shuffleCards(){
	const shuffledArray = shuffle(cardArray);
	const myDocFrag = document.createDocumentFragment();
	for (let M=0; M < shuffledArray.length; M++ ) {
		myDocFrag.appendChild(shuffledArray[M]);
	}
	document.querySelector(".deck").appendChild(myDocFrag);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

shuffleCards(); //To shuffle the cards each time the browser loads

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

document.querySelector(".deck").addEventListener("click", cardClicked); //Event listner for cards
let cardList = []; //array of open cards, contains clicked cards
let moveCounter = 0;
let starCounter = 3;
let matchedCards = 0;
let second = 0;
let minute = 0;
let hour = 0;
let clearme = false;

function cardClicked(event) {
	//Prevent adding open or matched cards
	if (event.target.tagName === "LI" && !(event.target.classList.contains("match") || event.target.classList.contains("open"))) {
		if (cardList.length < 2) {showCard(event);} //Prevent showing three cards bug
		addCardToList(event,cardList);
		if (cardList.length === 2) {
			incMoveCounter();
			stars(); // update Stars
			let item0 = cardList[0].firstElementChild.classList.value;
			let item1 = cardList[1].firstElementChild.classList.value;
			if (item0 === item1) {
				matched();
			} else {
				notMatched();
			}
		}
	}
}

function showCard(event) {
	event.target.classList.add("open", "show");
}

function addCardToList(event,cardList) {
	cardList.push(event.target);
}

function matched() {
	cardList[0].classList.add("match");
	cardList[1].classList.add("match");
	cardList = [];
	matchedCards += 1;
	if (matchedCards === 8) {
		clearme = true;
		setTimeout(winningScreen,650);
	}
}

function notMatched() {
	cardList[0].classList.add("notmatched");
	cardList[1].classList.add("notmatched");
	setTimeout(removeClasses, 800 );
	
}
const notMatchedClasses = ["open", "show", "notmatched"]
function removeClasses() {
				cardList[0].classList.remove(...notMatchedClasses);
				cardList[1].classList.remove(...notMatchedClasses);
				cardList = [];
			}

function incMoveCounter() {
	moveCounter += 1;
	document.querySelector(".moves").innerText = moveCounter;
}

function stars() {
	if (moveCounter > 15) {
		let evaluation = document.getElementsByClassName("fa-star");
		evaluation[2].classList.add("fa-star-o");
		starCounter = 2;
	}
	if (moveCounter > 25) {
		let evaluation = document.getElementsByClassName("fa-star");
		evaluation[1].classList.add("fa-star-o");
		starCounter -= 1;
	}
}

function winningScreen () {
	
	document.querySelector(".deck").style.display = "none";
	document.querySelector(".score-panel").style.display = "none";
	document.querySelector(".win-container").style.display = "flex";
	document.querySelector(".win-text").textContent = "With " + moveCounter + " Moves and " + starCounter + " Stars.";
	document.querySelector(".winbtn").addEventListener("click", playAgain);
	
	document.querySelector(".win-container").addEventListener("animationend", function() {
		document.querySelector(".fa-check-circle").classList.add("checkanimate");
	})
	if (hour === 0) {
		document.querySelector(".show-time").textContent = "Your time: " + minute + " minutes and " + second + " soconds";
	} else {
			document.querySelector(".show-time").textContent = "Your time: " + hour + " hour, " + minute + " minutes and " + second + " soconds";
	}
}
function restart () {
	second = 0;
	minute = 0;
	hour = 0;
	clearme = false;
	moveCounter = 0;
	starCounter = 3;
	matchedCards = 0;
	document.querySelector(".moves").innerText = moveCounter;
	document.querySelector(".win-container").style.display = "none";
	document.querySelector(".deck").style.display = "flex";
	document.querySelector(".score-panel").style.display = "";
	let evaluation = document.getElementsByClassName("fa-star");
	if (evaluation[2].classList.contains("fa-star-o")) {
		evaluation[2].classList.remove("fa-star-o");
	}
	if (evaluation[1].classList.contains("fa-star-o")) {
		evaluation[1].classList.remove("fa-star-o");
	}
	const cardClasses = ["open", "show", "match"];
	for (const card of cardArray) {
		card.classList.remove(...cardClasses);
	}
	document.querySelector(".fa-check-circle").classList.remove("checkanimate");
	shuffleCards();
}

function playAgain() {
	restart();
	countTime();
}

document.querySelector(".restart").addEventListener("click", restart); // restart button Event Listner

//Time Counter
const timeCounter = document.querySelector(".time-count");
function countTime() {
	if (clearme) {
		clearTimeout(showTime);
		} else {
			showTime();
			second++;
			let setTime = setTimeout(countTime, 1000);
		}
	}

function showTime() {
	if (second === 60) {
		second = 0;
		minute += 1;
	}
	if (minute === 60) {
		minute = 0;
		hour +=1;
	}
	if (hour > 0) {
		timeCounter.textContent = "Time: " + hour + ":" + minute + ":" + second;
	} else {
			timeCounter.textContent = "Time: " + minute + ":" + second;
	}
}

countTime(); //Start counting time