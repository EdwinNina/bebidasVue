<script setup>
   import { useFavoritosStore } from '@/stores';
   import Receta from '@/components/Receta.vue';

   const favoritosStore = useFavoritosStore()

</script>

<template>
   <h1 class="text-6xl font-extrabold">Favoritos</h1>
   <p v-if="favoritosStore.noFavoritos" class="text-lg text-gray-400 font-semibold uppercase text-center my-10">No existen recetas favoritas aún</p>
   <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10" v-else>
      <Receta
         v-for="receta in favoritosStore.favoritos"
         :key="receta.idDrink"
         :receta="receta"
      />
   </div>
</template>