import firebase from 'firebase/app'
import { getFirestore, setDoc, doc } from 'firebase/firestore'

console.log(firebase)

const firebaseConfig = {
    apiKey: 'AIzaSyCieBw6rFVScOpKvEbbW9Zkibl2D5Ti8Cw',
    authDomain: 'biblija-nsp.firebaseapp.com',
    projectId: 'biblija-nsp',
    storageBucket: 'biblija-nsp.appspot.com',
    messagingSenderId: '845226860304',
    appId: '1:845226860304:web:218a635f24a219ad76cf95',
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)

export const firestore = getFirestore()
