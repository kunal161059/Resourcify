'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db, verifyTeacherCode } from '@/lib/firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';

interface RegisterFormData {
  email: string;
  password: string;
  username: string;
}

interface ValidationError {
  field: string;
  message: string;
}

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [teacherCode, setTeacherCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [username, setUsername] = useState('');

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !username) {
      setError('All fields are required');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email,
        role,
        username,
        createdAt: new Date(),
        verified: role === 'teacher',
      });

      router.push(role === 'teacher' ? '/teacher-dashboard' : '/dashboard/student');
    } catch (error) {
      console.error('Full registration error:', error);
      setError(error instanceof Error ? error.message : 'Registration failed');
    }
  };


  const handleGoogleSignUp = async () => {
    try {
      if (role === 'teacher') {
        const isValidCode = await verifyTeacherCode(teacherCode);
        if (!isValidCode) {
          setError('Invalid teacher verification code');
          return;
        }
      }

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      await setDoc(doc(db, 'users', result.user.uid), {
        email: result.user.email,
        role: role,
        createdAt: new Date(),
        verified: role === 'teacher',
      });

      router.push(role === 'teacher' ? '/teacher-dashboard' : '/dashboard/student');
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error('Firebase error:', error.code, error.message);
        setError(error.message);
      } else if (error instanceof Error) {
        console.error('Registration error:', error.message);
        setError(error.message);
      } else {
        console.error('Unknown registration error:', error);
        setError('An unexpected error occurred during registration');
      }
    }
  };

  const handleValidation = (data: RegisterFormData): ValidationError | null => {
    // Your validation logic
    return null;
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-6">
        {/* Form Section */}
        <div className="bg-[#fff2f1] p-8 rounded-3xl w-full max-w-md">
          <div className="flex items-center gap-2 mb-6">
            <span className="font-semibold text-[#1B4B43] text-4xl">Create new account</span>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Your Username"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#1B4B43] text-gray-600"
                required
              />
            </div>
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#1B4B43] text-gray-600"
                required
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#1B4B43] text-gray-600"
                required
              />
            </div>
            <div>
              <h6 className="text-gray-600 text-sm">Select your role</h6>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#1B4B43] text-gray-600"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>

            {role === 'teacher' && (
              <div>
                <input
                  type="text"
                  value={teacherCode}
                  onChange={(e) => setTeacherCode(e.target.value)}
                  placeholder="Enter Teacher Verification Code"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#1B4B43] text-gray-600"
                  required
                />
              </div>
            )}

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <button
              type="submit"
              className="w-full bg-[#ffa08d] text-white py-3 rounded-lg hover:bg-[#a1483a] transition duration-200"
            >
              Sign Up
            </button>

            <div className="text-center text-sm text-gray-600">
              Already have an account? <a href="/auth/login" className="text-[#1B4B43] font-medium relative group">
                Log in instead
                <svg className="absolute -bottom-1 left-0 w-full h-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                  <path fill="#1B4B43" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,208C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" className="transition-transform duration-300 ease-in-out group-hover:translate-x-0 -translate-x-full"></path>
                </svg>
              </a>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="w-full flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-black text-gray-600"
              >
                <img src="/google-color.png" alt="Google" className="h-5 w-5" />
                <span className="text-gray-600">Sign up with Google</span>
              </button>
            </div>
          </form>
        </div>

        {/* Content Section */}
        <div className="hidden md:block text-center md:text-left">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-black">Share</span><br />
            <span className="text-black">Notes</span><br />
            <span className="text-[#FF6B4E]">With<br />EASE.</span>
          </h1>
          <img
            src="/redinred.png"
            alt="Registration"
            width={500}
            height={300}
          />
        </div>
      </div>
    </div>
  );
}