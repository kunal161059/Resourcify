'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import Image from 'next/image';

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Sign in the user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Get user role from Firestore
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      const userRole = userDoc.data()?.role;

      // Redirect based on role
      if (userRole === 'teacher') {
        router.push('/teacher-dashboard'); // Redirect to teacher dashboard
      } else {
        router.push('/dashboard/student'); // Redirect to student dashboard
      }
    } catch (error: any) {
      setError(error.message); // Handle errors appropriately
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Right side with login form */}
      <div className="w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Welcome Back 👋</h1>
            <p className="text-gray-600">A brand new day is here. It's your day to shape. Sign in and get started on your Clg work.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 rounded-lg border border-gray-200 text-gray-800 bg-gray-50"
                placeholder="Example@email.com"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 rounded-lg border border-gray-200 text-gray-800 bg-gray-50"
                placeholder="At least 8 characters"
              />
            </div>

            

            <button
              type="submit"
              className="w-full py-4 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
            >
              Sign in
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Don&apos;t you have an account?{' '}
            <a href="/auth/register" className="text-[#0B4A2B] font-medium hover:text-[#083920]">
              Sign up
            </a>
          </p>

          {error && (
            <div className="mt-4 bg-red-50 text-red-500 p-3 rounded-lg">
              {error}
            </div>
          )}

        </div>
      </div>

      {/* Right side with image */}
      <div className="w-1/2 relative flex items-center justify-center">
        <Image
          src="/red-illustration.png"
          alt="Decorative leaves"
          width={700}
          height={700}

        />
      </div>
    </div>
  );
}
