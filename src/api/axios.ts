import axios from 'axios'
import { storage, KEYS } from '../store/store'

let baseURL = 'https://dummyjson.com'

export const api = axios.create({ baseURL })

let isRefreshing = false
let queue: Array<(token: string) => void> = []

api.interceptors.request.use(config => {
    const token = storage.getString(KEYS.ACCESS_TOKEN)

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

api.interceptors.response.use(
    response => response,

    async error => {
        const originalRequest = error.config

        if (
            error.response?.status !== 401 ||
            originalRequest._retry
        ) {
            return Promise.reject(error)
        }

        originalRequest._retry = true

        if (isRefreshing) {
            return new Promise(resolve => {
                queue.push(token => {
                    originalRequest.headers.Authorization =
                        `Bearer ${token}`
                    resolve(api(originalRequest))
                })
            })
        }

        isRefreshing = true


        try {
            const refreshToken = storage.getString(KEYS.REFRESH_TOKEN)

            const response = await axios.post(
                `${baseURL}/auth/refresh`,
                {
                    refreshToken,
                    expiresInMins: 30
                }
            )

            const {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken
            } = response.data

            storage.set(
                KEYS.ACCESS_TOKEN,
                newAccessToken
            )

            storage.set(
                KEYS.REFRESH_TOKEN,
                newRefreshToken
            )

            queue.forEach(cb => cb(newAccessToken))

            queue = []

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

            return api(originalRequest)
        } catch (error) {
            storage.remove(KEYS.ACCESS_TOKEN)
            storage.remove(KEYS.REFRESH_TOKEN)

            return Promise.reject(error)
        } finally {
            isRefreshing = false
        }
    }
)
