import firebase, { initializeApp } from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBSa1XiU98HUQ_djMPvF5LR1qR5r8eJGeg",
  authDomain: "open-mind-psychology.firebaseapp.com",
  projectId: "open-mind-psychology",
  storageBucket: "open-mind-psychology.appspot.com",
  messagingSenderId: "254563273480",
  appId: "1:254563273480:web:f65a4e00111684a79a7abd",
  measurementId: "G-J02R8L5J4H",
};

export const app = initializeApp(firebaseConfig);
export const auth = app.auth();
export const storage = app.storage();
export const bd = app.firestore();

export const providerGoogle = new firebase.auth.GoogleAuthProvider();

export const providerFacebook = new firebase.auth.FacebookAuthProvider();

export const providerTwitter = new firebase.auth.TwitterAuthProvider();
