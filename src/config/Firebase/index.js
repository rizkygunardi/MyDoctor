import firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyARBSvYW3QZxjbtJ3ocyJtWir3GrjNCuC0',
  databaseURL: 'https://my-doctor-cs-default-rtdb.firebaseio.com/',
  authDomain: 'my-doctor-cs.firebaseapp.com',
  projectId: 'my-doctor-cs',
  storageBucket: 'my-doctor-cs.appspot.com',
  messagingSenderId: '618030572684',
  appId: '1:618030572684:web:fb449931463fbbb51887a9',
});

const Firebase = firebase;
export default Firebase;
