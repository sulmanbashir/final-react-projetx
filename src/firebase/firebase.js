import * as firebase from 'firebase';

const devConfig = {
    apiKey: "AIzaSyA13g5P4levUQRaNHqS7f7SPnrBJ334pd8",
    authDomain: "projetx-b083c.firebaseapp.com",
    databaseURL: "https://projetx-b083c.firebaseio.com",
    projectId: "projetx-b083c",
    storageBucket: "projetx-b083c.appspot.com",
    messagingSenderId: "757916199999"
};

const config = devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};
