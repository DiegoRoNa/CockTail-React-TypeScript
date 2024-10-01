import { z } from "zod"

// schema del array completo de la respuesta de categorias de la api
export const CategoriesAPIResponseSchema = z.object({
    drinks: z.array(
        z.object({
            strCategory: z.string()
        })
    )
})

// schema para los datos a filtrar
export const SearchFilterSchema = z.object({
    ingredient: z.string(),
    category: z.string()
})

// Schema para cada obj del array de la respuesta de busqueda
export const DrinkAPIResponse = z.object({
    idDrink: z.string(),
    strDrink: z.string(),
    strDrinkThumb: z.string()
})

// Schema para el array de la respuesta de busqueda
export const DrinksAPIResponse = z.object({
    drinks: z.array(DrinkAPIResponse)
})

// Schema del detalle de una bebida
export const RecipeAPIResponseSchema = z.object({
    idDrink: z.string(),
    strDrink: z.string(),
    strDrinkThumb: z.string(),
    strInstructions: z.string(),
    strIngredient1: z.string().nullable(), // nullable(), significa que puede no existir ese valor
    strIngredient2: z.string().nullable(),
    strIngredient3: z.string().nullable(),
    strIngredient4: z.string().nullable(),
    strIngredient5: z.string().nullable(),
    strIngredient6: z.string().nullable(),
    strMeasure1: z.string().nullable(),
    strMeasure2: z.string().nullable(),
    strMeasure3: z.string().nullable(),
    strMeasure4: z.string().nullable(),
    strMeasure5: z.string().nullable(),
    strMeasure6: z.string().nullable(),
});