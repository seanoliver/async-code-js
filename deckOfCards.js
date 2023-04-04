'use strict';

let deckId; //will be assigned on page load
let zCounter; // will be assigned on page load

/**
 * Controller function to fetch the deck ID and draw a card.
 */
// async function start() {
// 	const deckId = await getDeckId();
// 	const card = await drawCard(deckId);
// }

/**
 * Fetch a new deck ID from the deck of cards API and assign it to the global
 * variable deckId.
 */
async function getDeckId() {
	const response = await axios.get(
		'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
	);

	const deckId = response.data.deck_id;

	return deckId;
}

/**
 * Draw two cards from the deck at deckId
 */
// async function drawCard(deckId) {
// 	const response1 = await axios.get(
// 		`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
// 	);

// 	// const response2 = await axios.get(
// 	//   `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
// 	// );

// 	const value1 = response1.data.cards[0].value;
// 	const suit1 = response1.data.cards[0].suit;

//   // const {value, suit} = response1.data.cards[0];
//   // TODO: destructuring this could make this easier

// 	const value2 = response2.data.cards[0].value;
// 	const suit2 = response2.data.cards[0].suit;

// 	console.log({ value1, suit1 });
// 	console.log({value1, suit1}, {value2, suit2});
// }

/**
 * Called when page is first loaded, initializes deckId and the zCounter global
 * variables. TODO: Also empties out card display area.
 */
async function start() {
  $('#card-display').empty();
	deckId = await getDeckId();
	zCounter = 0;
}

/**
 * Draw a new card upon button click and display the card on top of any prior
 * drawn cards.
 * TODO: Consider breaking out this function and document capabilities
 *  -> drawCard
 *  -> displayCard
 *  -> controllerFunction that checks if the zCounter is <= 52
 * TODO: This function doesn't have anything to do with the "button click"
 * TODO: Refactor the zCounter to instead use the remaining field in the
 * response from the API (which tracks remaining cards).
 */
async function drawCard() {
  zCounter++;

  if (zCounter > 52) {
    start();
    return;
  }
  const response = await axios.get(
		`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
	);

	const cardImgUrl = response.data.cards[0].images.png;

	const $cardDisplay = $('#card-display');
	const $cardImg = $(`<img src=${cardImgUrl}>`);

	$cardImg.attr(
		'style',
		`position: absolute;
    z-index: ${zCounter};
    transform: rotate(${zCounter}deg);`
	);
	$cardDisplay.append($cardImg);
}

$('#draw-card-btn').on('click', drawCard);
start();
