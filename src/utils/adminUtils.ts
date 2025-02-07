import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const generateTeacherCode = async () => {
  try {
    // Generate a random code (you can modify this to your needs)
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    // Add the code to Firestore
    await addDoc(collection(db, 'teacherCodes'), {
      code,
      isUsed: false,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires in 7 days
    });
    
    return code;
  } catch (error) {
    console.error('Error generating teacher code:', error);
    throw error;
  }
}; 