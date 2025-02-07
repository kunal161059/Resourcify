'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { cloudinaryConfig } from '@/lib/cloudinary';
import toast from 'react-hot-toast';
import { Spinner } from '@/components/ui/spinner';

export default function TeacherDashboard() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('all');
  const [image, setImage] = useState<File | null>(null);
  const [facultyName, setFacultyName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const batches = ['all', 'it-section1', 'it-section2', 'it-section3', 'it-section4'];

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    if (!cloudinaryConfig.cloudName || !cloudinaryConfig.uploadPreset) {
      throw new Error('Cloudinary configuration is missing');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryConfig.uploadPreset);
    
    try {
      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`;
      
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Upload failed with status:', response.status);
        console.error('Error response:', errorText);
        throw new Error(`Upload failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.secure_url) {
        console.error('No secure_url in response:', data);
        throw new Error('Invalid upload response');
      }

      return data.secure_url;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate required fields
    if (!title || !content || !facultyName) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsUploading(true);

    try {
      let imageUrl = '';
      
      if (image) {
        // Upload to Cloudinary and get the secure_url
        imageUrl = await uploadImageToCloudinary(image);
        console.log('Image URL for post:', imageUrl);
      }

      // Create post in Firebase
      await addDoc(collection(db, 'posts'), {
        title,
        content,
        batch: selectedBatch,
        facultyName,
        timestamp: serverTimestamp(),
        imageUrl,
      });

      // Reset form
      setTitle('');
      setContent('');
      setSelectedBatch('all');
      setImage(null);
      setImagePreview(null);
      setFacultyName('');
      
      // Success notification with more details
      toast.success('Post created successfully!', {
        duration: 3000,
        position: 'top-center',
        icon: '🎉',
      });

    } catch (error) {
      console.error('Error:', error);
      // Error notification with more details
      toast.error('Failed to create post. Please try again.', {
        duration: 4000,
        position: 'top-center',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      
      // Validate file size (e.g., 5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      setImage(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-zinc-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Card */}
        <Card className="border-0 bg-gradient-to-r from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent flex items-center justify-center gap-2">
              <img src="/star_1527379.png" alt="Icon 1" className="w-6 h-6 text-white" />
              Teacher Dashboard
              <img src="/star_1527379.png" alt="Icon 2" className="w-6 h-6 text-white" />
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title Card */}
          <Card className="border border-zinc-800 bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm hover:border-zinc-700 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg text-white">Post Title</CardTitle>
            </CardHeader>
            <CardContent>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded-lg bg-black/50 border border-zinc-800 text-white placeholder-zinc-500 focus:ring-2 focus:ring-white focus:border-transparent transition duration-200"
                placeholder="Enter post title..."
                required
              />
            </CardContent>
          </Card>

          {/* Batch Selection Card */}
          <Card className="border border-zinc-800 bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm hover:border-zinc-700 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg text-white">Section Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="w-full p-3 rounded-lg bg-black/50 border border-zinc-800 text-white focus:ring-2 focus:ring-white focus:border-transparent transition duration-200"
              >
                {batches.map((batch) => (
                  <option key={batch} value={batch} className="bg-black">
                    {batch.charAt(0).toUpperCase() + batch.slice(1).replace('-', ' ')}
                  </option>
                ))}
              </select>
            </CardContent>
          </Card>

          {/* Faculty Name Card */}
          <Card className="border border-zinc-800 bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm hover:border-zinc-700 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg text-white">Faculty Name</CardTitle>
            </CardHeader>
            <CardContent>
              <input
                type="text"
                value={facultyName}
                onChange={(e) => setFacultyName(e.target.value)}
                className="w-full p-3 rounded-lg bg-black/50 border border-zinc-800 text-white placeholder-zinc-500 focus:ring-2 focus:ring-white focus:border-transparent transition duration-200"
                placeholder="Enter your name"
                required
              />
            </CardContent>
          </Card>

          {/* Content Card - Full Width */}
          <Card className="border border-zinc-800 bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm hover:border-zinc-700 transition-all duration-300 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg text-white">Content</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="w-full p-3 rounded-lg bg-black/50 border border-zinc-800 text-white placeholder-zinc-500 focus:ring-2 focus:ring-white focus:border-transparent transition duration-200"
                placeholder="Enter your post content..."
                required
              />
            </CardContent>
          </Card>

          {/* Image Upload Card */}
          <Card className="border border-zinc-800 bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm hover:border-zinc-700 transition-all duration-300 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <img src="/clip_16389588.png" alt="Icon" className="w-5 h-5" />
                Attach Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-zinc-800 border-dashed rounded-lg cursor-pointer bg-black/50 hover:bg-zinc-900/50 transition duration-200 relative">
                  {isUploading ? (
                    <div className="flex items-center justify-center">
                      <Spinner />
                    </div>
                  ) : imagePreview ? (
                    <div className="absolute inset-0 w-full h-full">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-contain p-2"
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setImage(null);
                          setImagePreview(null);
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <img src="/stack_15484688.png" alt="Placeholder" className="w-8 h-8 mb-3 text-zinc-400" />
                      <p className="mb-2 text-sm text-zinc-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageSelect}
                    disabled={isUploading}
                  />
                </label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submit Button */}
        <form onSubmit={handlePost} className="w-full">
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-white to-gray-200 text-black rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-red-500 hover:to-orange-500 hover:text-white transition duration-200 shadow-lg hover:shadow-orange-500/20"
          >
            <img src="/pen-square_10435606.png" alt="Icon" className="w-5 h-5" />
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}