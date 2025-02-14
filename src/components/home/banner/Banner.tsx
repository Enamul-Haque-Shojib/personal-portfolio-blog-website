import Image from 'next/image';
import React from 'react';
import profile from '../../../assets/profile.png'

const Banner = () => {
    return (
        <div>
            <div className="py-20" id="header">
        <div className="flex flex-col md:flex-row justify-evenly items-center w-[90%] mx-auto">
            
            <div className="text-center md:text-left space-y-5">
                <h1 className="text-4xl md:text-6xl font-bold text-black">
                    Hi, I`m <span className="text-[#ff004f]">Enamul Haque</span>
                    <br/> From Bangladesh
                </h1>
                <p className="text-xl md:text-4xl font-semibold min-h-[60px]">
                    <span id="typing-text" className="text-[#ff004f]">Fullstack Developer</span>
                </p>
                <div className="flex justify-center md:justify-start space-x-4 mt-5">
                    <a href="https://www.linkedin.com/in/enamul-haque-shojib-b1a738173/" target="_blank" className="text-4xl text-blue-600 hover:text-blue-800 transition">
                        <i className="fa-brands fa-linkedin"></i>
                    </a>
                    <a href="https://github.com/Enamul-Haque-Shojib" target="_blank" className="text-4xl text-gray-300 hover:text-white transition">
                        <i className="fa-brands fa-github"></i>
                    </a>
                </div>
                <div className="mt-5">
                    <button className="bg-[#ff004f] px-6 py-3 rounded-lg text-xl font-semibold text-white hover:bg-red-700 transition">
                        Download Resume
                    </button>
                </div>
            </div>
            
            <div className="mt-10 md:mt-0">
                <Image src={profile} width={500} height={500} alt="Enamul Haque" className="md:w-80 rounded-full"/>
            </div>
        </div>
    </div>
        </div>
    );
};

export default Banner;