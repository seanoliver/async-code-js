"use strict";

let deckId; //will be assigned on page load

// async function start() {
//   const deckId = await getDeckId();
//   const card = await drawCard(deckId);
// }

async function getDeckId() {
  const response = await axios.get(
    'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    );

  const deckId = response.data.deck_id;

  return deckId;
}

// async function drawCard(deckId) {
//   const response1 = await axios.get(
//     `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
//   );

//   const response2 = await axios.get(
//     `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
//   );

//   const value1 = response1.data.cards[0].value;
//   const suit1 = response1.data.cards[0].suit;

//   const value2 = response2.data.cards[0].value;
//   const suit2 = response2.data.cards[0].suit;

//   console.log({value1, suit1}, {value2, suit2});
// }

async function start() {
  deckId = await getDeckId();
}

async function drawCard() {
  const response = await axios.get(
    `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
  );

  const cardImgUrl = response.data.cards[0].images.png;

  const $cardDisplay =  $('#card-display');
  const $cardImg = $(`<img src=${cardImgUrl}>`);
  $cardDisplay.append($cardImg);

}

$('#draw-card-btn').on('click', drawCard);
start();