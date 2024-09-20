<template>
  <UContainer class="p-5">
    <div class="flex mb-5 justify-between items-center">
      <div class="flex flex-col">
        <h1>{{ category?.name }}</h1>
        <p class="italic">
          {{ category?.sounds.length ? 'Klik op een geluid om deze af te spelen' : 'Geen geluiden gevonden in deze categorie' }}
        </p>
      </div>
      <!--      <UButton-->
      <!--        class="h-max"-->
      <!--        icon="i-heroicons-plus"-->
      <!--        color="black"-->
      <!--        sr-only="Voeg een sound effect toe"-->
      <!--        :disabled="true"-->
      <!--      />-->
    </div>

    <div class="grid grid-cols-2 gap-4">
      <UCard
        v-for="(sound, index) in category?.sounds"
        :key="index"
        :class="[getColor(index), (isPlaying && playingSound?.name !== sound.name ? 'cursor-not-allowed' : 'cursor-pointer')]"
        @click="playSound(sound)"
      >
        <div class="w-full flex flex-col items-center justify-center">
          <div class="relative">
            <UButton
              class="rounded-full"
              color="black"
              icon="i-heroicons-play"
              :disabled="isPlaying && playingSound?.name !== sound.name"
              @click="playSound(sound)"
            />
            <div v-if="playingSound?.name === sound.name" class="absolute inset-0 flex items-center justify-center">
              <div class="rounded-full border-4 border-black"
                   :style="{ width: '100%', height: '100%', clipPath: `inset(${100 - progress}% 0 0 0)` }"></div>
            </div>
          </div>
          <h6 class="uppercase mt-2">{{ sound.name }}</h6>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import data from 'public/data.json';

type Sound = {
  name: string
  file: string
}

const route = useRoute();
const category = computed(() => data.find(cat => cat.slug === route.params.category));
const playingSound = ref<Sound | null>(null);
const progress = ref(0);

function playSound(sound: Sound) {
  if (playingSound.value) return;

  playingSound.value = sound;
  const audio = new Audio(`/sounds/${category.value?.name}/${sound.file}`);
  audio.play();

  audio.addEventListener('timeupdate', () => {
    progress.value = (audio.currentTime / audio.duration) * 100;
  });

  audio.addEventListener('ended', () => {
    playingSound.value = null;
    progress.value = 0;
  });
}

const isPlaying = computed(() => playingSound.value !== null);

const colors = ['!bg-[#b18cff]', '!bg-[#adf7d7]', '!bg-[#6eb6ff]', '!bg-[#ffabab]'];

function getColor(currentIndex: number) {
  return colors[currentIndex % colors.length];
}
</script>
