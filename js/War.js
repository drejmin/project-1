/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
//const jranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A','joker-red','joker-black'];
// const player1 = 'green';
// const player2 = 'blue';
// const player3 = 'yellow';
// const player4 = 'red';


// Build an 'original' deck of 'card' objects used to create shuffled decks
const originalDeck = buildOriginalDeck();
//renderDeckInContainer(originalDeck, document.getElementById('original-deck-container'));

//const shuffledContainer = renderNewShuffledDeck();
//renderDeckInContainer(shuffledDeck, document.getElementById('shuffled-deck-container'))

//const jokerDeck = buildJokerDeck();
//renderJokerDeckInContainer(jokerDeck, document.getElementById('joker-deck-container'))

/*----- app's state (variables) -----*/
let shuffledDeck = [];
let playing = false;
let newShuffledDeck = [];
let warArray = []
let playerHand = [];
let compHand = [];
 

let playerCard = '', compCard = '';

/*----- cached element references -----*/


//const jokerContainer = document.getElementById('joker-deck-container');


/*----- event listeners -----*/
//document.querySelector('button').addEventListener('click', renderNewShuffledDeck);
// document.querySelectorAll('checkbox').addEventListener('selected',rules);
// document.querySelectorAll('rounds').addEventListener('selected',playRounds);
// document.querySelectorAll('players').addEventListener('selected', numPlayers);


/*----- functions -----*/

//buildJokerDeck();


function splitCards() {
  const tempDeck = [shuffledDeck]
  buildOriginalDeck();
  getNewShuffledDeck();
  
	while (shuffledDeck.length) {

    const rndIdx = Math.floor(Math.random() * shuffledDeck.length/2)

    playerHand.push(shuffledDeck.splice(rndIdx,0));
	}
  while (shuffledDeck.length) {

    const rndIdx = Math.floor(Math.random() * shuffledDeck.length/2)
    
    compHand.push(shuffledDeck.splice((rndIdx),0));
  }

	$('.playCount').html("Player cards: " + playerHand.length);
	$('.compCount').html("Computer cards: " + compHand.length);
	$('.result').html("");
}



function compare(player, comp) {
	
	if((player % 13) > (comp % 13)) {
	
		$('.result').html("Player wins!")
		
		playerHand.push(comp);
		playerHand.push(player);

		playerHand.shift();
		compHand.shift();

		updateCount();
		checkWin();
	}


	else if ((player % 13) < (comp % 13)) {
		
		$('.result').html("Computer wins!")
		
		compHand.push(player);
		compHand.push(comp);

		compHand.shift();
		playerHand.shift();

		updateCount();
		checkWin();
	}

	else if ((player % 13) === (comp % 13))
		war();
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


function compareWar(player, comp) {
	
	if((player % 13) > (comp % 13)) {
	
		$('.result').html("Player wins!");
		
		playerHand.push.apply(playerHand, warArray);

		playerHand.push(comp);
		playerHand.push(player);
		
		playerHand.shift();
		compHand.shift();
		
		warArray.length = 0;

		updateCount();
		checkWin();
	}

	
	else if ((player % 13) < (comp % 13)) {
		
		$('.result').html("Computer wins!");
		
		compHand.push.apply(compHand, warArray);
		
		compHand.push(player);
		compHand.push(comp);

		playerHand.shift();
		compHand.shift();

		warArray.length = 0;

		updateCount();
		checkWin();
	}


	else if ((player % 13) === (comp % 13))
		war();
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

// function rules(){

// }

// function playRounds(){

// }

// function numPlayers(){

// }

function getNewShuffledDeck() {
  // Create a copy of the originalDeck (leave originalDeck untouched!)
  const tempDeck = [...originalDeck];
  while (tempDeck.length) {
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length/2);
    
    shuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
}
// function renderDeckInContainer(shuffledDeck, shuffledContainer) {
//   shuffledContainer.innerHTML = '';

//   const cardsHtml = shuffledDeck.reduce(function(html, card) {
//     return html + `<div class="card ${card.face}"></div>`;
//   }, '');

//   shuffledContainer.innerHTML = cardsHtml;
// }

//function renderNewShuffledDeck() {
  // Create a copy of the originalDeck (leave originalDeck untouched!)
 // shuffledDeck = getNewShuffledDeck();
  //renderDeckInContainer(shuffledDeck, shuffledContainer);
//}

// function renderJokerDeckInContainer(deck, container) {
//   container.innerHTML = '';

//   let cardHtml = '';
//   deck.forEach(function(card) {
//     cardHtml += `<div class="card ${card.face}"></div>`;
//   });
  
//   container.innerHTML = cardHtml;
// } 

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
// function buildJokerDeck() {
//   const deck = [];
//   // Use nested forEach to generate card objects
//   suits.forEach(function(suit) {
//     ranks.forEach(function(rank) {
//       deck.push({
        
//         face: `${suit}${rank}`,
        
//         value: Number(rank) || (rank=== 'A' ? 14: rank === 'K' ? 13: rank === 'Q' ? 12: rank ==='J' ? 11: rank === 'joker-black' ? 15: rank === 'joker-red' ? 15:10)
       
//       });
//     });
//   });
//   return deck;
// }


  function deal() {
	splitCards();
  
    $('.playerCard').html("");
    $('.compCard').html("");
    $('.newGame').show();
  
    playerCard = playerHand[0];
    compCard = compHand[0];
   // let face= `${suit}${rank}`;
    // var img = face: `${suit}${rank}`;
    // var img2 = face: `${suit}${rank}`;
  
    // img.src = (face: `${suit}${rank}`, + playerHand[0]);
    // img2.src = (face: `${suit}${rank}`, + compHand[0]);
  
    // $('.playerCard').append(face);
    // $('.compCard').append(face);
  
    compare(playerCard, compCard);
  }