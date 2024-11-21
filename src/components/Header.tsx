import { useEffect, useMemo, useState, ChangeEvent, FormEvent } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {

    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })

    const { pathname } = useLocation()

    // detectar la pagina de inicio
    const isHome = useMemo(() => pathname === '/', [pathname])

    // fetchCategories viene del store hijo "createRecipeSlice"
    const fetchCategories = useAppStore((state) => state.fetchCategories)
    const categories = useAppStore((state) => state.categories)
    const searchRecipes = useAppStore((state) => state.searchRecipes)
    const showNotification = useAppStore(state => state.showNotification)

    useEffect(() => {
        fetchCategories() // obtener categorias de la api
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name]: e.target.value
        })

    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // validar valores vacios
        if (Object.values(searchFilters).includes('')) {
            showNotification({
                text: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        // consultar api
        searchRecipes(searchFilters)
    }

    return (
        <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800'}>
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img src="/logo.svg" alt="Logotipo" className="w-32" />
                    </div>
                    <nav className="flex gap-4">
                        <NavLink to="/" className={({isActive}) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}>Inicio</NavLink>
                        <NavLink to="/favoritos" className={({isActive}) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}>Favoritos</NavLink>
                    </nav>
                </div>

                { isHome && (
                    <form onSubmit={handleSubmit} className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-10">
                        <div>
                            <label htmlFor="ingredient" className="block text-white uppercase font-extrabold text-lg">Nombre o ingredientes</label>
                            <input type="text" onChange={handleChange} value={searchFilters.ingredient} id="ingredient" name="ingredient" className="p-3 w-full rounded-lg focus:outline-none" placeholder="Nombre o ingrediente. Ej: Vodka, Tequila, Café"/>
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-white uppercase font-extrabold text-lg">Categoría</label>
                            <select name="category" onChange={handleChange} value={searchFilters.category} id="category" className="p-3 w-full rounded-lg focus:outline-none">
                                <option value="">-- Selecciona categoría</option>
                                {categories.drinks.map( category => (
                                    <option value={category.strCategory} key={category.strCategory}>
                                        {category.strCategory}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <input type="submit" value="Buscar recetas" 
                            className="cursor-pointer bg-orange-700 hover:bg-orange-800 text-white font-extrabold w-full p-2 rounded-lg uppercase"/>
                    </form>
                )}
            </div>
        </header>
    )
}
