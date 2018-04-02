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
    var currentIndex = array.length, temporaryValue, randomIndex;

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

function cardClicked(event) {
	//Prevent adding open or matched cards
	if (event.target.tagName === "LI" && !(event.target.classList.contains("match") || event.target.classList.contains("open"))) {
		if (cardList.length < 2) {showCard(event);} //Prevent showing three cards bug
		addCardToList(event,cardList);
		if (cardList.length === 2) {
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
}

function notMatched() {
	cardList[0].classList.add("notmatched");
	cardList[1].classList.add("notmatched");
	setTimeout(removeClasses, 800 );
	
}
function removeClasses() {
				cardList[0].classList.remove("open", "show", "notmatched");
				cardList[1].classList.remove("open", "show", "notmatched");
				cardList = [];
			}