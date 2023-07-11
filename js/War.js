/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

const originalDeck = buildOriginalDeck();


/*----- app's state (variables) -----*/
let shuffledDeck = [];
let playing = false;
let newShuffledDeck = [];
let warArray = [];
let playerHand = [];
let compHand = [];
let playerCard = [];
let compCard = [];

/*----- functions -----*/

window.onload = function() {$("#gameboard").hide()};

function hideAll() {
	$("#header").hide();
	$("#gameboard").hide();
	$("#numPlayers").hide();
	$("#numRounds").hide();
	$("#start").hide();
  $('#ruleSet').hide();
	$(".newGame").hide();


}function renderBoard() {
	hideAll();
	$("#gameboard").show();
	playing = true;
  splitCards();
}


function splitCards() {
  
  buildOriginalDeck();
  getNewShuffledDeck();
  let i=0
	for (i=0; i!=26; i++) {
    
    playerHand.push(shuffledDeck.splice(26,1));
	}
  for (i=0; i!=26; i++) {
    
    compHand.push(shuffledDeck.splice(0,1));
  }
  
}

function buildOriginalDeck() {
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        
        value: Number(rank) || (rank=== 'A' ? 14: rank === 'K' ? 13: rank === 'Q' ? 12: rank ==='J' ? 11:10)
       
      });
    });
  });
  return deck;
}

function getNewShuffledDeck() {
  // Create a copy of the originalDeck (leave originalDeck untouched!)
  const tempDeck = [...originalDeck];
  while (tempDeck.length) {
    
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length/2);
    
    shuffledDeck.push(tempDeck.splice(rndIdx, 1)[0])
    ;
  }
}

function deal() {

	$('.playCount').html("Player cards: " + playerHand.length);
	$('.compCount').html("Computer cards: " + compHand.length);
	$('.result').html("");
    
  
  playerCard = playerHand[0];
  compCard = compHand[0];
  
  
  $('.playerCard').append(`<img class="card ${playerCard[0].face}"></img>`);
  $('.compCard').append(`<img class="card ${compCard[0].face}"></img>`);
  
  compare(playerCard, compCard);
  $('.playerCard').html("");
  $('.compCard').html("");
  $('.newGame').show();
}

function compare(playerCard, compCard) {
  
  if((playerCard[0]) > (compCard[0])) {
	
		$('.result').html("Player wins!")
		
		playerHand.push(compCard[0]);
		playerHand.push(playerCard[0]);

		playerHand.shift();
		compHand.shift();

		updateCount();
		checkWin();
	}


	else if ((playerCard[0]) < (compCard[0])) {
		
		$('.result').html("Computer wins!")
		
		compHand.push(playerCard)[0];
		compHand.push(compCard[0]);

		compHand.shift();
		playerHand.shift();

		updateCount();
		checkWin();
	}

	else if ((playerCard[0]) === (compCard[0]))
		warToArray();
}


function warToArray() {

	var length = 0;

	if (playerHand.length < 5 || compHand.length < 5) {

		if(playerHand.length > compHand.length) {
			length = compHand.length - 1;
		}

		else if (playerHand.length < compHand.length) {
			length = playerHand.length - 1;
		}
	}
	else {
		length = 3;		
	}
	for (let i = 0; i < length; i++) {
		warArray.push(playerHand[0]);
		playerHand.shift();
		warArray.push(compHand[0]);
		compHand.shift();
	}

	compareWar(playerHand[0], compHand[0]);
}


function compareWar(playerCard, compCard) {
	
	if((playerCard[0]) > (compCard[0])) {
	
		$('.result').html("Player wins!");
		
		playerHand.push.apply(playerHand, warArray);

		playerHand.push(compCard[0]);
		playerHand.push(playerCard[0]);
		
		playerHand.shift();
		compHand.shift();
		
		warArray.length = 0;

		updateCount();
		checkWin();
	}

	
	else if ((playerCard[0]) < (compCard[0])) {
		
		$('.result').html("Computer wins!");
		
		compHand.push.apply(compHand, warArray);
		
		compHand.push(playerCard[0]);
		compHand.push(compCard[0]);

		playerHand.shift();
		compHand.shift();

		warArray.length = 0;

		updateCount();
		checkWin();
	}


	else if ((playerCard ) === (compCard ))
		warToArray();
}

function checkWin() {
	
	if (playerHand.length == 0) {
		$(".result").html("I'm sorry but you lost. The computer wins the game.")
		$('.deal').hide();
	}
	else if (compHand.length == 0) {
		
		$(".result").html("Congrats you win!!")
		$('.deal').hide();
	}
}




  