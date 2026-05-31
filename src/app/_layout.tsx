import "../../global.css"
import { Stack } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function RootLayout() {
  return (
    <KeyboardProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="products" options={{ title: 'Products' }} />
        <Stack.Screen name="register" options={{ title: 'Qeydiyyat', headerShown: false }} />
      </Stack>
    </KeyboardProvider>
  );
}