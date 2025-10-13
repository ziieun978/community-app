import { Stack } from "expo-router";

// 회원 로그인 관련
 export default function SignLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" />
            <Stack.Screen name="home" />
            <Stack.Screen name="modal" />
        </Stack>
    )

 }