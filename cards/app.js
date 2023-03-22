let baseURL = 'https://deckofcardsapi.com/api/deck';

async function card() {
    data = await $.getJSON(`${baseURL}/new/draw/`);
    console.log(`${data.cards[0].value} of ${data.cards[0].suit}`);
}
card()


let card1 = null;
let card2 = null;
async function cards() {
    let data1 = await $.getJSON(`${baseURL}/new/draw/`);
    let deckId = data1.deck_id
    card1 = data1.cards[0];

    let data2 = await $.getJSON(`${baseURL}/${deckId}/draw/`);
    card2 = data2.cards[0];
    for (let data of [card1, card2]) {
        console.log(`${data['value']} of ${data['suit']}`)
    }
}
cards()

let deckId = null;
let $btn = $('button');
let $cardArea = $('#card-area');
async function getDeck() {
    res = await $.getJSON(`${baseURL}/new/shuffle/`);
    deckId = res.deck_id;
    $btn.show().on('click', async function () {
        cardData = await $.getJSON(`${baseURL}/${deckId}/draw/`);
        let cardSrc = cardData.cards[0].image;
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;
        $cardArea.append(
            $('<img>', {
                src: cardSrc,
                css: {
                    transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                }
            }));
        if (cardData.remaining === 0) $btn.remove();
    })
}
getDeck()