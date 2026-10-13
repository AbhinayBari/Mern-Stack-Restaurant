import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXpkzzQEA-YEUNkszpzdSw8WXeB3y926U",
  authDomain: "mern-stack-restaurant.firebaseapp.com",
  projectId: "mern-stack-restaurant",
  storageBucket: "mern-stack-restaurant.firebasestorage.app",
  messagingSenderId: "970099833061",
  appId: "1:970099833061:web:b4e8969c0b845279dc3c0c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();