import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { useAppStore } from "../stores/useAppStore";
import { useEffect } from "react";
import Notification from "../components/Notification";

/**
 * Este layout se carga en todas las rutas de la app
 * @returns 
 */
export default function Layout() {

    const loadFromStorage = useAppStore((state) => state.loadFromStorage)

    // cargar lo que hay en localstorage
    useEffect(() => {
        loadFromStorage()
    }, [])

    return (
        <>
        <Header/>
        <main className="container mx-auto py-16">
            <Outlet/> {/**Outlet contiene paginas agrupadas*/}
        </main>

        <Modal/>
        <Notification/>
        </>
    )
}
