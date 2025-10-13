import { useRouter } from "expo-router"
import { useEffect } from "react";
import { Text, View } from "react-native"

export default function Splash() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            // TODO: 로그인 상태 확인 로직 추가
            router.replace("/sign/login")
        }, 100);
        
        return () => clearTimeout(timer);
    })

  return (
    <View>
        <Text>community App</Text>

    </View>
  )
}
