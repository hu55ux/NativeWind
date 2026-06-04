import React, { useEffect } from "react";
import "../../global.css"
import { Stack, useRouter, useSegments, useRootNavigationState } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { useColorScheme } from "nativewind";
import { isAuthenticated, getTheme } from "../store/store";

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();
  const { colorScheme, setColorScheme } = useColorScheme();

  useEffect(() => {
    const storedTheme = getTheme() as 'light' | 'dark';
    if (storedTheme && storedTheme !== colorScheme) {
      setColorScheme(storedTheme);
    }
  }, [colorScheme, setColorScheme]);

  useEffect(() => {
    if (!navigationState?.key) return;

    const isAuth = isAuthenticated();
    const inAuthGroup = segments[0] === "(tabs)";

    if (!isAuth && inAuthGroup) {
      router.replace("/login");
    } else if (isAuth && !inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [segments, navigationState?.key]);

  return (
    <KeyboardProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ title: 'Giriş', headerShown: false }} />
        <Stack.Screen name="register" options={{ title: 'Qeydiyyat', headerShown: false }} />
        <Stack.Screen name="products" options={{ title: 'Products' }} />
      </Stack>
    </KeyboardProvider>
  );
}