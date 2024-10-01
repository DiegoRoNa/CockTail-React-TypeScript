import { StateCreator } from "zustand"
import { FavoritesSliceType } from "./favoritesSlice"

// type de la notificacion
type Notification = {
    text: string
    error: boolean
    show: boolean
}

// type para el store "favoritesSlice"
export type NotificationSliceType = {
    notification: Notification
    showNotification: (payload : Pick<Notification, 'text' | 'error'>) => void // solo necesitamos text y error
    hiddeNotification: () => void
}

export const createNotificationSlice : StateCreator<NotificationSliceType & FavoritesSliceType, [], [], NotificationSliceType> = (set, get) => ({
    notification: {
        text: '',
        error: false,
        show: false
    },
    showNotification: (payload) => {
        set({
            notification: {
                text: payload.text,
                error: payload.error,
                show: true
            }
        })

        setTimeout(() => {
            get().hiddeNotification()
        }, 5000);
    },
    hiddeNotification: () => {
        set({
            notification: {
                text: '',
                error: false,
                show: false
            }
        })
    }
})