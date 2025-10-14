import { auth } from "@/firebaseConfig";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";

import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Login() {
  const router = useRouter();
  const [ email, setEmail ] = useState("");
  const [ pw, setPw ] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, pw);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert("이메일이나 비밀번호가 잘못되었습니다.", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      <TextInput 
        style={styles.input}
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        />
        <TextInput 
        style={styles.input}
        placeholder="비밀번호"
        value={pw}
        onChangeText={setPw}
        secureTextEntry
        />
      <Button title="로그인" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => router.push("/sign/LoginRegister")}>
        계정이 없으신가요? 회원가입하기
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding:20, },
  title: { fontSize: 24, marginBottom:20, textAlign:'center', },
  text: { fontSize: 16, marginBottom: 20,},
  input: { width:'100%', borderWidth:1, borderRadius:20, padding: 10, margin:'2%', paddingHorizontal:'5%',},
  link: { color:"blue", textAlign: "center", }
});
