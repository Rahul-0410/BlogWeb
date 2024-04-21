let firebaseConfig = {
    // Enter your firebase credentials
    apiKey: "AIzaSyCeTXSWNcBtmUiCCP0Mni1fBm48iBs72WY",
    authDomain: "mhaoblog-b695d.firebaseapp.com",
    projectId: "mhaoblog-b695d",
    storageBucket: "mhaoblog-b695d.appspot.com",
    messagingSenderId: "933631622586",
    appId: "1:933631622586:web:829f49541e805b76977183"
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();