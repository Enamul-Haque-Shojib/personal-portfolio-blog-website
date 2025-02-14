

import AboutMe from '@/components/home/aboutMe/AboutMe';
import Banner from '@/components/home/banner/Banner';
import Feature from '@/components/home/feature/Feature';

import Skills from '@/components/home/skills/Skills';


import React from 'react';

const HomePage = () => {
  
 
  return (
    <div className='flex flex-col min-h-screen'>
      <main className='flex-grow'>
      <Banner></Banner>
      <AboutMe></AboutMe>
      <Skills></Skills>
      <Feature></Feature>

      </main>
    </div>
  );
};

export default HomePage;