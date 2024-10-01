import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { createRecipeSlice, RecipesSliceType } from "./recipeSlice"
import { FavoritesSliceType, createFavoritesSlice } from "./favoritesSlice"
import { NotificationSliceType, createNotificationSlice } from "./notificationSlice"

/**
 * Store Principal
 * 
 * <RecipesSliceType & FavoritesSliceType>, le decimos los states que contendrá el store principal
 * Que son los que vienen de cada slice "createRecipeSlice y createFavoritesSlice"
 */
export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificationSliceType>()(devtools((...a) => ({
    ...createRecipeSlice(...a), // con "...a", podemos heredar las funciones del metodo "create"
    ...createFavoritesSlice(...a), // con "...a", podemos heredar las funciones del metodo "create"
    ...createNotificationSlice(...a) // con "...a", podemos heredar las funciones del metodo "create"
})))