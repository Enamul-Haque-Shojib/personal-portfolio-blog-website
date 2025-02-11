

import AboutMe from '@/components/home/aboutMe/AboutMe';
import Banner from '@/components/home/banner/Banner';

import Skills from '@/components/home/skills/Skills';
// import { Button } from '@/components/ui/button';
// import { useRouter } from 'next/navigation';

import React from 'react';

const HomePage = () => {
  // const router = useRouter();
  // const handleDashboard=()=>{
  //   router.push('/dashboard');
  // }
  return (
    <div>
      {/* <Button onClick={handleDashboard}>Dashboard</Button> */}
      <Banner></Banner>
      <AboutMe></AboutMe>
      <Skills></Skills>

    </div>
  );
};

export default HomePage;