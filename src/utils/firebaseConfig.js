import firebase, { initializeApp } from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPILS0hg2JsuR4i6Nh4irnNp5MkC5RNgo",
  authDomain: "omp-backup-87170.firebaseapp.com",
  projectId: "omp-backup-87170",
  storageBucket: "omp-backup-87170.appspot.com",
  messagingSenderId: "531668604823",
  appId: "1:531668604823:web:4ff1063d8eb75af39656d2",
  measurementId: "G-7RLG8LFMCN"
};

export const app = initializeApp(firebaseConfig);
export const auth = app.auth();
export const storage = app.storage();
export const bd = app.firestore();
export const credentials = storage.ref().child("credentials");

export const providerGoogle = new firebase.auth.GoogleAuthProvider();

export const providerFacebook = new firebase.auth.FacebookAuthProvider();

export const providerTwitter = new firebase.auth.TwitterAuthProvider();
