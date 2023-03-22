let baseURL = 'http://numbersapi.com';

async function favNum(num) {
    res = await $.getJSON(`${baseURL}/${num}?json`);
    console.log(res.text)
}
favNum(5);

async function favNums(nums) {
    for (let n of nums) {
        res = await $.getJSON(`${baseURL}/${n}?json`);
        console.log(res.text)
        $('body').append(`<p>${res.text}</p>`);
    }
}
favNums([1, 2, 3]);

async function fourFacts(num) {
    let facts = await Promise.all(
        Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${num}?json`)));
    facts.forEach(res => {
        $('body').append(`<p>${res.text}</p>`);
    });
}
fourFacts(22);