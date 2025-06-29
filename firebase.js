// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore, doc, getDoc, setDoc, updateDoc, increment
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 公開的 Firebase 配置（請勿修改）
const firebaseConfig = {
  apiKey: "AIzaSyB7QX_i2pIhmhyFbXXr79as30pf2CGCNDE",
  authDomain: "riddles-4565b.firebaseapp.com",
  projectId: "riddles-4565b",
  storageBucket: "riddles-4565b.appspot.com",
  messagingSenderId: "206526794928",
  appId: "1:206526794928:web:b6bfa68aa0f47c8ebbbf75"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 公開函式：取得統計資料
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

// 公開函式：統計增加一次 views，若尚未存在則自動建立
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

// 公開函式：統計增加一次 corrects，若尚未存在則自動建立
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
