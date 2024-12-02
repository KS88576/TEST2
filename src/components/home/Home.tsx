"use client"

import Image from 'next/image';
import Link from 'next/link';
import { FiArrowDown, FiGithub } from 'react-icons/fi';
import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from 'react-icons/fa6';
import "./background-grid.css";


const Home = () => {
    return (
        <div className={`font-mono max-h-screen bg-gradient-to-br from-[#37474F] to-[#263238] text-white relative`}>
            {/* Background Grid Effect */}
            <div className="absolute inset-0 opacity-10 bg-grid-white/[0.05]"></div>

            <div className='px-6 py-12 relative grico h-full flex flex-col justify-center items-center'>
                {/* Header Section */}
                <div className='flex flex-col items-center text-center space-y-4 z-30 relative'>
                    {/* Logo and Title */}
                    <div className="flex items-center justify-center space-x-3 animate-pulse">
                        <div className="w-14 h-14 relative">
                            <Image
                                src="/stabledotfun.png"
                                alt="Stable dot fun logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-[#00BCD4] to-white text-3xl font-bold">
                            Stable.fun
                        </h1>
                    </div>

                    {/* Hero Text */}
                    <div className="max-w-2xl space-y-4 animate-fadeIn">
                        <h2 className="text-4xl font-bold text-white">
                            Welcome to Stable.fun
                        </h2>
                        <p className="text-base text-gray-300 leading-relaxed">
                            Launch stablecoins backed by government bonds with secure yield.
                            Join us as we revolutionize the way you interact with digital currencies!
                        </p>

                        {/* CTA Button */}
                        <div className="pt-4 w-full flex items-center justify-center mb-3 z-50 animate-fadeInUp">
                        <Link href="/">
                            <button
                            className="group flex items-center justify-center px-6 py-3 rounded-lg bg-[#cbe8ff34] border border-[#cbe8ff] text-[#cbe8ff] hover:bg-[#cbe8ff]/10 transition-all duration-300 hover:scale-105 cursor-pointer"
                            >
                            Get Started
                            <FiArrowDown className="ml-2 group-hover:animate-bounce" />
                            </button>
                        </Link>
                        </div>
                    </div>
                    {/* Social Links */}
                    <div className="pt-6 space-y-3 animate-fadeInUp">
                        <p className="text-xs text-gray-400 opacity-75 text-center">
                            Any questions? The friendliest people are here to welcome you and help you!
                        </p>
                        <div className="flex space-x-5 justify-center items-center">
                            {[
                                {
                                    Icon: FaXTwitter,
                                    href: "https://x.com/heisdave7",
                                    hoverColor: "hover:text-[#1B1B1B]"
                                },
                                {
                                    Icon: FiGithub,
                                    href: "https://github.com/donjne/stabledotfun",
                                    hoverColor: "hover:text-[#1B1B1B]"
                                },
                                {
                                    Icon: FaDiscord,
                                    href: "https://discord.gg/stabledotfun",
                                    hoverColor: "hover:text-[#5865F2]"
                                }
                            ].map(({ Icon, href, hoverColor }, index) => (
                                <a
                                    key={index}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`
                                        text-gray-400 
                                        ${hoverColor} 
                                        transition-all 
                                        duration-300 
                                        hover:scale-125
                                    `}
                                >
                                    <Icon size={24} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <style jsx global>{`
                @keyframes fadeIn {
                0% { opacity: 0; }
                100% { opacity: 1; }
                }

                @keyframes fadeInUp {
                0% { opacity: 0; transform: translateY(20px); }
                100% { opacity: 1; transform: translateY(0); }
                }

                @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
                }

                .animate-fadeIn {
                animation: fadeIn 1s ease-in-out;
                }

                .animate-fadeInUp {
                animation: fadeInUp 1s ease-in-out;
                }

                .animate-pulse {
                animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
        </div>
    );
};

export default Home;