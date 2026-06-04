import { storage, KEYS } from "../store/store";

export async function getCurrentUser() {
    const token = storage.getString(KEYS.ACCESS_TOKEN)
    const response = await fetch('https://dummyjson.com/auth/me', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error('Failed to get user')
    }

    return await response.json()
}
