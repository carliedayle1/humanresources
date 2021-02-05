import firebase from "firebase";
import "firebase/storage";

export const app = firebase.initializeApp({
  apiKey: "AIzaSyDJ1106hoAJyFUZuyOnsFCGiDCXE1yVKkE",
  authDomain: "personnel-info-sys-dev.firebaseapp.com",
  databaseURL: "https://personnel-info-sys-dev-default-rtdb.firebaseio.com",
  projectId: "personnel-info-sys-dev",
  storageBucket: "personnel-info-sys-dev.appspot.com",
  messagingSenderId: "72787142013",
  appId: "1:72787142013:web:f48c25fe348cc311b65814",
});
