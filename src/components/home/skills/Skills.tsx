

import Image from 'next/image';
import React from 'react';
import Marquee from 'react-fast-marquee';


const Skills = async() => {
    const res = await fetch('http://localhost:5000/api/skills',
    {
        // cache: "force-cache",
        // next: {
        //     revalidate: 5
        // }
        // cache: "no-store",
    }
    );
    const skillsData = await res.json();
  
    return (
    <div>
    <Marquee autoFill={true}>
    {skillsData?.data.map((imgMarq : {_id: string, skillImgUrl: string}) => (
        
        <Image
        key={imgMarq._id}
        src={imgMarq.skillImgUrl}
        alt='skill'
        width={100}
        height={100}
        />
        ))
    }
    </Marquee>
</div>
    );
};

export default Skills;