// axios import removed
import { storage, KEYS } from "../store/store";

type Props = {
    username: string,
    password: string
}

export async function login({ username, password }: Props) {
    const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username,
            password,
            expiresInMins: 60, // 1 hour
        })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        console.error('Login API Error:', data);
        throw new Error(data.message || 'Login failed');
    }

    const { accessToken, refreshToken } = data;

    storage.set(KEYS.ACCESS_TOKEN, accessToken);
    storage.set(KEYS.REFRESH_TOKEN, refreshToken || '');

    return data;
}
