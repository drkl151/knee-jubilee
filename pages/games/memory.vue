<template>
    <div class="wrapper">
        <ul class="cards">
            <li v-for="(card, index) in shuffledCards" :key="index" class="card"
                :class="{ flip: card.flipped, shake: card.shake }" @click="flipCard(card, index)">
                <div class="view front-view">
                    <img src="/games/memory/img/icon.webp" alt="icon" />
                </div>
                <div class="view back-view">
                    <img :src="`/games/memory/img/${card.image}`" alt="card-img" />
                </div>
            </li>
        </ul>

        <div class="details">
            <p class="time">Time: <span><b>{{ timeLeft }}</b>s</span></p>
            <p class="flips">Flips: <span><b>{{ flips }}</b></span></p>
            <button @click="shuffleCards">Refresh</button>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const cardImages = [
    '1.webp',
    '2.webp',
    '3.webp',
    '4.webp',
    '5.webp',
    '6.webp'
]

const maxTime = 20
const timeLeft = ref(maxTime)
const flips = ref(0)
const matchedPairs = ref(0)
const isPlaying = ref(false)
const disableDeck = ref(false)
let timer = null

const cardOne = ref(null)
const cardTwo = ref(null)

const shuffledCards = reactive([])

function createShuffledCards() {
    const cards = [...cardImages, ...cardImages]
    cards.sort(() => Math.random() - 0.5)
    return cards.map((img) => ({
        image: img,
        flipped: false,
        shake: false
    }))
}

function shuffleCards() {
    timeLeft.value = maxTime
    flips.value = 0
    matchedPairs.value = 0
    isPlaying.value = false
    disableDeck.value = false
    clearInterval(timer)
    cardOne.value = null
    cardTwo.value = null
    shuffledCards.splice(0, shuffledCards.length, ...createShuffledCards())
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft.value <= 0) {
            clearInterval(timer)
        } else {
            timeLeft.value--
        }
    }, 1000)
}

function flipCard(card, index) {
    if (!isPlaying.value) {
        isPlaying.value = true
        startTimer()
    }

    if (disableDeck.value || card.flipped || timeLeft.value <= 0) return

    flips.value++
    card.flipped = true

    if (!cardOne.value) {
        cardOne.value = { ...card, index }
    } else {
        cardTwo.value = { ...card, index }
        disableDeck.value = true
        checkMatch()
    }
}

function checkMatch() {
    const first = shuffledCards[cardOne.value.index]
    const second = shuffledCards[cardTwo.value.index]

    if (cardOne.value.image === cardTwo.value.image) {
        matchedPairs.value++
        if (matchedPairs.value === cardImages.length) {
            clearInterval(timer)
        }
        resetCards()
    } else {
        first.shake = second.shake = true
        setTimeout(() => {
            first.shake = second.shake = false
            first.flipped = second.flipped = false
            resetCards()
        }, 1000)
    }
}

function resetCards() {
    cardOne.value = null
    cardTwo.value = null
    disableDeck.value = false
}

onMounted(shuffleCards)
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Trajan Pro", serif;
}

p {
    font-size: 20px;
}

body {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: #6563ff;
}

::selection {
    color: #fff;
    background: #6563ff;
}

.wrapper {
    padding: 25px;
    background: #f8f8f8;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.cards,
.card,
.view,
.details,
p {
    display: flex;
    align-items: center;
    justify-content: center;
}

.cards {
    height: 550px;
    width: 700px;
    flex-wrap: wrap;
    gap: 15px;
}

.cards .card {
    cursor: pointer;
    position: relative;
    perspective: 1000px;
    transform-style: preserve-3d;
    height: calc(100% / 4 - 10px);
    width: calc(100% / 4 - 10px);
}

.card.shake {
    animation: shake 0.35s ease-in-out;
}

@keyframes shake {

    0%,
    100% {
        transform: translateX(0);
    }

    20% {
        transform: translateX(-13px);
    }

    40% {
        transform: translateX(13px);
    }

    60% {
        transform: translateX(-8px);
    }

    80% {
        transform: translateX(8px);
    }
}

.cards .card .view {
    width: 100%;
    height: 100%;
    user-select: none;
    pointer-events: none;
    position: absolute;
    background: #fff;
    border-radius: 7px;
    backface-visibility: hidden;
    transition: transform 0.25s linear;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.card .front-view img {
    max-width: 70px;
}

.card .back-view {
    transform: rotateY(-180deg);
}

.card .back-view img {
    max-width: 70px;
}

.card.flip .front-view {
    transform: rotateY(180deg);
}

.card.flip .back-view {
    transform: rotateY(0);
}

.details {
    width: 100%;
    margin-top: 15px;
    padding: 0 20px;
    border-radius: 7px;
    background: #fff;
    height: calc(100% / 4 - 30px);
    justify-content: space-between;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.details p {
    font-size: 18px;
    height: 17px;
    padding-right: 18px;
    border-right: 1px solid #ccc;
}

.details p span {
    margin-left: 8px;
}

.details p b {
    font-weight: 500;
}

.details button {
    cursor: pointer;
    font-size: 14px;
    color: #6563ff;
    border-radius: 4px;
    padding: 4px 11px;
    background: #fff;
    border: 2px solid #6563ff;
    transition: 0.3s ease;
}

.details button:hover {
    color: #fff;
    background: #6563ff;
}

@media screen and (max-width: 800px) {
    .cards {
        height: 550px;
        width: 400px;
    }

    .card .front-view img {
        max-width: 40px;
    }

    .card .back-view img {
        max-width: 40px;
    }
}

@media screen and (max-width: 530px) {
    .cards {
        height: 450px;
        width: 300px;
    }

    .card .back-view img {
        max-width: 35px;
    }

    .details {
        margin-top: 10px;
        padding: 0 15px;
        height: calc(100% / 4 - 20px);
    }

    .details p {
        height: 15px;
        font-size: 17px;
        padding-right: 13px;
    }

    .details button {
        font-size: 13px;
        padding: 5px 10px;
        border: none;
        color: #fff;
        background: #6563ff;
    }
}
</style>