import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function Layout() {
  const [loaded] = useFonts({
    // Add any custom fonts here if needed
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth/signIn" options={{ headerShown: false }} />
      <Stack.Screen name="auth/signUp" options={{ headerShown: false }} />
      <Stack.Screen name="practice/quiz/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="practice/flashcards" options={{ headerShown: false }} />
      <Stack.Screen name="practice/qa" options={{ headerShown: false }} />
    </Stack>
  );
} 