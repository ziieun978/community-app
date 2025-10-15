import { auth } from "@/firebaseConfig";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Splash() {
  const router = useRouter();

  // 앱 구동시 로그아웃으로 변경
  useEffect(() => {
    const logout = async () => {
      try {
        await signOut(auth);
        console.log("로그아웃");
      } catch (error) {
        console.log("로그아웃 실패", error);
      } finally {
        setTimeout(() => {
            router.replace("/sign/Login");
          }, 1000);
        }
      };
      logout();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#047427" />
      <Text style={styles.text}>로딩 중...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
    },

  text: { 
    fontSize: 16, 
    marginTop: 10

    },
});