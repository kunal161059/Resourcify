'use client'; // Ensure this line is at the top of your file

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from 'next/image';

declare global {
    interface Window {
        $crisp: any[];
        CRISP_WEBSITE_ID: string;
    }
}

interface TestimonialProps {
  text: string;
  author: string;
  role: string;
  imageUrl: string;
}

export default function Home() {
    const [isDarkMode, setIsDarkMode] = useState(false); // Default to light mode
    const [openIndex, setOpenIndex] = useState<number | null>(null); // Track which FAQ item is open

    // Add Crisp Chat Script
    useEffect(() => {
        // Ensure this runs only on the client side
        window.$crisp = [];
        window.CRISP_WEBSITE_ID = "334593da-bb81-4556-96af-77e9d2ef6c9d";
        (function () {
            const d = document;
            const s = d.createElement("script");
            s.src = "https://client.crisp.chat/l.js";
            s.async = true;
            d.getElementsByTagName("head")[0].appendChild(s);
        })();
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.style.setProperty('--background', '#0a0a0a');
            document.documentElement.style.setProperty('--foreground', '#ededed');
        } else {
            document.documentElement.style.setProperty('--background', '#ffffff');
            document.documentElement.style.setProperty('--foreground', '#171717');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    // Function to toggle FAQ item open/close
    const toggleFAQ = (index: number) => {
        if (openIndex === index) {
            setOpenIndex(null); // Close the currently open item
        } else {
            setOpenIndex(index); // Open the clicked item
        }
    };

    // Smooth scroll function
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    // FAQ data
    const faqItems = [
        {
            question: "Q: Is this platform only for 3rd year students?",
            answer: "Yes, currently this platform is designed specifically for 3rd year students and their faculty members, with separate batches for efficient information sharing.",
        },
        {
            question: "Q: Can students also post content?",
            answer: "No, only registered teachers can post content. Students can only view and access the materials shared by their teachers.",
        },
        {
            question: "Q: How is this better than using WhatsApp?",
            answer: "This platform provides a dedicated academic space, separating educational content from personal messages and making information more organized and easily accessible.",
        },
        {
            question: "Q: How do teachers control which students see their content?",
            answer: "Teachers can choose to share content either with all students or with specific batches, allowing for targeted information sharing.",
        },
    ];

    return (
        <div className={`relative flex flex-col h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
            {/* Navigation Bar */}
            <header className="fixed top-8 left-0 right-0 shadow-inner bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl mx-auto border border-secondary z-40 rounded-2xl flex justify-between items-center p-2 bg-card backdrop-blur bg-transparent">
                {/* Resourcify Logo */}
                <Link href="/" className="font-bold text-lg flex items-center ml-2">Resourcify</Link>

                {/* Navigation Links */}
                <div className="flex items-center space-x-8">
                    <button onClick={() => scrollToSection("home")} className="relative group hover:underline">
                        Home
                        <svg 
                            fill="none" 
                            viewBox="0 0 182.24 72.42" 
                            className="absolute w-[120px] h-[40px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                            style={{ stroke: isDarkMode ? '#ffffff' : '#000000' }}
                        >
                            <path d="M90.41,54.27c-8.39.86-16.76,2-25.17,2.54-13.82.88-27.67,1.65-41.52,1.87-5.13.09-10.39-1.09-15.39-2.44C-1.93,53.46-1.48,43.65,3.09,37.4,8,30.66,14.55,25.83,21.49,21.58,36.89,12.14,53.72,6.35,71.41,3.07A196.63,196.63,0,0,1,111.31.32,135.77,135.77,0,0,1,160.5,10.58c6.69,2.74,13.35,5.86,18.34,11.41,2.79,3.1,4.65,6.75,2.39,10.87a13.45,13.45,0,0,1-4.49,4.48c-6.57,4.26-14,6.62-21.49,8.47-22.43,5.52-44.88,11-67.43,16C71.3,65.5,54.62,68.46,38,71.71a5.33,5.33,0,0,1-2.5-.11c6.85-1.37,13.71-2.69,20.55-4.12q14.14-2.94,28.26-6c9.74-2.11,19.52-4.07,29.19-6.46,16.35-4.05,32.68-8.21,48.91-12.72a63.58,63.58,0,0,0,14-6.25c5.46-3.1,5.82-8,1.63-12.61-4.88-5.38-11.23-8.5-17.7-11.22A137.91,137.91,0,0,0,107.72,1.66,184.85,184.85,0,0,0,64,6,140.25,140.25,0,0,0,27,19.92c-7.49,4.19-14.79,8.68-20.4,15.32A26.84,26.84,0,0,0,2.1,42.8C-.53,49.71,3.86,53.17,8.49,55c7.15,2.78,14.66,3,22.14,2.58,15.73-.81,31.45-1.89,47.18-2.88,4.19-.27,8.38-.64,12.58-1Z" />
                        </svg>
                    </button>
                    <button onClick={() => scrollToSection("motive")} className="relative group hover:underline">
                        Motive
                        <svg 
                            fill="none" 
                            viewBox="0 0 182.24 72.42" 
                            className="absolute w-[120px] h-[40px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                            style={{ stroke: isDarkMode ? '#ffffff' : '#000000' }}
                        >
                            <path d="M90.41,54.27c-8.39.86-16.76,2-25.17,2.54-13.82.88-27.67,1.65-41.52,1.87-5.13.09-10.39-1.09-15.39-2.44C-1.93,53.46-1.48,43.65,3.09,37.4,8,30.66,14.55,25.83,21.49,21.58,36.89,12.14,53.72,6.35,71.41,3.07A196.63,196.63,0,0,1,111.31.32,135.77,135.77,0,0,1,160.5,10.58c6.69,2.74,13.35,5.86,18.34,11.41,2.79,3.1,4.65,6.75,2.39,10.87a13.45,13.45,0,0,1-4.49,4.48c-6.57,4.26-14,6.62-21.49,8.47-22.43,5.52-44.88,11-67.43,16C71.3,65.5,54.62,68.46,38,71.71a5.33,5.33,0,0,1-2.5-.11c6.85-1.37,13.71-2.69,20.55-4.12q14.14-2.94,28.26-6c9.74-2.11,19.52-4.07,29.19-6.46,16.35-4.05,32.68-8.21,48.91-12.72a63.58,63.58,0,0,0,14-6.25c5.46-3.1,5.82-8,1.63-12.61-4.88-5.38-11.23-8.5-17.7-11.22A137.91,137.91,0,0,0,107.72,1.66,184.85,184.85,0,0,0,64,6,140.25,140.25,0,0,0,27,19.92c-7.49,4.19-14.79,8.68-20.4,15.32A26.84,26.84,0,0,0,2.1,42.8C-.53,49.71,3.86,53.17,8.49,55c7.15,2.78,14.66,3,22.14,2.58,15.73-.81,31.45-1.89,47.18-2.88,4.19-.27,8.38-.64,12.58-1Z" />
                        </svg>
                    </button>
                    <button onClick={() => scrollToSection("benefits")} className="relative group hover:underline">
                        Benefits
                        <svg 
                            fill="none" 
                            viewBox="0 0 182.24 72.42" 
                            className="absolute w-[120px] h-[40px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                            style={{ stroke: isDarkMode ? '#ffffff' : '#000000' }}
                        >
                            <path d="M90.41,54.27c-8.39.86-16.76,2-25.17,2.54-13.82.88-27.67,1.65-41.52,1.87-5.13.09-10.39-1.09-15.39-2.44C-1.93,53.46-1.48,43.65,3.09,37.4,8,30.66,14.55,25.83,21.49,21.58,36.89,12.14,53.72,6.35,71.41,3.07A196.63,196.63,0,0,1,111.31.32,135.77,135.77,0,0,1,160.5,10.58c6.69,2.74,13.35,5.86,18.34,11.41,2.79,3.1,4.65,6.75,2.39,10.87a13.45,13.45,0,0,1-4.49,4.48c-6.57,4.26-14,6.62-21.49,8.47-22.43,5.52-44.88,11-67.43,16C71.3,65.5,54.62,68.46,38,71.71a5.33,5.33,0,0,1-2.5-.11c6.85-1.37,13.71-2.69,20.55-4.12q14.14-2.94,28.26-6c9.74-2.11,19.52-4.07,29.19-6.46,16.35-4.05,32.68-8.21,48.91-12.72a63.58,63.58,0,0,0,14-6.25c5.46-3.1,5.82-8,1.63-12.61-4.88-5.38-11.23-8.5-17.7-11.22A137.91,137.91,0,0,0,107.72,1.66,184.85,184.85,0,0,0,64,6,140.25,140.25,0,0,0,27,19.92c-7.49,4.19-14.79,8.68-20.4,15.32A26.84,26.84,0,0,0,2.1,42.8C-.53,49.71,3.86,53.17,8.49,55c7.15,2.78,14.66,3,22.14,2.58,15.73-.81,31.45-1.89,47.18-2.88,4.19-.27,8.38-.64,12.58-1Z" />
                        </svg>
                    </button>
                    <button onClick={() => scrollToSection("faq")} className="relative group hover:underline">
                        FAQ's
                        <svg 
                            fill="none" 
                            viewBox="0 0 182.24 72.42" 
                            className="absolute w-[120px] h-[40px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                            style={{ stroke: isDarkMode ? '#ffffff' : '#000000' }}
                        >
                            <path d="M90.41,54.27c-8.39.86-16.76,2-25.17,2.54-13.82.88-27.67,1.65-41.52,1.87-5.13.09-10.39-1.09-15.39-2.44C-1.93,53.46-1.48,43.65,3.09,37.4,8,30.66,14.55,25.83,21.49,21.58,36.89,12.14,53.72,6.35,71.41,3.07A196.63,196.63,0,0,1,111.31.32,135.77,135.77,0,0,1,160.5,10.58c6.69,2.74,13.35,5.86,18.34,11.41,2.79,3.1,4.65,6.75,2.39,10.87a13.45,13.45,0,0,1-4.49,4.48c-6.57,4.26-14,6.62-21.49,8.47-22.43,5.52-44.88,11-67.43,16C71.3,65.5,54.62,68.46,38,71.71a5.33,5.33,0,0,1-2.5-.11c6.85-1.37,13.71-2.69,20.55-4.12q14.14-2.94,28.26-6c9.74-2.11,19.52-4.07,29.19-6.46,16.35-4.05,32.68-8.21,48.91-12.72a63.58,63.58,0,0,0,14-6.25c5.46-3.1,5.82-8,1.63-12.61-4.88-5.38-11.23-8.5-17.7-11.22A137.91,137.91,0,0,0,107.72,1.66,184.85,184.85,0,0,0,64,6,140.25,140.25,0,0,0,27,19.92c-7.49,4.19-14.79,8.68-20.4,15.32A26.84,26.84,0,0,0,2.1,42.8C-.53,49.71,3.86,53.17,8.49,55c7.15,2.78,14.66,3,22.14,2.58,15.73-.81,31.45-1.89,47.18-2.88,4.19-.27,8.38-.64,12.58-1Z" />
                        </svg>
                    </button>
                </div>

                {/* Login and Theme Toggle */}
                <div className="flex items-center space-x-4">
                    <Link href="/auth/login">
                        <span className={`bg-gradient-to-r from-[#D247BF] to-[#FF6F61] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all`}>Login</span>
                    </Link>
                    <button
                        onClick={toggleTheme}
                        className={`flex items-center justify-center transition duration-200 ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                    >
                        <img
                            src={isDarkMode ? "/icons8-sun.svg" : "/night-svgrepo-com.svg"}
                            alt={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                            className="w-6 h-6"
                        />
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div id="home" className="flex flex-1 items-center justify-between px-12 mt-20">
                {/* Left Content */}
                <div className="flex flex-col space-y-2 pl-16">
                    <p className="text-6xl font-light">Plan, learn</p>
                    <p className="text-7xl font-bold">achieve</p>
                    <p className={`text-7xl font-bold`}>
                        <span className={`text-transparent bg-gradient-to-r from-[#D247BF] to-[#FF6F61] bg-clip-text`}>remar</span>
                        <span className={`text-transparent bg-gradient-to-r from-[#FF6F61] to-[#FBB034] bg-clip-text`}>kable</span>
                    </p>
                    <p className="text-7xl font-bold">success</p>
                    
                    {/* Register Button moved here */}
                    <div className="mt-5 flex justify-center pt-16">
                        <Link href="/auth/register">
                            <span className={`${isDarkMode ? 'bg-white text-black hover:bg-black hover:text-white' : 'bg-black text-white hover:bg-white hover:text-black'} px-6 py-3 rounded-lg transition-all duration-300 border ${isDarkMode ? 'border-white hover:border-white' : 'border-black hover:border-black'}`}>
                                Sign Up
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Right Image */}
                <div className="flex-1 flex justify-end">
                    <Image
                        src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*hNyuYgUBGxtm9cXtbJSBCQ.png"
                        alt="Education Image"
                        className="w-[600px] h-[600px] object-contain object-center"
                        width={828}
                        height={828}
                        priority
                    />
                </div>
            </div>

            {/* Exceptional Education Section */}
            <div id="motive" className={`px-24 flex items-center justify-between gap-12 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
                {/* Image */}
                <div className="flex-1">
                    <Image
                        src="https://static.tildacdn.com/tild6563-3832-4461-a239-393437356461/Yuppies_-_Remote_fro.svg"
                        alt="Education Image"
                        className='w-[600px] h-[600px] object-contain object-center'
                        width={600}
                        height={600}
                    />
                </div>

                {/* Text Content */}
                <div className={`flex-1 space-y-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    <h2 className={`text-3xl font-bold`}>Efficient Academic Communication</h2>
                    <div className='space-y-4'>
                        <p className={`text-lg font-light leading-relaxed`}>
                        Our platform is dedicated to streamlining academic information sharing between faculty and students. With a focus on organized content delivery, we ensure students have easy access to their course materials and important notices.
                        </p>
                        <p className={`text-lg font-light italic leading-relaxed`}>
                        "Our goal is to provide a dedicated space where teachers can effectively share academic resources, and students can easily access everything they need for their studies, all in one place."
                        </p>
                    </div>
                </div>
            </div>

            {/* New Section: Benefits */}
            <div id="benefits" className={`px-24 py-12 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
                    {/* Left Side: Text Content */}
                    <div>
                        <h2 className="text-[22px] font-bold mb-4 bg-gradient-to-r from-[#D247BF] to-[#FF6F61] bg-clip-text text-transparent">
                            Benefits
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-bold mb-4">Your Shortcut to Academic Success</h3>
                        <p className="text-xl text-muted-foreground mb-8">
                            Making academic information sharing efficient and organized between faculty and students, eliminating the challenges of using personal messaging platforms for educational purposes.
                        </p>
                    </div>

                    {/* Right Side: Grid of Cards */}
                    <div className="grid lg:grid-cols-2 gap-4 w-full">
                        {/* Card 1 */}
                        <div className="rounded-lg border text-card-foreground shadow-sm border-secondary bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number hover:shadow-lg">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <div className="flex justify-between">
                                    <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" style={{ stopColor: "#FF0000", stopOpacity: 1 }} />
                                                <stop offset="100%" style={{ stopColor: "#990000", stopOpacity: 1 }} />
                                            </linearGradient>
                                        </defs>
                                        <circle cx="25" cy="25" r="15" fill="url(#grad1)" />
                                    </svg>
                                    <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:bg-gradient-to-r group-hover/number:from-[#D247BF] group-hover/number:to-[#FF6F61] group-hover/number:bg-clip-text group-hover/number:text-transparent">01</span>
                                </div>
                                <h3 className="text-2xl font-semibold leading-none tracking-tight">Build Academic Trust</h3>
                            </div>
                            <div className="p-6 pt-0 text-muted-foreground">
                                Create a reliable and professional channel of communication between faculty and students, ensuring important academic information is shared and accessed in a dedicated space.
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="rounded-lg border text-card-foreground shadow-sm border-secondary bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number hover:shadow-lg">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <div className="flex justify-between">
                                    <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" style={{ stopColor: "#FF0000", stopOpacity: 1 }} />
                                                <stop offset="100%" style={{ stopColor: "#660000", stopOpacity: 1 }} />
                                            </linearGradient>
                                        </defs>
                                        <rect width="25" height="25" fill="url(#grad2)" />
                                    </svg>
                                    <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:bg-gradient-to-r group-hover/number:from-[#D247BF] group-hover/number:to-[#FF6F61] group-hover/number:bg-clip-text group-hover/number:text-transparent">02</span>
                                </div>
                                <h3 className="text-2xl font-semibold leading-none tracking-tight">Student Engagement</h3>
                            </div>
                            <div className="p-6 pt-0 text-muted-foreground">
                                Enable students to easily access all their academic materials, notices, and updates in one centralized platform, organized by their specific batch and subjects.
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="rounded-lg border text-card-foreground shadow-sm border-secondary bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number hover:shadow-lg">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <div className="flex justify-between">
                                    <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" style={{ stopColor: "#FF0000", stopOpacity: 1 }} />
                                                <stop offset="100%" style={{ stopColor: "#CC0000", stopOpacity: 1 }} />
                                            </linearGradient>
                                        </defs>
                                        <polygon points="25,5 45,45 5,45" fill="url(#grad3)" />
                                    </svg>
                                    <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:bg-gradient-to-r group-hover/number:from-[#D247BF] group-hover/number:to-[#FF6F61] group-hover/number:bg-clip-text group-hover/number:text-transparent">03</span>
                                </div>
                                <h3 className="text-2xl font-semibold leading-none tracking-tight">Information Reach</h3>
                            </div>
                            <div className="p-6 pt-0 text-muted-foreground">
                                Ensure that academic content reaches the intended students effectively, whether it's batch-specific notes or general notices for all third-year students.
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="rounded-lg border text-card-foreground shadow-sm border-secondary bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number hover:shadow-lg">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <div className="flex justify-between">
                                    <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" style={{ stopColor: "#FF0000", stopOpacity: 1 }} />
                                                <stop offset="100%" style={{ stopColor: "#550000", stopOpacity: 1 }} />
                                            </linearGradient>
                                        </defs>
                                        <polygon points="25,5 30,20 45,20 35,30 40,45 25,35 10,45 15,30 5,20 20,20" fill="url(#grad5)" />
                                    </svg>
                                    <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:bg-gradient-to-r group-hover/number:from-[#D247BF] group-hover/number:to-[#FF6F61] group-hover/number:bg-clip-text group-hover/number:text-transparent">04</span>
                                </div>
                                <h3 className="text-2xl font-semibold leading-none tracking-tight">Interaction Method</h3>
                            </div>
                            <div className="p-6 pt-0 text-muted-foreground">
                                Faculty can experiment with different ways of sharing information - whether through notes, announcements, or batch-specific content.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div id="faq" className={`px-24 py-12 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <h2 className="text-[25px] font-bold text-center mb-4 bg-gradient-to-r from-[#D247BF] to-[#FF6F61] bg-clip-text text-transparent">
                    FAQ'S
                </h2>
                <h1 className="text-4xl font-bold text-center mb-8">Common Questions</h1>
                <div className="max-w-2xl mx-auto space-y-4"> {/* Centered and reduced width */}
                    {faqItems.map((item, index) => (
                        <div key={index} className="border-secondary bg-muted/50 dark:bg-card px-4 my-4 border rounded-lg">
                            <h3 className="flex">
                                <button
                                    type="button"
                                    onClick={() => toggleFAQ(index)}
                                    className="flex flex-1 gap-4 items-center justify-between py-4 font-medium transition-all hover:underline text-left"
                                >
                                    {item.question}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className={`h-4 w-4 shrink-0 transition-transform duration-200 ${openIndex === index ? 'rotate-45' : ''}`}
                                    >
                                        <path d="M5 12h14" />
                                        <path d="M12 5v14" />
                                    </svg>
                                </button>
                            </h3>
                            {openIndex === index && (
                                <div className="overflow-hidden text-sm transition-all">
                                    <div className="pb-4 pt-0 text-muted-foreground text-[16px]">
                                        {item.answer}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Team Members Section */}
            <div className={`py-16 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <h2 className="text-4xl font-bold text-center mb-12">Team Members</h2>
                
                {/* Scrolling Names Container */}
                <div className="relative overflow-hidden w-full max-w-3xl mx-auto">
                    <div className="flex whitespace-nowrap animate-scroll-slow hover:pause">
                        {/* Duplicate the names multiple times to create seamless loop */}
                        <div className="flex space-x-16 mx-8">
                            <span className="text-2xl font-semibold hover:text-[#D247BF] transition-colors flex items-center gap-2">
                                Kunal
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-signature">
                                    <path d="m21 17-2.156-1.868A.5.5 0 0 0 18 15.5v.5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1c0-2.545-3.991-3.97-8.5-4a1 1 0 0 0 0 5c4.153 0 4.745-11.295 5.708-13.5a2.5 2.5 0 1 1 3.31 3.284" strokeLinecap="round"/>
                                    <path d="M3 21h18" strokeLinejoin="round"/>
                                </svg>
                            </span>
                            <span className="text-2xl font-semibold hover:text-[#D247BF] transition-colors flex items-center gap-2">
                                Kushagra
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hand-metal">
                                    <path d="M18 12.5V10a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4"/>
                                    <path d="M14 11V9a2 2 0 1 0-4 0v2"/>
                                    <path d="M10 10.5V5a2 2 0 1 0-4 0v9"/>
                                    <path d="m7 15-1.76-1.76a2 2 0 0 0-2.83 2.82l3.6 3.6C7.5 21.14 9.2 22 12 22h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v5"/>
                                </svg>
                            </span>
                            <span className="text-2xl font-semibold hover:text-[#D247BF] transition-colors flex items-center gap-2">
                                Lakshya
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hand">
                                    <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/>
                                    <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/>
                                    <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/>
                                    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
                                </svg>
                            </span>
                        </div>
                        <div className="flex space-x-16 mx-8">
                            <span className="text-2xl font-semibold hover:text-[#D247BF] transition-colors flex items-center gap-2">
                                Kunal
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-signature">
                                    <path d="m21 17-2.156-1.868A.5.5 0 0 0 18 15.5v.5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1c0-2.545-3.991-3.97-8.5-4a1 1 0 0 0 0 5c4.153 0 4.745-11.295 5.708-13.5a2.5 2.5 0 1 1 3.31 3.284"/>
                                    <path d="M3 21h18"/>
                                </svg>
                            </span>
                            <span className="text-2xl font-semibold hover:text-[#D247BF] transition-colors flex items-center gap-2">
                                Kushagra
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hand-metal">
                                    <path d="M18 12.5V10a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4"/>
                                    <path d="M14 11V9a2 2 0 1 0-4 0v2"/>
                                    <path d="M10 10.5V5a2 2 0 1 0-4 0v9"/>
                                    <path d="m7 15-1.76-1.76a2 2 0 0 0-2.83 2.82l3.6 3.6C7.5 21.14 9.2 22 12 22h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v5"/>
                                </svg>
                            </span>
                            <span className="text-2xl font-semibold hover:text-[#D247BF] transition-colors flex items-center gap-2">
                                Lakshya
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hand">
                                    <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/>
                                    <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/>
                                    <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/>
                                    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
                                </svg>
                            </span>
                        </div>
                        <div className="flex space-x-16 mx-8">
                            <span className="text-2xl font-semibold hover:text-[#D247BF] transition-colors flex items-center gap-2">
                                Kunal
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-signature">
                                    <path d="m21 17-2.156-1.868A.5.5 0 0 0 18 15.5v.5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1c0-2.545-3.991-3.97-8.5-4a1 1 0 0 0 0 5c4.153 0 4.745-11.295 5.708-13.5a2.5 2.5 0 1 1 3.31 3.284"/>
                                    <path d="M3 21h18"/>
                                </svg>
                            </span>
                            <span className="text-2xl font-semibold hover:text-[#D247BF] transition-colors flex items-center gap-2">
                                Kushagra
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hand-metal">
                                    <path d="M18 12.5V10a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4"/>
                                    <path d="M14 11V9a2 2 0 1 0-4 0v2"/>
                                    <path d="M10 10.5V5a2 2 0 1 0-4 0v9"/>
                                    <path d="m7 15-1.76-1.76a2 2 0 0 0-2.83 2.82l3.6 3.6C7.5 21.14 9.2 22 12 22h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v5"/>
                                </svg>
                            </span>
                            <span className="text-2xl font-semibold hover:text-[#D247BF] transition-colors flex items-center gap-2">
                                Lakshya
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hand">
                                    <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/>
                                    <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/>
                                    <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/>
                                    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
