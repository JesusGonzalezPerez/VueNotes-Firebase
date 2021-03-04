import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyDPcvKcoy1R4D45S1hm1HZxRtu5F7JC9Fc",
  authDomain: "vuecli-notes.firebaseapp.com",
  projectId: "vuecli-notes",
  storageBucket: "vuecli-notes.appspot.com",
  messagingSenderId: "546666095380",
  appId: "1:546666095380:web:9ed6fe0a1513ebf1589801"
};
const db = firebase.initializeApp( firebaseConfig ).firestore();

export {db}