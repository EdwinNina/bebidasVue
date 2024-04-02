<script setup>
   import { useBebidasStore } from '@/stores/bebidas';
   defineProps({
      receta: {
         type: Object
      }
   })
   const bebidas = useBebidasStore()
</script>

<template>
   <div class="border shadow-lg">
      <div class="overflow-hidden">
         <img
            class="hover:scale-110 transition-transform hover:rotate-1" 
            :src="receta.strDrinkThumb"
            :alt="receta.strDrink">
      </div>
      <div class="p-5">
         <h2 class="font-extrabold truncate text-2xl">{{ receta.strDrink }}</h2>
         <button
            type="button"
            class="bg-orange-400 hover:bg-orange-500 text-white text-lg uppercase
               font-bold mt-5 w-full p-3 rounded-lg transition"
            @click="bebidas.seleccionarBebida(receta.idDrink)"
         > 
            Ver receta
         </button>
      </div>
   </div>
</template>

