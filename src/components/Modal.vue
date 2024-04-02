<script setup>
   import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
   import { useModalStore, useBebidasStore, useFavoritosStore } from '@/stores';

   const modal = useModalStore()
   const bebidas = useBebidasStore()
   const favoritos = useFavoritosStore()

   const formatearIngredientes = () => {
      const ingredientesDiv = document.createElement("div")
      for (let index = 1; index <= 15; index++) {
         if(bebidas.receta[`strIngredient${index}`]) {
            const ingrediente = bebidas.receta[`strIngredient${index}`]
            const cantidad = bebidas.receta[`strMeasure${index}`]
            const ingredienteCantidad = document.createElement("p")
            ingredienteCantidad.classList.add('text-lg', 'text-sm', 'text-gray-500')
            ingredienteCantidad.textContent = `${ingrediente} - ${cantidad}`
            ingredientesDiv.appendChild(ingredienteCantidad)
         }
      }
      return ingredientesDiv
   }
</script>

<template>
   <TransitionRoot appear :show="modal.open" as="template">
      <Dialog as="div" @close="modal.handleClickModal()" class="relative z-10">
         <div class="fixed inset-0 bg-black/50" aria-hidden="true" />
         <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
            leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-black/25" />
         </TransitionChild>

         <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center relative">
               <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                  enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                  leave-to="opacity-0 scale-95">
                  <DialogPanel
                     class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                     <DialogTitle as="h3" class="text-lg text-center font-medium leading-6 text-gray-900 uppercase mb-4">
                        {{ bebidas.receta.strDrink }}
                     </DialogTitle>
                     <img
                        class="w-40 h-40 rounded-full mx-auto"
                        :src="bebidas.receta.strDrinkThumb"
                        :alt="bebidas.receta.strDrink"
                     />
                     <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 uppercase my-4">
                        Ingredientes y Cantidades
                     </DialogTitle>
                     <div class="mt-2" v-html="formatearIngredientes().outerHTML"></div>
                     <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 uppercase my-4">
                        Instrucciones
                     </DialogTitle>
                     <p class="text-md text-gray-500">{{ bebidas.receta.strInstructions }}</p>
                     <div class="absolute top-2 right-2">
                        <button type="button"
                           class="flex justify-center items-center border border-transparent bg-blue-100 p-4 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 w-5 h-6 rounded-full"
                           @click="modal.handleClickModal()">
                           X
                        </button>
                     </div>
                     <div class="flex justify-end items-center">
                        <button type="button"
                           class="border rounded-md border-transparent bg-orange-100 p-4 text-sm font-medium text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 mt-4 transition-all"
                           @click="favoritos.handleFavorito"
                        >
                           {{ modal.existeFavorito }}
                        </button>
                     </div>
                  </DialogPanel>
               </TransitionChild>
            </div>
         </div>
      </Dialog>
   </TransitionRoot>
</template>