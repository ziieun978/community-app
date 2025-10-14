import { auth, db } from '@/firebaseConfig';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

import { router } from 'expo-router';


interface Props {
    postId: string;
}

export default function CommentList({ postId }: Props) {
    const [comments, setComments] = useState<any[]>([]);
    const [text, setText] = useState('');
    const user = auth.currentUser;

    useEffect(() => {
        const q = query(
            collection(db, 'posts', postId, 'comments'),
            orderBy('createdAt', 'asc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => unsubscribe();
    }, [postId]);

    const handleComment = async () => {
        if(!user) {
            Alert.alert('로그인이 필요합니다');
            router.replace('/sign/Login');
            return;
        }
        if (!text.trim()) return;

        await addDoc(collection(db, 'posts', postId, 'comments'), {
            text,
            authotId: user.uid,
            createdAt:serverTimestamp(),
        });
        setText('');
    }
  return (
    <View style={{ marginTop:16 }}>
        <FlatList
            data = {comments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <Text style = {styles.comments}>
                    {item.authorName}: {item.text}
                </Text>
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
    input: { flex:1, borderWidth:1}

});