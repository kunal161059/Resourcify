// src/app/dashboard/student/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { User } from 'firebase/auth';

type Post = {
  id: string;
  title: string;
  content: string;
  facultyName: string;
  batch: string;
  timestamp: any;
  imageUrl?: string; // Add this for image support
};

// Define proper interfaces for your data
interface StudentData {
  user: User;
  courses: CourseData[];
  // Add other specific types
}

interface CourseData {
  id: string;
  title: string;
  imageUrl?: string;
  // Add other course properties
}

export default function StudentDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [courses, setCourses] = useState<CourseData[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const postsQuery = query(
          collection(db, 'posts'),
          orderBy('timestamp', 'desc')
        );
        const querySnapshot = await getDocs(postsQuery);
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Student Dashboard</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <Link href={`/dashboard/student/post/${post.id}`} key={post.id}>
            <Card className="p-6 bg-zinc-900/90 hover:bg-zinc-800/90 transition-all duration-300 border border-zinc-800 hover:border-zinc-700">
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">{post.title}</h2>
                  <p className="text-zinc-400">By {post.facultyName}</p>
                </div>
                
                {/* Preview image if available */}
                {post.imageUrl && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                
                <p className="text-zinc-300 line-clamp-2">{post.content}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500">
                    {post.timestamp?.toDate().toLocaleDateString()}
                  </span>
                  <span className="px-3 py-1 bg-zinc-800 rounded-full text-zinc-300 text-sm">
                    {post.batch}
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      <div>
        {/* Replace img with Next.js Image */}
        {studentData?.user?.photoURL && (
          <Image
            src={studentData.user.photoURL}
            alt="Student profile"
            width={100}
            height={100}
            className="rounded-full"
          />
        )}
        
        {/* If you have other images, replace those too */}
        {/* Example for course images */}
        {courses?.map((course: CourseData) => (
          <div key={course.id}>
            {course.imageUrl && (
              <Image
                src={course.imageUrl}
                alt={course.title}
                width={200}  // adjust size as needed
                height={150} // adjust size as needed
                className="course-image"  // keep any existing classes
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
