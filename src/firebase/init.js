import firebase from 'firebase/app'
import 'firebase/firestore'

var firestoreConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: 'sfp-supplier-list',
  storageBucket: '',
  messagingSenderId: ''
}

// Get a Firestore instance
export const firebaseApp = firebase.initializeApp(firestoreConfig).firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

export default firebaseApp
