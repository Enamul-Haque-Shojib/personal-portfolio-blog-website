import React from 'react';

const AboutMe = () => {
    return (
        <div>
            <div className="py-20 bg-gray-900 text-white" id="about">
        <div className="w-[90%] mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold">About Me</h1>
            <div className="mt-6 p-6 md:p-10 rounded-xl shadow-lg">
                <p className="text-lg md:text-xl leading-relaxed text-gray-300">
                    I am a passionate <span className="text-red-400 font-semibold">Frontend Developer</span> with a knack for crafting seamless and interactive web applications. With expertise in <span className="text-red-400 font-semibold">React.js, React Router DOM, JavaScript,</span> and <span className="text-red-400 font-semibold">Tailwind CSS</span>, I build intuitive and visually stunning user experiences.
                </p>
                <p className="mt-4 text-lg md:text-xl leading-relaxed text-gray-300">
                    Beyond the frontend, I bring full-stack capabilities with <span className="text-red-400 font-semibold">Express.js</span> and <span className="text-red-400 font-semibold">MongoDB</span>, ensuring robust and scalable solutions. I thrive on turning ideas into dynamic web applications that are not only functional but also engaging.
                </p>
                <p className="mt-4 text-lg md:text-xl leading-relaxed text-gray-300">
                    Driven by curiosity and a love for clean code, I am always exploring new technologies to push the boundaries of web development. <span className="text-red-400 font-semibold">Let`s build something amazing together!</span>
                </p>
            </div>
        </div>
    </div>
        </div>
    );
};

export default AboutMe;