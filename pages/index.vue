<template>
    <div class="main-container">
        <audio ref="bgMusic" loop>
            <source src="/audio/menu.mp3" type="audio/mpeg" />
        </audio>

        <div class="interface">
            <div id="score">{{ score }}</div>
        </div>

        <div id="map" v-show="showMap">
            <video ref="videoMap" src="/video/map.mp4" loop autoplay style="display: none"></video>

            <NuxtLink v-if="!riddleCompleted" to="/games/riddle" class="hero-mini"
                :data-video="getAssetPath('hero_mini/wk.mp4')" :data-time="0" :data-style="'display: block;'"
                :data-shadow="'0 0 20px rgb(21, 145, 41), inset 0 0 15px rgb(64, 75, 73)'" :data-pos-x="58"
                :data-pos-y="58">
                <video loop muted class="hero-video"></video>
            </NuxtLink>

            <NuxtLink to="/games/quiz" class="hero-mini" :data-video="getAssetPath('hero_mini/wyvern_mini.mp4')"
                :data-time="0" :data-style="'display: block;'"
                :data-shadow="'0 0 20px rgb(19, 160, 178), inset 0 0 15px rgb(24, 227, 198)'" :data-pos-x="61"
                :data-pos-y="23">
                <video loop muted class="hero-video"></video>
            </NuxtLink>

        </div>

        <div class="menu" v-show="!showMap">
            <CustomButton buttonText="Мапа" size="large" @clicked="startGame" />
            <CustomButton buttonText="Лавка" size="large" @clicked="startGame" />
        </div>
    </div>
</template>

<script setup>
import CustomButton from '../components/ui/MainButton.vue';
import { ref, onMounted } from "vue";

const showMap = ref(false);
const bgMusic = ref(null);
const videoMap = ref(null);
const score = ref(0);
const riddleCompleted = ref(false);

onMounted(() => {
    initGame();
    updateScore();
});

const getAssetPath = (file) => {
    return `/${file}`;
};

const initGame = () => {
    const heroBlocks = document.querySelectorAll(".hero-mini");

    heroBlocks.forEach((block) => {
        const video = block.querySelector(".hero-video");
        if (video) {
            video.src = block.dataset.video;
            video.currentTime = parseFloat(block.dataset.time) || 0;
            video.setAttribute("style", block.dataset.style);
            video.pause();
        }

        block.style.left = `${block.dataset.posX || 50}vw`;
        block.style.top = `${block.dataset.posY || 50}vh`;

        block.addEventListener("mouseenter", () => {
            if (video) video.play();
            block.style.boxShadow = block.dataset.shadow;
        });

        block.addEventListener("mouseleave", () => {
            if (video) {
                video.pause();
                video.currentTime = parseFloat(block.dataset.time) || 0;
            }
            block.style.boxShadow =
                "0 0 20px rgba(255, 255, 255, 0.5), inset 0 0 15px rgba(200, 200, 200, 0.3)";
        });
    });
};

const startGame = () => {
    showMap.value = true;
    if (videoMap.value) {
        videoMap.value.style.display = "block";
        videoMap.value.play();
    }
    if (bgMusic.value) {
        bgMusic.value.play();
        bgMusic.value.volume = 0.2;
    }
};

const updateScore = () => {
    score.value = localStorage.getItem("player_coins") || 0;
};

</script>

<style scoped>
.grayscale {
    filter: grayscale(100%);
}

.menu {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-top: 50px;
}

#score {
    position: absolute;
    right: 0;
    top: 0;
    padding: 20px;
    font-size: 30px;
}

.main-container {
    width: 100vw;
    height: 100vh;
    background-image: url("/img/bg_repeater.jpg");
    background-position: -300px;
    background-size: cover;
}

#videoMap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    z-index: -1;
}

.hero-mini {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.5),
        inset 0 0 15px rgba(200, 200, 200, 0.3);
    background-image: url("./img/greyfade.jpg");
    cursor: pointer;
    position: absolute;
    transition: 1s;
}

.hero-mini:hover {
    box-shadow: 0 0 20px rgb(19 160 178), inset 0 0 15px rgb(24 227 198);
    transition: 0.4s;
}

.hero-mini:hover::before {
    opacity: 1;
}

.hero-mini video {
    mix-blend-mode: lighten;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.2) translate(0px, 8px);
}
</style>