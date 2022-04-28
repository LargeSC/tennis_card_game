// javascript

/*

Empieza cada quien con 4 barajas, 2 visibles y 2 invisibles.
Puedes cambiar cualquiera de las barajas por la que te salga del pozo.

Tienes cada baraja, con su valor, display y suit


*/
const cardDiscardEl = document.getElementById("card-discard-el")
const newCardBtn = document.getElementById("new-card-btn")
const passCardBtn = document.getElementById("pass-card-btn")

const playerOneDiv = document.getElementById("player-one")
const playerTwoDiv = document.getElementById("player-two")
let playerOneHtml, playerTwoHtml

let discardedCard = ""

const scorePlayer1 = document.getElementById("score-player1")
const scorePlayer2 = document.getElementById("score-player2")
const message = document.getElementById("message")



let suits = ["spades","clubs","diamonds","hearts"]
let player1Turn = true;

let cardsDeck = []
let cardsPlayer1 = []
let cardsPlayer2 = []

function createDeck(){
    // Create the deck of cards:
    for(let suit of suits){
        for(let n=0 ; n<=12 ; n++){
            let display = n
            if(n===0){display="K"}
            else if(n===1){display="A"}
            else if(n===11){display="J"}
            else if(n===12){display="Q"}
            else{display=n}
            
            let card = {value: n, display:display, suit: suit}
            cardsDeck.push(card)
        }
    }
}

createDeck()


// Get a random card and remove from deck of cards
function randomCard() {
    if(cardsDeck.length>0){
        const randomNumber = Math.floor((Math.random()*cardsDeck.length))
        const card = cardsDeck[randomNumber]
        cardsDeck.splice(randomNumber,1)
        return card
    } 
}

// Set the initial cards on the board
function startGame(array){
    for(let i=0; i<4 ; i++){
        array.push(randomCard())
    }
}

startGame(cardsPlayer1)
startGame(cardsPlayer2)



// Sum the points for a player

function sumCards(array){
    let sumOfCards = 0
    for(let item of array){
        sumOfCards += item.value
        console.log(item.value)
    }
    return sumOfCards
}

// Display the sum points of each player
function renderScores(){
    scorePlayer1.textContent = sumCards(cardsPlayer1)
    scorePlayer2.textContent = sumCards(cardsPlayer2)
}

renderCards()
checkTurn()


function renderCards() {
    
    //Esta es la forma en que las muestro ahora. Si quisiera saber que indice es el que me estoy
    playerOneHtml = cardsPlayer1.map((card,index) =>{
        return `
            <div class="card ${card.suit}" data-index="${index}" data-value="${card.value}">
                ${card.display}
            </div>`
    }).join("")

    playerTwoHtml = cardsPlayer2.map((card,index) =>{
        return `
            <div class="card ${card.suit}" data-index="${index}" data-value="${card.value}">
                ${card.display}
            </div>`
    }).join("")
    
    playerOneDiv.innerHTML = playerOneHtml
    playerTwoDiv.innerHTML = playerTwoHtml
    
    // A new card is shown, the classname is restarted to card and the suit
    discardedCard != ""? cardDiscardEl.className= `card ${discardedCard.suit}` :""
    cardDiscardEl.textContent = discardedCard.display
    
    cardDiscardEl.removeEventListener('click', function() {
            console.log(card.value, card.suit)
        })

    //Here I create the click event for each of the cards.
    //TODO there is a problem with the discard card getting many event listeners.
    const cardsInGame = Array.from(document.getElementsByClassName("card"))
    for(let card of cardsInGame){
        card.addEventListener('click',function(event) {
            //If its your turn and there is a card on the discard you can swap it for another in your game. 
            // Once you swap, your card goes to the discard and your turn ends. The other player can then decide to take the card or deal a New card.
            const cardToSwap = {value: parseInt(card.dataset.value), display:card.textContent, suit:card.classList[1]}
            const cardIndex = card.dataset.index
            if(discardedCard!=""){
                const tempCard = discardedCard
                discardedCard = cardToSwap
                if(player1Turn){
                    cardsPlayer1[cardIndex] = tempCard
                } else {
                    cardsPlayer2[cardIndex] = tempCard
                }
                renderCards()
                player1Turn = !player1Turn
                checkTurn()
                console.log("player 1 turn?"+player1Turn)
            }
            
        })
    }
    renderScores()
}

function checkTurn(){
    if (player1Turn){
        playerOneDiv.style.transform="scale(1.1)"
        playerTwoDiv.style.transform="scale(1)"
        // playerOneDiv.style.border="1px solid white"
        // playerTwoDiv.style.border="none"
    } else{
        playerOneDiv.style.transform="scale(1)"
        playerTwoDiv.style.transform="scale(1.1)"
        // playerOneDiv.style.border="none"
        // playerTwoDiv.style.border="1px solid white"
    }
}

function swapCards(card1, card2){
    console.log("clicked")
}

// Create new card
newCardBtn.addEventListener("click", ()=>{
    if(cardsDeck.length>0){
        discardedCard = randomCard()
        renderCards()
    } else {
        console.log("No cards left")
    }
})

// Pass card
passCardBtn.addEventListener('click',()=>{
    player1Turn = !player1Turn
    checkTurn()
})


