import { auth, db } from '@/firebaseConfig';
import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

import { router } from 'expo-router';


interface Props {
    postId: string;
}

export default function CommentList({ postId }: Props) {
    const [comments, setComments] = useState<any[]>([]);
    const [text, setText] = useState('');
    const [uname, setUname] = useState<string>('이름 없음');
    const user = auth.currentUser;


    useEffect(() => {
        const fetUname = async () =>{
            if(!user) return;
            try {
                const userDoc = await getDoc(doc(db,'users',user.uid));
                const authorName = userDoc.exists() ? userDoc.data().uname : '이름 없음';
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setUname(data.uname || '이름 없음')
                }
            } catch (e) {
                console.error('uname 로드 실패:', e);
            }
        }

        fetUname();
    },[user]);

    useEffect(() => {
        // 댓글 불러오기
        const q = query(
            collection(db, 'posts', postId, 'comments'),
            orderBy('createdAt', 'asc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => unsubscribe();
    }, [postId]);

    // 댓글 작성 시
    const handleComment = async () => {
        if(!user) {
            Alert.alert('로그인이 필요합니다');
            router.replace('/sign/Login');
            return;
        }
        if (!text.trim()) return;

        try {

            const userDoc = await getDoc(doc(db,'users',user.uid));
            const authorName = userDoc.exists() ? userDoc.data().uname : "이름 없음";

            await addDoc(collection(db, 'posts', postId, 'comments'), {
                text,
                authortId: user.uid,
                authorName,
                createdAt:serverTimestamp(),
            });
            setText('');
        } catch (e) {
            console.error('댓글 작성 실패:', e);
        }
    };

  return (
    <View style={{ marginTop:16 }}>
        <FlatList
            data = {comments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.commentBox}>
                    <Text style = {styles.comments}>
                        {item.authorName || "이름 없음"}: {item.text}
                    </Text>
                </View>
            )}
            />
            <View style={styles.inputBox}>
                <TextInput
                    style={styles.input}
                    placeholder='댓글 작성'
                    value={text}
                    onChangeText={setText}
                    />
                    <Button title='등록' onPress={handleComment} />
            </View>
    </View>
  )
}
const styles = StyleSheet.create({
    comments: { paddingVertical: 4, borderBottomWidth: 0.5,},
    inputBox: { flexDirection: 'row', marginTop: 8, alignItems: 'center'},
    input: { flex:1, borderWidth:1},
    commentBox: {
        flexDirection: 'row', borderBottomWidth: 0.5,
    }
});