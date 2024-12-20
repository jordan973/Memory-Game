const cards = [
    'https://picsum.photos/id/237/100/100', 
    'https://picsum.photos/id/238/100/100',
    'https://picsum.photos/id/239/100/100',
    'https://picsum.photos/id/240/100/100',
    'https://picsum.photos/id/241/100/100',
    'https://picsum.photos/id/242/100/100',
    'https://picsum.photos/id/243/100/100',
    'https://picsum.photos/id/244/100/100'
  ];

gameBoard = document.getElementById('game-board');
selectedCards = [];

timer = document.getElementById('timer');

function createCard(urlCard){
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = urlCard;

    const img = document.createElement('img');
    img.classList.add('card-content');
    img.src = urlCard;

    card.appendChild(img);
    
    card.addEventListener('click', (e) => {
        const parent = e.target.parentElement;
        parent.classList.add('card-flip');

        selectedCards.push(card);
        if (selectedCards.length == 2) {
            setTimeout(() => {
                if (selectedCards[0].dataset.value == selectedCards[1].dataset.value) {
                    selectedCards[0].classList.add('matched');
                    selectedCards[1].classList.add('matched');
                    alert('Bonnes cartes !');

                    const test = document.querySelectorAll('.card:not(.matched)');
                    setTimeout(() => {
                        if (test.length == 0) {
                            alert('Vous avez gagné !');
                        }
                    }, 100);
                }
                else{
                    alert('Mauvaises cartes !');
                    selectedCards[0].classList.remove('card-flip');
                    selectedCards[1].classList.remove('card-flip');     
                }
                selectedCards = [];
            }, 100);
        }
    });
    return card;
}

function shuffleArray(arrayToShuffled){

    const arrayShuffled = arrayToShuffled.sort(() => 0.5 - Math.random());
    return arrayShuffled;
}

function tabDouble(tabSimple){
    tableauDouble = [];
    tableauDouble.push(...tabSimple);
    tableauDouble.push(...tabSimple);

    return tableauDouble;
}

function startTimer(){
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer(){
    const now = Date.now();
    const elapsedTime = Math.floor((now - startTime) / 1000);

    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;

    timer.value = minutes.toString() + ':' + seconds.toString();
}

function stopTimer(){
    clearInterval(timerInterval);
}

startTimer();
let allCards = tabDouble(cards);
allCards = shuffleArray(allCards);

for (const carte of allCards) {
    cardHtml = createCard(carte);
    gameBoard.appendChild(cardHtml);
}

let btnReplay = document.getElementById('replay');
btnReplay.addEventListener('click', () => {
    gameBoard.innerHTML = '';
    selectedCards = [];

    let allCards = tabDouble(cards);
    allCards = shuffleArray(allCards);

    for (const carte of allCards) {
        cardHtml = createCard(carte);
        gameBoard.appendChild(cardHtml);
    }
});

