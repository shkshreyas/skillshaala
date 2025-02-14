import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdyQhHv4qw1kMn7dZ13wrRDfBK8UAtjnA",
  authDomain: "skillshaala-9691b.firebaseapp.com",
  projectId: "skillshaala-9691b",
  storageBucket: "skillshaala-9691b.firebasestorage.app",
  messagingSenderId: "271857094515",
  appId: "1:271857094515:web:8c652e050eb7153c12ff06",
  measurementId: "G-7M7JNZR4TG"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);
const analytics = getAnalytics(app);
