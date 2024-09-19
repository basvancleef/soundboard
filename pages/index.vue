<template>
  <UContainer class="p-5">
    <div class="flex mb-5 justify-between items-center">
      <div class="flex flex-col">
        <h1>Overzicht</h1>
        <p>Selecteer een categorie</p>
      </div>
      <!--      <UButton-->
      <!--        class="h-max"-->
      <!--        icon="i-heroicons-plus"-->
      <!--        color="black"-->
      <!--        sr-only="Voeg een categorie toe"-->
      <!--        :disabled="true"-->
      <!--      />-->
      <!--      <ColorScheme>-->
      <!--        <USelect v-model="$colorMode.preference" :options="['system', 'light', 'dark']"/>-->
      <!--      </ColorScheme>-->
    </div>

    <UCard
      v-for="category in categories"
      :key="category.name"
      class="mt-4"
    >
      <div class="w-full flex items-center justify-between">
        <h2>{{ category.name }}</h2>
        <UButton
          class="rounded-full rotate-[45deg]"
          icon="i-heroicons-arrow-up"
          color="white"
          :to="category.slug"
        />
      </div>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
import categories from 'public/categories.json';
</script>
