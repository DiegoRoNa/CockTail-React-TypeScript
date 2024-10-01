import { z } from "zod"
import { CategoriesAPIResponseSchema, DrinkAPIResponse, DrinksAPIResponse, RecipeAPIResponseSchema, SearchFilterSchema } from "../schemas/recipes-schema"


// type para la respuesta de la api, del array de categorias
export type Categories = z.infer<typeof CategoriesAPIResponseSchema>

// type para los datos a filtrar
export type SearchFilter = z.infer<typeof SearchFilterSchema>

// type para el array de drinks buscados
export type Drinks = z.infer<typeof DrinksAPIResponse>

// type para un obj drink
export type Drink = z.infer<typeof DrinkAPIResponse>

// type para el detalle de una bebida
export type Recipe = z.infer<typeof RecipeAPIResponseSchema>
