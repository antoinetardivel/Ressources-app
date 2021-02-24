import firebase from "firebase";

const firebaseConfig = {
  // apiKey: "AIzaSyDcgdyoDKtXMhhip-SkHxRAY-1H02i1joQ",
  // authDomain: "next-blog-app-ed387.firebaseapp.com",
  // projectId: "next-blog-app-ed387",
  // storageBucket: "next-blog-app-ed387.appspot.com",
  // messagingSenderId: "945176907981",
  // appId: "1:945176907981:web:4faecef970d87651fbd984"
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};
// Initialize Firebase
try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}

const fire = firebase;
export default fire;
