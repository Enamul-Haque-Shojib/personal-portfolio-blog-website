'use server';

import Image from 'next/image';
import React from 'react';
import Marquee from 'react-fast-marquee';
import { Skeleton } from "@/components/ui/skeleton";

async function fetchSkills() {
  try {
    const res = await fetch('https://personal-portfolio-blog-website-server.vercel.app/api/skills', { cache: "force-cache" });
    if (!res.ok) throw new Error("Failed to fetch skills");
    const data = await res.json();
    return data?.data || [];
  } catch (err) {
    console.error(err);
    return null;
  }
}

const Skills = async () => {
  const skillsData = await fetchSkills();

  return (
    <div className='w-full max-w-6xl mx-auto px-4 py-12 text-center'>
      <h1 className='text-3xl font-bold mb-6'>Skills</h1>
      {!skillsData ? (
        <p className='text-red-500'>Failed to load skills.</p>
      ) : skillsData.length === 0 ? (
        <div className='flex justify-center space-x-4'>
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className='w-24 h-24 rounded-full' />
          ))}
        </div>
      ) : (
        <Marquee autoFill={true} className='py-4'>
          {skillsData.map((imgMarq:{title:string, skillImgUrl: string, _id: string}) => (
            <div key={imgMarq._id} className='mx-4'>
              <Image
                src={imgMarq.skillImgUrl}
                alt='skill'
                width={100}
                height={100}
                className='rounded-full shadow-md hover:scale-110 transition-transform duration-300'
              />
            </div>
          ))}
        </Marquee>
      )}
    </div>
  );
};

export default Skills;
