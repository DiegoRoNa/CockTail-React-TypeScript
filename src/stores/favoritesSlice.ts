import { StateCreator } from "zustand"
import { Recipe } from "../types"
import { RecipesSliceType } from "./recipeSlice"
import { NotificationSliceType } from "./notificationSlice"

// type para el store "favoritesSlice"
export type FavoritesSliceType = {
    favorites: Recipe[]
    handleClickFavorite: (recipe : Recipe) => void
    favoriteExist: (id : Recipe['idDrink']) => boolean
    loadFromStorage: () => void
}

// "& RecipesSliceType & NotificationSliceType, [], [], FavoritesSliceType", es para anidar los slices, y poder usar sus states
// hay que hacer lo mismo en el otro slice, pero visceversa
export const createFavoritesSlice : StateCreator<FavoritesSliceType & RecipesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {
        // validar si la bebida ya existe en favoritos
        if (get().favoriteExist(recipe.idDrink)) { // existe
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            }))

            // mostrar notificacion
            get().showNotification({
                text: `${recipe.strDrink}, se eliminó de favoritos`,
                error: false
            })
        } else { // no existe
            set((state) => ({
                favorites: [...state.favorites, recipe]
            }))

            // mostrar notificacion
            get().showNotification({
                text: `${recipe.strDrink}, se agregó a favoritos`,
                error: false
            })
        }

        // cerrar modal
        // createRecipeSlice(set, get, api).closeModal() // tambien funciona
        get().closeModal()

        // guardar en localstorage
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    favoriteExist: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites')

        if (storedFavorites) {
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})