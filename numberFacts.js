'use strict';

const NUMBERS_API_URL = 'http://numbersapi.com';

/**
 * Gets a fact about a single favorite number and prints it on the screen.
 */
async function getFavNumFact(num) {
	const fact = await axios.get(`${NUMBERS_API_URL}/${num}?json`);
	const placeOnPage = document.getElementById('fav-num-fact');

	placeOnPage.innerText = fact.data.text;
}

getFavNumFact(42);

/**
 * Gets a fact about an arbitrary number of numbers and prints each of them on
 * the screen.
 */
async function getMultipleFacts(...nums) {
	const numString = nums.join(',');
	const fact = await axios.get(`${NUMBERS_API_URL}/${numString}?json`);
	const placeOnPage = document.getElementById('fav-num-fact');

	for (const num in fact.data) {
		const newLine = document.createElement('p');
		newLine.innerText = fact.data[num];
		placeOnPage.append(newLine);
	}
}

getMultipleFacts(42, 12, 15, 29);

/**
 * Gets four facts about a single number and prints them all on the screen once
 * all of the requests have resolved.
 */
async function getFourFactsFor(num) {
	const fact1 = axios.get(`${NUMBERS_API_URL}/${num}?json`);
	const fact2 = axios.get(`${NUMBERS_API_URL}/${num}?json`);
	const fact3 = axios.get(`${NUMBERS_API_URL}/${num}?json`);
	const fact4 = axios.get(`${NUMBERS_API_URL}/${num}?json`);

	const results = await Promise.allSettled([fact1, fact2, fact3, fact4]);

	const placeOnPage = document.getElementById('fav-num-fact');
	console.log('results', results);
	for (const result of results) {
		if (result.status === 'fulfilled') {
			const newLine = document.createElement('p');
			newLine.innerText = result.value.data.text;
			placeOnPage.append(newLine);
		}
	}
}

getFourFactsFor(88);
