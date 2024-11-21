import { useMemo } from "react"
import DrinkCard from "../components/DrinkCard"
import { useAppStore } from "../stores/useAppStore"

export default function FavoritesPage() {

    const favorites = useAppStore(state => state.favorites)
    const hasFavorites = useMemo(() => favorites.length > 0, [favorites])


    return (
        <>
        <h1 className="text-6xl font-extrabold">Favoritos</h1>

        <div className="">
            {hasFavorites ? (
                <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 my-10 gap-10">
                {favorites.map(drink => (
                    <DrinkCard key={drink.idDrink} drink={drink}/>
                ))}
                </div>
            ) : (
                <p className="my-10 text-center text-2xl">Tus bebidas favoritas se mostrarán aquí</p>
            )}
        </div>
        </>
    )
}
