import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { testFirestore } from "../fireTest";

export default function HomeTab() {

  // db확인
  useEffect(() => {
    testFirestore();
  })
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
