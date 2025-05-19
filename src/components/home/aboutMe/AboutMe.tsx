// import React from 'react';

// const AboutMe = () => {
//     return (
//         <div>
//             <div className="py-20 text-black" id="about">
//         <div className="w-[90%] mx-auto max-w-4xl text-center">
//             <h1 className="text-4xl md:text-5xl font-bold">About Me</h1>
//             <div className="mt-6 p-6 md:p-10 rounded-xl">
//                 <p className="text-lg md:text-xl leading-relaxed text-black">
//                     I am a passionate <span className="text-red-400 font-semibold">Frontend Developer</span> with a knack for crafting seamless and interactive web applications. With expertise in <span className="text-red-400 font-semibold">React.js, React Router DOM, JavaScript,</span> and <span className="text-red-400 font-semibold">Tailwind CSS</span>, I build intuitive and visually stunning user experiences.
//                 </p>
//                 <p className="mt-4 text-lg md:text-xl leading-relaxed text-black">
//                     Beyond the frontend, I bring full-stack capabilities with <span className="text-red-400 font-semibold">Express.js</span> and <span className="text-red-400 font-semibold">MongoDB</span>, ensuring robust and scalable solutions. I thrive on turning ideas into dynamic web applications that are not only functional but also engaging.
//                 </p>
//                 <p className="mt-4 text-lg md:text-xl leading-relaxed text-black">
//                     Driven by curiosity and a love for clean code, I am always exploring new technologies to push the boundaries of web development. <span className="text-red-400 font-semibold">Let`s build something amazing together!</span>
//                 </p>
//             </div>
//         </div>
//     </div>
//         </div>
//     );
// };

// export default AboutMe;


'use client';

import React from 'react';
import * as framer from 'framer-motion';

const motion = framer.motion;

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const wordAnim = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

const Highlight = ({ children }: { children: React.ReactNode }) => (
  <motion.span
    className="text-red-400 font-semibold"
    variants={wordAnim}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
  >
    {children}
  </motion.span>
);

const AboutMe = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
    >
      <div className="py-20 text-black" id="about">
        <div className="w-[90%] mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold">About Me</h1>
          <motion.div
            className="mt-6 p-6 md:p-10 rounded-xl"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <p className="text-lg md:text-xl leading-relaxed text-black">
              I am a passionate <Highlight>Frontend Developer</Highlight> with a knack for crafting seamless and interactive web applications. With expertise in <Highlight>React.js</Highlight>, <Highlight>React Router DOM</Highlight>, <Highlight>JavaScript</Highlight>, and <Highlight>Tailwind CSS</Highlight>, I build intuitive and visually stunning user experiences.
            </p>
            <p className="mt-4 text-lg md:text-xl leading-relaxed text-black">
              Beyond the frontend, I bring full-stack capabilities with <Highlight>Express.js</Highlight> and <Highlight>MongoDB</Highlight>, ensuring robust and scalable solutions. I thrive on turning ideas into dynamic web applications that are not only functional but also engaging.
            </p>
            <p className="mt-4 text-lg md:text-xl leading-relaxed text-black">
              Driven by curiosity and a love for clean code, I am always exploring new technologies to push the boundaries of web development. <Highlight>Let’s build something amazing together!</Highlight>
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutMe;
