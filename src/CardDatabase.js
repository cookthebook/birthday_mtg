import { magicCardFromIndex, magicCardFromIndexLegendary } from './MagicCard';
const database = require('./birthday_sorted.json');
const dbLegendary = require('./birthday-legendary_sorted.json');

//2020-07-11: The Epoch Year will be the starting year to generate db/lists from. 
// so if someone was born in 1985, their pools from 1985-EPOCH_YEAR will all be generated from available cards
// at the time of the epoch. So eventually, Setting epoch to 2020, but might test with 2010 or something to ensure correct
// functionality
const EPOCH_YEAR = 2020;

/* get an object with the card name, set, date, and image URL */
export function getCardInfo(index) {
    let rawCard;
    let cardName;
    let cardSet;
    let cardDate;
    let cardURL;

    if (index > database.cards.length) {
        console.log(`Invalid card index ${index}...`);
        return null;
    }

    rawCard = database.cards[index];
    cardName = rawCard[0];
    cardSet = rawCard[1];
    cardDate = rawCard[2];
    cardURL = rawCard[3];

    return { name: cardName, set: cardSet, date: cardDate, image: cardURL };
}

export function getCardInfoLegendary(index) {
    let rawCard;
    let cardName;
    let cardSet;
    let cardDate;
    let cardURL;

    if (index > dbLegendary.cards.length) {
        console.log(`Invalid card index ${index}...`);
        return null;
    }

    rawCard = dbLegendary.cards[index];
    cardName = rawCard[0];
    cardSet = rawCard[1];
    cardDate = rawCard[2];
    cardURL = rawCard[3];

    return { name: cardName, set: cardSet, date: cardDate, image: cardURL };
}

export function getRandomCards(count, seed, year) {
    let seedrandom = require('seedrandom');
    let rng = seedrandom(seed);
    let max = cardCount(year);
    let maxLegendary = cardCountLegendary(year);

    let cards = new Array(count).fill(undefined);
    cards.forEach((_, index, self) => {
        // rng() does not affect global Math.Random() rng
        // observation: rng seems to result in mannny of the same cards. Could be a nonexistant pattern *shrug*
        self[index] = magicCardFromIndex(Math.floor(rng() * max), index);
    });
    cards[count - 1] = magicCardFromIndexLegendary(Math.floor(rng() * maxLegendary), count - 1);

    return cards;
}

export function cardCount(year) {
    if (year > EPOCH_YEAR) {
        // do something
        // Sam Note: So i kinda just put the code handle dates entered below
        // might actually support people putting in dates earlier than 2020, but not 1993,
        // as to allow old school magic, etc. If entered below 1993 it would instead 
        // default to some other date, etc
    }
    let releaseDate;
    let maxDate = new Date(year);
    let cardsToSubtract = database.cards.length -1;
    while(cardsToSubtract > 0){
        releaseDate = new Date(database.cards[cardsToSubtract][2]);
        if(releaseDate > maxDate)
            cardsToSubtract--;
        else
            break;
    }

    return cardsToSubtract + 1;
}

export function cardCountLegendary(year) {
    if (year > EPOCH_YEAR) {
        // do something
        // Sam Note: So i kinda just put the code handle dates entered below
        // might actually support people putting in dates earlier than 2020, but not 1993,
        // as to allow old school magic, etc. If entered below 1993 it would instead 
        // default to some other date, etc
    }
    let releaseDate;
    let maxDate = new Date(year);
    let cardsToSubtract = dbLegendary.cards.length -1;
    while(cardsToSubtract > 0){
        releaseDate = new Date(dbLegendary.cards[cardsToSubtract][2]);
        if(releaseDate > maxDate)
            cardsToSubtract--;
        else
            break;
    }

    return cardsToSubtract + 1;
}
