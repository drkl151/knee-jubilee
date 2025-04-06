<template>
    <div class="riddle-container">
        <video v-if="!videoStarted" id="posterVideo" poster="/games/riddle/wk_start.png" @click="startVideo" muted
            playsinline></video>

        <CustomButton v-if="showSkip" buttonText="Skip" size="small" class="skipButton" @clicked="nextVideo" />

        <video v-if="videoStarted" id="videoPlayer" ref="videoPlayer" loop playsinline></video>

        <div v-if="showInput" id="inputContainer">
            <p>Enter the correct answer:</p>
            <input type="text" v-model="userAnswer" @keyup.enter="checkAnswer" autocomplete="off" />
            <Button buttonText="Answer" size="large" @clicked="checkAnswer" />
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useRouter } from "#app";
import CustomButton from '@/components/ui/MainButton.vue';
import Button from '@/components/ui/Button.vue';

const router = useRouter();
const videoPlayer = ref(null);
const videoStarted = ref(false);
const showSkip = ref(false);
const showInput = ref(false);
const userAnswer = ref("");
const currentStep = ref(0);

const videos = {
    start: "/games/riddle/video/wk_start.mp4",
    idle: "/games/riddle/video/wk_idle.mp4",
    correct: "/games/riddle/video/wk_right.mp4",
    wrong: "/games/riddle/video/wk_wrong.mp4",
};

onMounted(() => {
    if (localStorage.getItem("wk_riddle_completed") === "true") {
        router.push("/");
    }
});

function startVideo() {
    videoStarted.value = true;
    showSkip.value = true;

    nextTick(() => {
        if (videoPlayer.value) {
            videoPlayer.value.src = videos.start;
            videoPlayer.value.autoplay = true;
            videoPlayer.value.muted = false;
            videoPlayer.value.loop = false;
            videoPlayer.value.play();

            videoPlayer.value.onended = () => nextVideo();
        }
    });
}


function nextVideo() {
    currentStep.value++;
    if (videoPlayer.value) {
        videoPlayer.value.src = videos.idle;
        videoPlayer.value.loop = true;
        videoPlayer.value.play();
    }
    showSkip.value = false;
    showInput.value = true;
}

function checkAnswer() {
    if (videoPlayer.value) {
        videoPlayer.value.loop = false;
    }

    const correctAnswers = ["трусіки", "трусики", "труси", "трусы", "underpants"];

    if (correctAnswers.includes(userAnswer.value.trim())) {
        if (videoPlayer.value) {
            videoPlayer.value.src = videos.correct;
            videoPlayer.value.onended = () => router.push("/");
            videoPlayer.value.play();
        }
        showInput.value = false;
        localStorage.setItem("wk_riddle_completed", "true");

        let coins = parseInt(localStorage.getItem("player_coins")) || 0;
        localStorage.setItem("player_coins", coins + 10);
    } else {
        if (videoPlayer.value) {
            videoPlayer.value.src = videos.wrong;
            videoPlayer.value.play();
        }
        userAnswer.value = "";
    }
}
</script>

<style scoped>
h1 {
    color: wheat;
    margin-bottom: 215px;
    font-family: "Trajan-Bold", sans-serif;
}

#startImg {
    cursor: pointer;
}

.skipButton {
    bottom: 20px;
    right: 20px;
    position: absolute;
    z-index: 10;
}

#inputContainer {
    position: absolute;
    z-index: 10;
    background: rgba(0, 0, 0, 0.7);
    padding: 20px;
    border-radius: 10px;
    color: white;
    text-align: center;
}

input {
    padding: 10px;
    font-size: 18px;
    margin-top: 10px;
}

button {
    padding: 10px;
    font-size: 18px;
    margin-left: 10px;
    cursor: pointer;
}
</style>
