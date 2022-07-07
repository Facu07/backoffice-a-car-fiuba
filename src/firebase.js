import { collection, addDoc, getDoc } from 'firebase/firestore';

import { v4 as uuidv4 } from "uuid";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// ATENCION
// Usar siempre approach compat app que es lo mismo que usar la version 8
// No mezclar versiones 8 y 9

const firebaseConfig = {
	apiKey: "AIzaSyDqVnog8l3yHC7DvwKoe77S1VqEft1JnUY",
	authDomain: "acar-d40d9.firebaseapp.com",
	databaseURL: "https://acar-d40d9-default-rtdb.firebaseio.com",
	projectId: "acar-d40d9",
	storageBucket: "acar-d40d9.appspot.com",
	messagingSenderId: "718688060732",
	appId: "1:718688060732:web:2568f82af52b1c2a128a39"
  };

const uniqueFilenameGenerator = (fileName) => {
	return `${uuidv4()}-${fileName}`;
}

// Use this to initialize the firebase App
const firebaseCompatApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseCompatApp.firestore();
const auth = firebaseCompatApp.auth();
const storage = firebaseCompatApp.storage();

export { auth, db, storage, collection, addDoc, getDoc, uniqueFilenameGenerator };
