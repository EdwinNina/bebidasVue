import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useFavoritosStore, useBebidasStore } from './'

export const useModalStore = defineStore('modal', () => {
   const open = ref(false)
   const favoritos = useFavoritosStore()
   const bebidas = useBebidasStore()

   function handleClickModal() {
      open.value = !open.value
   }

   const existeFavorito = computed(() => favoritos.existeFavorito(bebidas.receta.idDrink) 
      ? 'Eliminar Favorito' 
      : 'Agregar a Favoritos'
   )


   return {
      open,
      existeFavorito,
      handleClickModal
   }
})