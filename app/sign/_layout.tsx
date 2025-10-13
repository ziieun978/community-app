import { Stack } from "expo-router";

export default function SignLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="login">
      <Stack.Screen name="login" />
      <Stack.Screen name="home" />
    </Stack>
  );
}
