<template>
  <UContainer class="p-5">
    <div class="flex mb-5 justify-between items-center">
      <div class="flex flex-col">
        <h1>{{ category?.name }}</h1>
        <p>Lorem ipsum dolor sit amet</p>
      </div>
      <UButton
        class="h-max"
        icon="i-heroicons-plus"
        to="https://ui.nuxt.com"
      />
    </div>

    <div class="grid grid-cols-2 gap-4">
      <UCard
        v-for="(sound, index) in category?.sounds"
        :key="index"
        :class="getColor(index)"
      >
        <div class="w-full flex flex-col items-center justify-center">
          <h6 class="sr-only">{{ sound.name }}</h6>
          <UButton
            class="rounded-full"
            color="black"
            icon="i-heroicons-play"
            @click="playSound(sound)"
          />
        </div>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import data from 'public/data.json';

type Sound = {
  name: string
  file: string
}

const route = useRoute();
const category = computed(() => data.find(cat => cat.slug === route.params.category));

function playSound(sound: Sound) {
  const audio = new Audio(`/sounds/${category.value?.name}/${sound.file}`);

  audio.play();
}

const colors = ['!bg-[#b18cff]', '!bg-[#adf7d7]', '!bg-[#6eb6ff]', '!bg-[#ffabab]'];

function getColor(currentIndex: number) {
  return colors[currentIndex % colors.length];
}
</script>
