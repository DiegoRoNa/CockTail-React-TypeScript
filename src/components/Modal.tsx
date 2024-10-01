import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";
import { useAppStore } from "../stores/useAppStore";
import { Recipe } from "../types";

export default function Modal() {

    const modal = useAppStore((state) => state.modal)
    const closeModal = useAppStore((state) => state.closeModal)
    const selectedRecipe = useAppStore((state) => state.selectedRecipe)
    const handleClickFavorite = useAppStore((state) => state.handleClickFavorite)
    const favoriteExist = useAppStore((state) => state.favoriteExist)

    const renderIngredients = () => {
        const ingredients : JSX.Element[] = []

        // unir ingrediente con cantidad
        for (let i = 1; i <= 6; i++) {

            // tomar cada ingrediente y cantidad
            const ingredient = selectedRecipe[`strIngredient${i}` as keyof Recipe] // keyof, hace referencia a cualquier llave del type Recipe
            const measure = selectedRecipe[`strMeasure${i}` as keyof Recipe]

            // llenar array
            if (ingredient && measure) {
                ingredients.push(
                    <li className="text-lg font-normal" key={i}>{ingredient} - {measure}</li>
                )
            }
        }

        return ingredients
    }

    return (
        <>
        <Transition appear show={modal} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-70" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                                <DialogTitle as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                                    {selectedRecipe.strDrink}
                                </DialogTitle>

                                <img src={selectedRecipe.strDrinkThumb} 
                                    className="mx-auto w-96"
                                    alt={`Imagen de ${selectedRecipe.strDrink}`} />

                                <DialogTitle as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                                    Ingredientes y Cantidades
                                </DialogTitle>

                                {renderIngredients()}
                                
                                <DialogTitle as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                                    Instrucciones
                                </DialogTitle>

                                <p className="text-lg">{selectedRecipe.strInstructions}</p>

                                <div className="flex justify-between mt-5 gap-4">
                                    <button type="button" onClick={closeModal} className="w-full rounded bg-gray-600 hover:bg-gray-500 p-3 font-bold uppercase text-white shadow">
                                        Cerrar
                                    </button>
                                    <button type="button" onClick={() => handleClickFavorite(selectedRecipe)} className="w-full rounded bg-orange-600 hover:bg-orange-500 p-3 font-bold uppercase text-white shadow">
                                        {favoriteExist(selectedRecipe.idDrink) ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
        </>
    )
}
