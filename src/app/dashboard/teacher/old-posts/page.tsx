'use client';
import { useEffect, useState, useRef } from 'react';
import { db } from '@/lib/firebase'; // Adjust the import based on your project structure
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import styled from 'styled-components';
import Image from 'next/image';
import { cloudinaryConfig } from '@/lib/cloudinary';

// Move StyledWrapper outside the component
const StyledWrapper = styled.div`
    .button {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: rgb(20, 20, 20);
        border: none;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.164);
        cursor: pointer;
        transition-duration: .3s;
        overflow: hidden;
        position: relative;
    }

    .svgIcon {
        width: 12px;
        transition-duration: .3s;
    }

    .svgIcon path {
        fill: white;
    }

    .button:hover {
        width: 140px;
        border-radius: 50px;
        transition-duration: .3s;
        background-color: rgb(255, 69, 69);
        align-items: center;
    }

    .button:hover .svgIcon {
        width: 50px;
        transition-duration: .3s;
        transform: translateY(60%);
    }

    .button::before {
        position: absolute;
        top: -20px;
        content: "Delete";
        color: white;
        transition-duration: .3s;
        font-size: 2px;
    }

    .button:hover::before {
        font-size: 13px;
        opacity: 1;
        transform: translateY(30px);
        transition-duration: .3s;
    }
`;

// Update the post type to include imageUrl
type Post = {
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
};

const extractPublicId = (imageUrl: string): string | null => {
    try {
        // URL format: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/public_id.extension
        const urlParts = imageUrl.split('/');
        const fileNameWithExtension = urlParts[urlParts.length - 1];
        // Remove the extension to get the public_id
        const publicId = fileNameWithExtension.split('.')[0];
        return publicId;
    } catch (error) {
        console.error('Error extracting public_id:', error);
        return null;
    }
};

const generateSignature = async (publicId: string, timestamp: number) => {
    try {
        // We'll make a request to our API route to generate the signature
        const response = await fetch('/api/cloudinary/sign-deletion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                publicId,
                timestamp,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to generate signature');
        }

        const data = await response.json();
        return data.signature;
    } catch (error) {
        console.error('Error generating signature:', error);
        throw error;
    }
};

const deleteImageFromCloudinary = async (imageUrl: string) => {
    try {
        const publicId = extractPublicId(imageUrl);
        if (!publicId) {
            throw new Error('Could not extract public_id from URL');
        }

        const timestamp = Math.round(new Date().getTime() / 1000);
        const signature = await generateSignature(publicId, timestamp);

        const formData = new FormData();
        formData.append('public_id', publicId);
        formData.append('api_key', cloudinaryConfig.apiKey);
        formData.append('timestamp', timestamp.toString());
        formData.append('signature', signature);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/destroy`,
            {
                method: 'POST',
                body: formData,
            }
        );

        const result = await response.json();
        
        if (result.result !== 'ok') {
            throw new Error(result.error?.message || 'Failed to delete image');
        }

        console.log('Image deleted successfully:', result);
    } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
};

export default function OldPosts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const myRef = useRef(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true);
                const postsCollection = collection(db, 'posts');
                const postsSnapshot = await getDocs(postsCollection);
                const postsList = postsSnapshot.docs.map(doc => {
                    const data = doc.data() as Post;
                    const { id, ...rest } = data;
                    return { id: doc.id, ...rest };
                });
                setPosts(postsList);
            } catch (err) {
                setError('Failed to fetch posts');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            // Find the post to get its imageUrl
            const post = posts.find(p => p.id === id);
            
            if (post?.imageUrl) {
                // Delete image from Cloudinary first
                await deleteImageFromCloudinary(post.imageUrl);
            }

            // Delete post from Firebase
            await deleteDoc(doc(db, 'posts', id));
            
            // Update local state
            setPosts(posts.filter(post => post.id !== id));
            
            // Show success message
            alert('Post and associated image deleted successfully');
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Error deleting post. Please try again.');
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen p-6 bg-black flex items-center justify-center">
                <p className="text-gray-200">Loading posts...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen p-6 bg-black flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 bg-black">
            <h1 className="text-4xl font-bold mb-6 text-gray-200">Old Posts</h1>
            <ul className="space-y-4">
                {posts.map((post, index) => (
                    <li
                        key={post.id} 
                        className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm hover:border-zinc-700 transition-all duration-300 p-4 rounded-md shadow-md flex flex-col border border-transparent group"
                    >
                        <div className="flex items-start gap-4 justify-between">
                            <div className="flex items-start gap-4">
                                <span className="text-2xl font-bold text-gray-200 min-w-[30px]">
                                    #{index + 1}
                                </span>
                                <div className="flex-1">
                                    <h2 className="text-xl font-semibold text-gray-200 group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-rose-400 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-300">{post.content}</p>
                                </div>
                            </div>
                            <StyledWrapper>
                                <button 
                                    onClick={() => handleDelete(post.id)} 
                                    className="button"
                                >
                                    <svg viewBox="0 0 448 512" className="svgIcon">
                                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                    </svg>
                                </button>
                            </StyledWrapper>
                        </div>
                        
                        {/* Add image display */}
                        {post.imageUrl && (
                            <div className="mt-4 relative w-full h-[300px] rounded-lg overflow-hidden">
                                <img
                                    src={post.imageUrl}
                                    alt={`Image for ${post.title}`}
                                    className="w-full h-full object-contain bg-black/50"
                                />
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
