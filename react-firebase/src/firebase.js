import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
//
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyA9B-P77N53bDey-6znS1ECTDIvYCmnZGQ",
  authDomain: "react-firebase-chat-app-3fc79.firebaseapp.com",
  projectId: "react-firebase-chat-app-3fc79",
  storageBucket: "react-firebase-chat-app-3fc79.appspot.com",
  messagingSenderId: "801745041514",
  appId: "1:801745041514:web:3e57b4bf217fe425733213",
  measurementId: "G-SKWQ07J475",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

export default firebase;
