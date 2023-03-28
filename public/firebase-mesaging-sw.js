// import { initializeApp } from "firebase/app";
// import { getMessaging, onMessage } from "firebase/messaging";

// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');
// const firebaseConfig = {
//     apiKey: "AIzaSyAhlHo54uVpe-CSYTHizzZ148rBJJmq8mc",
//     authDomain: "quiz-fa0cb.firebaseapp.com",
//     databaseURL: "https://quiz-fa0cb-default-rtdb.firebaseio.com",
//     projectId: "quiz-fa0cb",
//     storageBucket: "quiz-fa0cb.appspot.com",
//     messagingSenderId: "81353665901",
//     appId: "1:81353665901:web:e7fc930ece6c3627b6fe64",
//     measurementId: "G-7022P8KHJG",
//   };

//   const app=initializeApp(firebaseConfig)
//   const messaging=getMessaging(app);

//   messaging.onBackgroundMessage(function (payload) {
//     if (payload ) {
//       const notificationTitle = payload.data.title;
//       const notificationOptions = {
//         body: payload.data.body,
//         data: payload.data.clickEvent
//       };
  
//       return  self.registration.showNotification(notificationTitle, notificationOptions);
//     }
//   });