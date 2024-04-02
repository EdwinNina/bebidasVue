<script setup>
   import { useBebidasStore } from '../stores/bebidas'
   import Receta from '../components/Receta.vue'

   const bebidas = useBebidasStore()
</script>

<template>
   <h1 class="text-6xl font-extrabold mb-3">Recetas</h1>
   <p v-if="bebidas.noRecetas" class="text-lg text-gray-400 font-semibold uppercase text-center my-10">No hay resultados, utiliza el formulario para buscar recetas</p>
   <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-3 gap-10" v-else>
      <Receta
         v-for="receta in bebidas.recetas"
         :key="receta.idDrink"
         :receta="receta"
      />
   </div>
</template>