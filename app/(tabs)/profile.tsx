import { auth, db } from "@/firebaseConfig";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, View } from "react-native";

export default function Profile() {

  // 프로필 탭에 이름, email 
  const [userData, setUserData] = useState<{ uname: string; email:string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (!user) {
        router.replace('/sign/Login')
        return;
      }
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData({ uname: data.uname || '이름 없음', email: user.email || ''});
        }
      } catch (err){
        console.error('유저 정보 불러오기 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if(loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='#047427' />
      </View>
    )
  }

  if (!userData) return null;

  const handleLogout = async () => {
    await signOut(auth);
    router.replace('/sign/Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>프로필</Text>
      <Text style={styles.label}>닉네임:</Text>
      <Text style={styles.value}>{userData.uname}</Text>
      <Text style={styles.label}>이메일:</Text>
      <Text style={styles.value}>{userData.email}</Text>
      <Button title="로그아웃" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24 },
  text: { fontSize: 16 },
  label: { fontSize: 16, fontWeight:'bold', marginTop: 10 },
  value: { fontSize: 16, marginBottom:10 },
});
