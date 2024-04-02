import { ref, watch, onMounted, computed } from 'vue'
import { defineStore } from 'pinia'
import { useBebidasStore, useModalStore, useNotificacionStore } from '.'

export const useFavoritosStore = defineStore('favoritos', () => {

   const favoritos = ref([])
   const bebidas = useBebidasStore()
   const modal = useModalStore()
   const notificacion = useNotificacionStore()

   onMounted(() => {
      favoritos.value = localStorage.getItem('favoritos')
         ? JSON.parse(localStorage.getItem('favoritos')) 
         : []
   })

   const eliminarFavorito = (id) => {
      favoritos.value = favoritos.value.filter(favorito => favorito.idDrink !== id)
   }

   const handleFavorito = () => {
      if (existeFavorito(bebidas.receta.idDrink)) {
         eliminarFavorito(bebidas.receta.idDrink)
         notificacion.mostrar = true
         notificacion.error = true
         notificacion.texto = 'Se eliminó de favoritos'
      } else {
         favoritos.value.push(bebidas.receta)
         notificacion.mostrar = true
         notificacion.texto = 'Se agregó a favoritos'
      }
      modal.handleClickModal()
   }

   function existeFavorito(id) {
      return favoritos.value.some(favorito => favorito.idDrink === id)
   }

   const noFavoritos = computed(() => favoritos.value.length === 0)

   watch(favoritos, () => {
      localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
   }, {deep: true})

   return {
      favoritos,
      noFavoritos,
      existeFavorito,
      handleFavorito
   }
})