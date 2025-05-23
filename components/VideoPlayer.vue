<template>
  <div class="video-wrapper fullscreen" @click="handleClick">
    <video
      ref="videoEl"
      :poster="poster"
      :loop="loop"
      playsinline
      :muted="muted"
      class="video-player"
    ></video>

    <MainButton
      v-if="showSkip"
      class="skipButton"
      size="small"
      button-text="Skip"
      @clicked="$emit('skip')"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import MainButton from '@/components/ui/MainButton.vue';

const props = defineProps({
  videoSrc: {
    type: String,
    default: '',
  },
  poster: {
    type: String,
    default: '',
  },
  loop: Boolean,
  showSkip: Boolean,
  muted: {
    type: Boolean,
    default: false,
  },
  canPlay: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['started', 'ended', 'skip']);

const videoEl = ref(null);
const hasInteracted = ref(false);

function playVideo() {
  if (videoEl.value && props.videoSrc) {
    videoEl.value.src = props.videoSrc;
    videoEl.value.play().catch((err) => {
      console.warn('Autoplay blocked or error:', err);
    });

    videoEl.value.onended = () => {
      emit('ended');
    };
  }
}

function handleClick() {
  if (!props.canPlay) return;

  if (!hasInteracted.value) {
    hasInteracted.value = true;
    playVideo();
    emit('started');
  }
}

watch(
  () => props.videoSrc,
  (newVal) => {
    if (hasInteracted.value && newVal && videoEl.value) {
      playVideo();
    }
  }
);

onMounted(() => {
  videoEl.value.muted = props.muted;
});
</script>

<style scoped>
.skipButton {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 10;
}
</style>
