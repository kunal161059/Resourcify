// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, query, where, setDoc, doc, updateDoc } from 'firebase/firestore';
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

// Initialize Firebase
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
    console.log('Attempting to register:', { email, role, name });
    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User created successfully:', result.user.uid);
    
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
    console.error('Registration error:', error);
    throw error;
  }
};

export const verifyTeacherCode = async (code: string) => {
  try {
    const normalizedCode = code.trim().toUpperCase();
    const codesRef = collection(db, 'teacherCodes');
    
    // Query for the teacher code that matches our normalized code and is not used
    const q = query(
      codesRef,
      where('code', '==', normalizedCode),
      where('isUsed', '==', false)
    );
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return false;
    }
    
    // Get the first matching document
    const matchingDocRef = doc(db, 'teacherCodes', querySnapshot.docs[0].id);
    
    // Update just the specific fields without overwriting the entire document
    await updateDoc(matchingDocRef, {
      isUsed: true,
      usedAt: new Date(),
    });
    
    return true;
  } catch (error) {
    console.error('Verification error:', error);
    return false;
  }
};

export default app;