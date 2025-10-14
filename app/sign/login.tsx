import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Login() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>로그인 화면</Text>
      <Button
        title="로그인 성공"
        onPress={() => router.replace("/")} // 로그인 후 탭 홈 이동
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 16, marginBottom: 20 },
});
