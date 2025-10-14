import { db } from '@/firebaseConfig';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import CommentList from './CommentList';

export default function PostRegister() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [authorName, setAuthorName] = useState('익명');
    
    useEffect(() => {
        const fetchPosts = async () => {
            if(!id) return;
            try {
                const docRef = doc(db, 'posts', id as string);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setPost({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.log("게시글 존재하지 않음");
                }
            } catch (e) {
                console.error("게시글 로드 실패: ", e);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [id]);

    if (loading) return <Text>로딩중...</Text>
    if(!post) return <Text>게시글이 존재하지 않습니다</Text>


  return (
    <View style={{ flex: 1, padding: 16 }}>
      {post.imageUrl ? (
        <Image source={{ uri: post.imageUrl }} style={styles.image} />
      ) : null}
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.content}>{post.content}</Text>
      <Text style={styles.author}>{post.authorName}</Text>

      {/* 댓글 */}
      <CommentList postId={post.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: 'bold'},
  content: { marginTop:10, },
  text: { fontSize: 16 },
  author: { fontSize: 14,},
  postBox: {width:"100%"},
  image:{ width:'100%', height: 200},

});