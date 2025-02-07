// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp, query, where, getDocs, setDoc, doc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBx3yo-ouQCYBxTn_9xyuxsAfKXSAiT1pY",
  authDomain: "resourcify-2618e.firebaseapp.com",
  databaseURL: "https://resourcify-2618e-default-rtdb.firebaseio.com",
  projectId: "resourcify-2618e",
  storageBucket: "resourcify-2618e.firebasestorage.app",
  messagingSenderId: "449014061320",
  appId: "1:449014061320:web:4182134eb5ca84a4d474bd",
  measurementId: "G-32M3EQTJ74"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Auth functions
export const loginUser = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (email: string, password: string, role: 'teacher' | 'student', name: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Add user profile to Firestore
    await addDoc(collection(db, 'users'), {
      uid: result.user.uid,
      email: email,
      role: role,
      name: name,
      createdAt: serverTimestamp()
    });
    
    return result.user;
  } catch (error) {
    throw error;
  }
};

export const verifyTeacherCode = async (code: string) => {
  try {
    const normalizedCode = code.trim().toUpperCase();
    const codesRef = collection(db, 'teacherCodes');
    
    // Simple query to just check if code exists
    const querySnapshot = await getDocs(codesRef);
    
    let isValid = false;
    querySnapshot.forEach(doc => {
      const data = doc.data();
      if (data.code === normalizedCode && data.isUsed === false) {
        isValid = true;
      }
    });
    
    return isValid;
    
  } catch (error) {
    console.error("Verification error:", error);
    return false;
  }
};