import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAbNUQI_bMOTQbdYXy9k8KSCKrJMXJ2IVs",
  authDomain: "flipclip-53ed4.firebaseapp.com",
  databaseURL: "https://flipclip-53ed4.firebaseio.com",
  projectId: "flipclip-53ed4",
  storageBucket: "flipclip-53ed4.appspot.com",
  messagingSenderId: "413985412524",
  appId: "1:413985412524:web:88e1c2dea9fcc3b9d4d609",
  measurementId: "G-3Q394JQ9JE" 
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
