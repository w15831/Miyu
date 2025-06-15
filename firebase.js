
// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore, doc, getDoc, setDoc, updateDoc, increment
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7QX_i2pIhmhyFbXXr79as30pf2CGCNDE",
  authDomain: "riddles-4565b.firebaseapp.com",
  projectId: "riddles-4565b",
  storageBucket: "riddles-4565b.firebasestorage.app",
  messagingSenderId: "206526794928",
  appId: "1:206526794928:web:b6bfa68aa0f47c8ebbbf75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 公開函式：取得指定題目的統計資料
export async function getStats(id) {
  const ref = doc(db, "riddles", id.toString());
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, { views: 0, corrects: 0 });
    return { views: 0, corrects: 0 };
  }
  return snap.data();
}

// 公開函式：增加 views 次數
export async function incrementViews(id) {
  const ref = doc(db, "riddles", id.toString());
  await updateDoc(ref, { views: increment(1) });
}

// 公開函式：增加 corrects 次數
export async function incrementCorrects(id) {
  const ref = doc(db, "riddles", id.toString());
  await updateDoc(ref, { corrects: increment(1) });
}
