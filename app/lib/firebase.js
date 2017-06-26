import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAky0Bu2elgDLSYw2I317K2i-ynje7sbRI',
  authDomain: 'glowing-heat-8207.firebaseapp.com',
  databaseURL: 'https://glowing-heat-8207.firebaseio.com/',
  storageBucket: 'glowing-heat-8207.appspot.com',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
