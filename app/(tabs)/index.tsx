import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Home() {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>홈 탭 화면</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 16 },
});
