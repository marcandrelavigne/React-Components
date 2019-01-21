import firebase from 'firebase';

const config = {
    apiKey: "yourapikeyhere",
    authDomain: "your-app.firebaseapp.com",
    databaseURL: "https://your-app.firebaseio.com",
    projectId: "your-app",
    storageBucket: "",
    messagingSenderId: "01234567890"
};

const firebaseConf = firebase.initializeApp(config);

export default firebaseConf;
