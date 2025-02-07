'use client';
import React from 'react';
import Link from 'next/link';
import { PlusCircle, FileText } from "lucide-react";
import { Button } from "../../components/ui/moving-border";

const TeacherDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-3xl font-semibold text-gray-900">Teacher Dashboard</h1>
          <p className="text-gray-500 mt-2">Manage your posts and create new content</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Illustration */}
          <div className="order-2 lg:order-1">
            <img 
              src="https://thepear.co/assets/images/image01.svg?v=51624eb8"
              alt="Dashboard Illustration"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Right Side - Actions */}
          <div className="order-1 lg:order-2 space-y-6 relative">
            <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-orange-500/50 rounded-full blur-3xl"></div>
            <div className="bg-white rounded-lg shadow-md border border-transparent hover:border-black transition-colors relative">
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-medium text-gray-900">Quick Actions</h2>
                  <p className="text-gray-500 text-sm">Access your most important tools</p>
                </div>

                <div className="space-y-4">
                  <Link href="/dashboard/teacher/create-post" className="w-full block">
                    <Button
                      className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-white hover:bg-gray-800 text-black hover:text-white transition-colors"
                      containerClassName="w-full h-auto"
                      duration={4000}
                    >
                      <PlusCircle className="w-5 h-5" />
                      <span>Create New Post</span>
                    </Button>
                  </Link>

                  <Link href="/dashboard/teacher/old-posts" className="w-full block">
                    <Button
                      className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-white hover:bg-gray-800 text-black hover:text-white transition-colors"
                      containerClassName="w-full h-auto"
                      duration={4000}
                    >
                      <FileText className="w-5 h-5" />
                      <span>View Old Post</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;