import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDtjl2aK_8Rb3NUsjciDeKS4mgTGrWio74',
  authDomain: 'film-list-49832.firebaseapp.com',
  projectId: 'film-list-49832',
  storageBucket: 'film-list-49832.appspot.com',
  messagingSenderId: '891542361105',
  appId: '1:891542361105:web:0d8900d6eab6d73ddccdb0',
}

// init firebase
firebase.initializeApp(firebaseConfig)

//init firestore services
const dataBase = firebase.firestore()
const auth = firebase.auth()

// timestamp function to order our data correctly from newest added at the top
const timestamp = firebase.firestore.Timestamp

// export anything we will use
export { dataBase, auth, timestamp }
