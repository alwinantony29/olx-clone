    // import {firebase} from 'firebase'
    import firebase from 'firebase/compat/app';
    import 'firebase/compat/auth';
    import 'firebase/compat/firestore';
    import {  getAuth} from "firebase/auth";
    import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
    
    // Import the functions you need from the SDKs you need
    // import { initializeApp } from "firebase/app";
    // import { getAnalytics } from "firebase/analytics";
    // TODO: Add SDKs for Firebase products that you want to use
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyAkZ6C-pGoQ-04v73wheNAzEXA5eyi-Hv8",
      authDomain: "olx-clone-3e6d7.firebaseapp.com",
      projectId: "olx-clone-3e6d7",
      storageBucket: "olx-clone-3e6d7.appspot.com",
      messagingSenderId: "889911260023",
      appId: "1:889911260023:web:684c59c3d230cb54476772",
      measurementId: "G-C9F2EMKD41"
    };    
    // Initialize Firebase
// export default firebase.initializeApp(firebaseConfig);
export const db = getFirestore(firebase.initializeApp(firebaseConfig))
    // const analytics = getAnalytics(app);
   export const auth = getAuth();
  export const storage=getStorage()
