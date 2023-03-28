// import firebase from 'firebase/app'
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getMessaging, onMessage} from 'firebase/messaging'
import {getToken} from 'firebase/messaging';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhlHo54uVpe-CSYTHizzZ148rBJJmq8mc",
  authDomain: "quiz-fa0cb.firebaseapp.com",
  databaseURL: "https://quiz-fa0cb-default-rtdb.firebaseio.com",
  projectId: "quiz-fa0cb",
  storageBucket: "quiz-fa0cb.appspot.com",
  messagingSenderId: "81353665901",
  appId: "1:81353665901:web:e7fc930ece6c3627b6fe64",
  measurementId: "G-7022P8KHJG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging=getMessaging(app);

//Token is generated using a Key
export const requestForToken = ()=>{
  return getToken(messaging, {vapidKey :'BLRPkcSeiGQ7QYxvooXY08es6a0R_6YATI-EMuIMAQ6RQE-fPBNbd5Mv4pzTnRyafJtH7DDJP4m5P1xt2L5CH3U'})
  .then((currentToken)=>{
    if(currentToken){
      console.log("Current token : ", currentToken)
    }else{
      console.log("Cant get token")
    }
  }).catch((err)=>console.error(err));
}

export const onMessageListener = () =>
new Promise((resolve)=>{
  onMessage(messaging , (payload)=>{
    console.log("Payload", payload)
    resolve(payload);
    console.log(payload);
  })
})

export const db = getFirestore(app);