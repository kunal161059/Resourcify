'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { BackgroundLines } from '@/components/ui/background-lines';
import Image from 'next/image';

interface PostData {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  author: {
    id: string;
    name: string;
    photoURL?: string;
  };
  createdAt: string | Date;
  // add other properties your post contains
}

interface PostParams {
  params: {
    id: string;
  };
}

const PostPage = ({ params }: PostParams) => {
  const router = useRouter();
  const postId = params.id as string;
  const [post, setPost] = useState<PostData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) {
        console.log('No post ID found');
        setIsLoading(false);
        return;
      }
      
      try {
        console.log('Fetching post with ID:', postId);
        const docRef = doc(db, 'posts', postId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const postData = {
            id: docSnap.id,
            ...docSnap.data()
          } as PostData;
          console.log('Post data:', postData);
          setPost(postData);
        } else {
          console.log('No post found with ID:', postId);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (isLoading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <BackgroundLines className="absolute inset-0">
          <></>
        </BackgroundLines>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <BackgroundLines className="absolute inset-0">
          <></>
        </BackgroundLines>
        <p className="text-white">Post not found</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <BackgroundLines className="absolute inset-0">
        <></>
      </BackgroundLines>
      <div className="relative z-10 p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.back()}
            className="mb-6 text-white hover:text-gray-300 flex items-center"
          >
            ← Back to list
          </button>
          
          <div className="rounded-lg shadow-lg p-6 bg-black/50 backdrop-blur-sm">
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-white text-center">{post.title}</h1>
              <div className="mt-2 flex items-center justify-between text-sm text-gray-300">
                <p>From: {post.author.name}</p>
                <p>{post.createdAt instanceof Date ? post.createdAt.toLocaleString() : new Date(post.createdAt).toLocaleString()}</p>
              </div>
            </div>
            
            {post.imageUrl && (
              <div className="my-6">
                <div className="relative w-full h-[400px] rounded-lg overflow-hidden bg-zinc-900/50">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    width={800}
                    height={400}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
              </div>
            )}
            
            {post.author.photoURL && (
              <div className="flex items-center justify-center mt-4">
                <Image
                  src={post.author.photoURL}
                  alt={`${post.author.name}'s profile`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
            )}
            
            <div className="prose max-w-none">
              <p className="whitespace-pre-wrap text-white">{post.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;