// import React from 'react';
 
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { AspectRatio } from "@/components/ui/aspect-ratio"
// import Image from 'next/image';
// import { TProject } from '@/actions/createProject';
// import Link from 'next/link';

// const Project = async() => {

  
//         const res = await fetch('http://localhost:5000/api/projects');

//         const projectsData = await res.json();
  

//     return (
//         <div className='grid grid-cols-3 w-[80%] mx-auto gap-5'>
//             {
//                 projectsData.data.map((project:TProject) => (
//                     <Card className="w-[350px]" key={project._id}>
           
//             <AspectRatio ratio={16 / 9} className="bg-muted border">
//       <Image
//         src={project?.projectImgUrl}
//         alt="Photo by Drew Beamer"
//         fill
//         className="h-full w-full rounded-md object-cover"
//       />
//     </AspectRatio>
           
         
//             <CardHeader>
//           <CardTitle>{project.projectName}</CardTitle>
//         </CardHeader>
     
//         <CardFooter className="flex justify-end">
//          <Link href={`/projects/${project._id}`}> <Button variant="outline">Details</Button></Link>
    
//         </CardFooter>
            
            
//       </Card>
//                 ))
//             }
//         </div>
        
    
//     );
// };

// export default Project;


import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from 'next/image';
import { TProject } from '@/actions/createProject';
import Link from 'next/link';

const fetchProjects = async () => {
  try {
    const res = await fetch('https://personal-portfolio-blog-website-server.vercel.app/api/projects', { cache: "force-cache" });
    if (!res.ok) throw new Error("Failed to fetch projects");
    return await res.json();
  } catch (error) {
    console.error(error);
    return { data: [] };
  }
};

const Project = async () => {
  const projectsData = await fetchProjects();

  return (
    <div className='max-w-7xl mx-auto px-6 py-12 flex flex-col min-h-screen'>
      <h1 className='text-4xl font-bold text-center mb-8'>Projects</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow'>
        {projectsData.data.map((project: TProject) => (
          <Card className="shadow-lg hover:shadow-xl transition-all" key={project._id}>
            <AspectRatio ratio={16 / 9} className="bg-muted border">
              <Image
                src={project?.projectImgUrl}
                alt={project.projectName}
                fill
                className="h-full w-full rounded-md object-cover"
              />
            </AspectRatio>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{project.projectName}</CardTitle>
            </CardHeader>
            <CardFooter className="flex justify-between p-4">
              <Link href={`/projects/${project._id}`}>
                <Button variant="outline" className="w-full">Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Project;
