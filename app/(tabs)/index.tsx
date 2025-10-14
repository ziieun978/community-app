import { db } from "@/firebaseConfig";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    // 실시간
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id:doc.id, ...doc.data()}));
      setPosts(list);
      setLoading(false);
    }, (err) => {
      console.error("게시글 로드 실패", err);
      setLoading(false);
    });

    return () => unsubscribe();
  })




  
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const q = query(collection(db,"posts"), orderBy("createAt", "desc"));
  //       const photo = await getDocs(q);
  //       const list = photo.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  //       setPosts(list);
  //     } catch (e) {
  //       console.error("게시글 로드 실패:",e);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPosts();
  // },[]);


  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size='large' color='#D32E73' />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {posts.length === 0 ? (
        <View style={styles.center}>
          <Text style={{ color: "#888"}}>등록된 게시글이 없습니다.</Text>
        </View>  
      ) : (
        <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
          style={styles.postBox}
          onPress={() => router.push(`/post/${item.id}`)}>
           {item.imageUrl ? (
            <Image 
            source = {{ uri: item.imageUrl ?? "" }}
             style={styles.image}
            />
           ) : null}
           <Text style={styles.title}>{item.title}</Text>
           <Text style={styles.content} numberOfLines={2}>
            {item.content}
           </Text>
          </TouchableOpacity>
        )}
        />
      )}

      {/* <Button title="게시글 작성" onPress={() => router.push("/post/Create")} /> */}


      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push("/post/Create")}
        >
          <MaterialIcons name="add" size={28} color='white' />
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  center: { flex: 1, justifyContent: "center", alignItems: "center"},
  title: { fontSize: 18, fontWeight: 'bold'},
  content: { marginTop:10, },
  text: { fontSize: 16 },
  postBox: {width:"100%"},
  image:{ width:'100%', height: 200},
  btn: { position: "absolute", bottom: 30, right: 30, backgroundColor: "#047427", width: 60, height: 60, borderRadius:30,
     justifyContent: "center", alignItems: "center", },

  
});