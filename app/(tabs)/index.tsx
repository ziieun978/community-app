import { StyleSheet, Text, View } from 'react-native';

// sp -> 로그인 -> 성공 후 기본 탭 화면
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> 홈 탭 화면</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems:"center",
    justifyContent:"center"
  },
  text: {
    fontSize:12
  },

});
