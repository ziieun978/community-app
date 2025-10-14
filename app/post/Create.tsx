// 글작성 Firestore저장, Storage 업로드 expo-image-picker
import { auth, db, storage } from '@/firebaseConfig';
import * as ImagePicker from "expo-image-picker";
import { useRouter } from 'expo-router';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function Create() {
    //  title, content, Images
    const router =useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [images, setImages] = useState<string | null>(null);
    const [user, setUser] = useState(auth.currentUser);
    // 로그인오류
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(u => setUser(u));
        return () => unsubscribe();
    },[]);



    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            aspect: [4, 3],
        });

        console.log(result);

        if (!result.canceled) {
            setImages(result.assets[0].uri);
        }
    };

    // 게시글 이미지 작성
    const handleSubmit = async () => {
        if(!title || !content) {
            Alert.alert("제목, 내용을 입력해주세요")
            return;
        }

        if(!user) {
            Alert.alert("로그인을 먼저 해주세요")
            router.replace('/sign/Login')
            return;
        }

        let imageUrl = "";

        if (images) {
            try {
                const reponse = await fetch(images);
                const blob = await reponse.blob();
                const imageRef = ref(storage, `posts/${Date.now}`);
                await uploadBytes(imageRef, blob);
                imageUrl = await getDownloadURL(imageRef);
            } catch (err) {
                console.log(err);
                Alert.alert("이미지 업로드 실패");
                return;
            }
        }

        try {
            await addDoc(collection(db, "posts"), {
                title,
                content,
                authorId: user.uid,
                createdAt: serverTimestamp(),
                imageUrl,

            });
            Alert.alert("게시글 작성 완료");
            router.push('/(tabs)');

        } catch (err) {
            console.log(err);
            Alert.alert("게시글 등록 실패");
        }
    };


  return (
    <View style= {styles.container}>
        <TextInput
        style={styles.input}
        placeholder='제목'
        value={title}
        onChangeText={setTitle}
        />
        <TextInput
        style={styles.input}
        placeholder='내용'
        value={content}
        onChangeText={setContent}
        multiline
        />
        {images && <Image source={{ uri:images}} style={styles.image} />}
        <TouchableOpacity style={styles.imageBtn} onPress={pickImage}>
            <Text style={styles.imageBtnText}>{images ? "이미지 변경" : "이미지 선택"}</Text>
        </TouchableOpacity>
        <Button title='게시글 등록' onPress={handleSubmit} />
    </View>
  );
}
const styles = StyleSheet.create({
    container: { flex: 1, marginTop: "20%",},
    input: { borderWidth: 1, marginBottom: 10, },
    image: { width: '100%', height:200, marginBottom: 10,},
    imageBtn: {
        alignItems:'center',
    },
    imageBtnText: { color: "black", fontWeight: "bold"}
});