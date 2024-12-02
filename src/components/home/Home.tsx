import { Roboto_Mono } from 'next/font/google';
import Image from 'next/image';
import { FiArrowDown, FiGithub } from 'react-icons/fi';
import { FaDiscord } from "react-icons/fa"
import "./background-grid.css"
import { FaXTwitter } from 'react-icons/fa6';

const robotoMono = Roboto_Mono({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-liberation-mono'
});

const Home = () => {
    return (
        <div className={`${robotoMono.variable} min-h-screen bg-gradient-to-br from-[#37474F] to-[#263238] text-white overflow-hidden relative`}>
            {/* Background Grid Effect */}
            <div className="absolute inset-0 opacity-10 bg-grid-white/[0.05]"></div>

            <div className='px-6 py-12 relative grico'>
                {/* Header Section */}
                <div className='flex flex-col items-center text-center space-y-6 z-30 relative'>
                    {/* Logo and Title */}
                    <div className="flex items-center justify-center space-x-3">
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
                    <div className="max-w-2xl mx-auto space-y-4">
                        <h2 className="text-4xl font-bold text-white">
                            Welcome to Stable.fun
                        </h2>
                        <p className="text-base text-gray-300 leading-relaxed">
                            Launch stablecoins backed by government bonds with secure yield.
                            Join us as we revolutionize the way you interact with digital currencies!
                        </p>

                        {/* CTA Button */}
                        <div className="pt-4 w-full flex items-center justify-center mb-3 z-50">
                            <button
                                className="group flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#cbe8ff34] border border-[#cbe8ff] text-[#cbe8ff] hover:bg-[#cbe8ff]/10 transition-all duration-300 hover:scale-105 cursor-pointer"
                            >
                                Get Started
                                <FiArrowDown className="ml-2 group-hover:animate-bounce" />
                            </button>
                        </div>
                    </div>

                    {/* Stablecoin Gathering Visualization */}
                    <div className='relative w-full max-w-lg aspect-square mt-10'>
                        <div className='absolute inset-0 flex items-center justify-center'>
                            {[0, 1, 2, 3].map((index) => (
                                <div
                                    key={index}
                                    className={`
                                        absolute rounded-full overflow-hidden 
                                        w-16 h-16 
                                        animate-orbit
                                        opacity-80
                                        transition-transform duration-1000
                                        ${index === 0 ? 'orbit-1' :
                                            index === 1 ? 'orbit-2' :
                                                index === 2 ? 'orbit-3' :
                                                    'orbit-4'}
                                    `}
                                >
                                    <Image
                                        src="/spl-cetes.png"
                                        alt='cetes stable'
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}

                            {/* Central Logo */}
                            <div className="w-48 h-48 relative z-10">
                                <Image
                                    src="/stabledotfun.png"
                                    alt="Stable dot fun logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="pt-6 space-y-3">
                        <p className="text-xs text-gray-400 opacity-75 text-center">
                            Any questions? The friendliest people are here to welcome you and help you!
                        </p>
                        <div className="flex space-x-5 justify-center items-center">
                            {[
                                {
                                    Icon: FaXTwitter,
                                    href: "https://twitter.com/stabledotfun",
                                    hoverColor: "hover:text-[#1DA1F2]"
                                },
                                {
                                    Icon: FiGithub,
                                    href: "https://github.com/stablefun",
                                    hoverColor: "hover:text-[#6cc644]"
                                },
                                {
                                    Icon: FaDiscord,
                                    href: "https://discord.gg/stablefun",
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

            {/* Custom CSS for orbital animation */}
            <style jsx global>{`
                @keyframes orbit-1 {
                    0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
                    100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
                }
                @keyframes orbit-2 {
                    0% { transform: rotate(90deg) translateX(100px) rotate(-90deg); }
                    100% { transform: rotate(450deg) translateX(100px) rotate(-450deg); }
                }
                @keyframes orbit-3 {
                    0% { transform: rotate(180deg) translateX(100px) rotate(-180deg); }
                    100% { transform: rotate(540deg) translateX(100px) rotate(-540deg); }
                }
                @keyframes orbit-4 {
                    0% { transform: rotate(270deg) translateX(100px) rotate(-270deg); }
                    100% { transform: rotate(630deg) translateX(100px) rotate(-630deg); }
                }

                .orbit-1 { animation: orbit-1 10s linear infinite; }
                .orbit-2 { animation: orbit-2 10s linear infinite; }
                .orbit-3 { animation: orbit-3 10s linear infinite; }
                .orbit-4 { animation: orbit-4 10s linear infinite; }
            `}</style>
        </div>
    );
};

export default Home;
