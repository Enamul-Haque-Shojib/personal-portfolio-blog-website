// import Image from 'next/image';
// import React from 'react';
// import profile from '../../../assets/EnamulHaque.png'
// import { ImGithub } from "react-icons/im";
// import { GrLinkedin } from "react-icons/gr";
// import Link from 'next/link';


// const Banner = () => {
//     return (
//         <div>
//             <div className="py-20" id="header">
//         <div className="flex flex-col md:flex-row justify-evenly items-center w-[90%] mx-auto">
            
//             <div className="text-center md:text-left space-y-5">
//                 <h1 className="text-4xl md:text-5xl font-bold text-black">
//                     Hi, I`m <span className="text-[#ff004f]">Enamul Haque</span>
//                     <br/> From Bangladesh
//                 </h1>
//                 <p className="text-xl md:text-4xl font-semibold min-h-[60px]">
//                     <span id="typing-text" className="text-[#ff004f]">Fullstack Developer</span>
//                 </p>
//                 <div className="flex justify-center md:justify-start space-x-4 mt-5">
//                     <Link href="https://www.linkedin.com/in/enamul-haque-shojib-b1a738173/" target="_blank" className="text-4xl text-blue-600 hover:text-blue-800 transition">
//                     <GrLinkedin />
//                     </Link>
//                     <Link href="https://github.com/Enamul-Haque-Shojib" target="_blank" className="text-4xl text-gray-300 hover:text-white transition">
//                     <ImGithub className='text-black' />
//                     </Link>
//                 </div>
//                 <div className="mt-5">
//                     <button className="bg-[#ff004f] px-6 py-3 rounded-lg text-xl font-semibold text-white hover:bg-red-700 transition">
//                         Download Resume
//                     </button>
//                 </div>
//             </div>
            
//             <div className="mt-10 md:mt-0">
//                 <Image src={profile} width={500} height={500} alt="Enamul Haque" className="md:w-80 rounded-full"/>
//             </div>
//         </div>
//     </div>
//         </div>
//     );
// };

// export default Banner;

'use client';

import Image from 'next/image';
import React from 'react';
import profile from '../../../assets/EnamulHaque.png';
import { ImGithub } from "react-icons/im";
import { GrLinkedin } from "react-icons/gr";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';


const Banner = () => {
    return (
        <div className="py-20" id="header">
            <div className="flex flex-col md:flex-row justify-evenly items-center w-[90%] mx-auto">

                {/* Left Content */}
                <motion.div 
                    className="text-center md:text-left space-y-5"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-black">
                        Hi, I`m <span className="text-[#ff004f]">Enamul Haque</span>
                        <br /> From Bangladesh
                    </h1>
                    {/* <p className="text-xl md:text-4xl font-semibold min-h-[60px]">
                        <span id="typing-text" className="text-[#ff004f]">Fullstack Developer</span>
                    </p> */}
                    <TypeAnimation
                        sequence={[
                            'Fullstack Developer', 2000,
                            'MERN Stack Developer', 2000,
                            'React.js | Next.js', 2000,
                            'Express.js | MongoDB', 2000,
                        ]}
                        wrapper="p"
                        speed={50}
                        repeat={Infinity}
                        className="text-xl md:text-4xl font-semibold min-h-[60px] text-[#ff004f]"
                    />

                    {/* Social Icons */}
                    <motion.div 
                        className="flex justify-center md:justify-start space-x-4 mt-5"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <Link href="https://www.linkedin.com/in/enamul-haque-shojib-b1a738173/" target="_blank" className="text-4xl text-blue-600 hover:text-blue-800 transition">
                            <GrLinkedin />
                        </Link>
                        <Link href="https://github.com/Enamul-Haque-Shojib" target="_blank" className="text-4xl text-gray-300 hover:text-white transition">
                            <ImGithub className='text-black' />
                        </Link>
                    </motion.div>

                    {/* Resume Button */}
                    <motion.div 
                        className="mt-5"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                    >
                       
                        <a
                        href="/resume.pdf"
                        download
                        className="bg-[#ff004f] px-6 py-3 rounded-lg text-xl font-semibold text-white hover:bg-red-700 transition inline-block"
                        >
                        Download Resume
                        </a>

                    </motion.div>
                </motion.div>

                {/* Right Image */}
                <motion.div
                    className="mt-10 md:mt-0"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <Image src={profile} width={500} height={500} alt="Enamul Haque" className="md:w-80 rounded-full shadow-lg shadow-red-100" />
                </motion.div>
            </div>
        </div>
    );
};

export default Banner;
