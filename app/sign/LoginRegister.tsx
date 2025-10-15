import { auth, db } from '@/firebaseConfig';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function LoginRegister() {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [uname, setUname] = useState("");

    const handleLoginRegister = async () => {
        if (!email || !pw || !uname) {
            Alert.alert("모든 정보를 작성해주세요.");
            return;
        }
        try {
            // 추가
            const userCredential = await createUserWithEmailAndPassword(auth, email, pw);
            const user = userCredential.user;
            await setDoc(doc(db, "users", user.uid), { uname, email, createdAt: new Date() });
            Alert.alert("회원 가입 완료","로그인 후 사용해주세요.");
            router.push("/sign/Login");
        } catch (error:any) {
            Alert.alert("회원가입을 실패했습니다. error.message");
        }
    }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
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
      <TextInput 
        style={styles.input}
        placeholder="닉네임"
        value={uname}
        onChangeText={setUname}
        />

      <Button title="회원가입" onPress={handleLoginRegister} />
      <Text style={styles.link} onPress={() => router.push("/sign/LoginRegister")}>
        이미 계정이 있으신가요? 로그인하기
      </Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, marginBottom:20, textAlign:'center', },
  text: { fontSize: 16, marginBottom: 20,},
  input: { width:'100%', borderWidth:1, padding: 10, margin:'2%', paddingHorizontal:'5%',},
  link: { color:"blue", textAlign: "center", }
});