// DB연동 테스트
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const testFirestore = async () => {
  try {
    // 테스트 문서 추가
    await addDoc(collection(db, "testCollection"), {
      message: "Hello Firebase!",
      createdAt: new Date(),
    });
    console.log("✅ Firestore write success");

    // 데이터 읽기
    const snapshot = await getDocs(collection(db, "testCollection"));
    snapshot.forEach((doc) => console.log("📄", doc.id, doc.data()));

    console.log("✅ Firestore read success");
  } catch (error) {
    console.error("❌ Firestore test failed:", error);
  }
};
