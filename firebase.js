// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore, doc, getDoc, setDoc, updateDoc, increment
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Firebase 設定
const firebaseConfig = {
  apiKey: "AIzaSyB7QX_i2pIhmhyFbXXr79as30pf2CGCNDE",
  authDomain: "riddles-4565b.firebaseapp.com",
  projectId: "riddles-4565b",
  storageBucket: "riddles-4565b.appspot.com",
  messagingSenderId: "206526794928",
  appId: "1:206526794928:web:b6bfa68aa0f47c8ebbbf75"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ 自動補建＋讀取統計
export async function getStats(id) {
  try {
    const ref = doc(db, "riddles", id.toString());
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await setDoc(ref, { views: 0, corrects: 0 });
      return { views: 0, corrects: 0 };
    }

    return snap.data();
  } catch (e) {
    console.warn(`取得統計資料失敗：${e.message}`);
    return { views: "-", corrects: "-" };
  }
}

// ✅ 自動補建＋遞增閱覽次數
export async function incrementViews(id) {
  try {
    const ref = doc(db, "riddles", id.toString());
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await setDoc(ref, { views: 1, corrects: 0 });
    } else {
      await updateDoc(ref, { views: increment(1) });
    }
  } catch (e) {
    console.warn(`views 增加失敗：${e.message}`);
  }
}

// ✅ 自動補建＋遞增答對次數
export async function incrementCorrects(id) {
  try {
    const ref = doc(db, "riddles", id.toString());
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await setDoc(ref, { views: 0, corrects: 1 });
    } else {
      await updateDoc(ref, { corrects: increment(1) });
    }
  } catch (e) {
    console.warn(`corrects 增加失敗：${e.message}`);
  }
}
