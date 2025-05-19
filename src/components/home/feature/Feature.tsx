import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from 'next/image';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from 'next/link';



const fetchProjects = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/projects/get-feature-projects', { cache: "force-cache" });
    if (!res.ok) throw new Error("Failed to fetch projects");
    return await res.json();
  } catch (error) {
    console.error(error);
    return { data: [] };
  }
};

const Feature = async() => {

  type TProject = {
  _id: string;
  projectName: string;
  projectImgUrl: string;
  description: string;
  // Add other fields if needed
};
  
  const projects: { data: TProject[] } = await fetchProjects() || { data: [] };

  


  
  return (
    <div className='w-full max-w-7xl mx-auto px-4 py-12'>
      <h1 className='text-3xl font-bold text-center mb-8'>Featured Projects</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {projects?.data?.map((project:TProject) => (
          <Card key={project._id} className="w-full shadow-lg hover:shadow-xl transition-all">
            <CardHeader>
              <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
                <Image
                  src={project.projectImgUrl}
                  alt={project.projectName}
                  fill
                  className="object-cover"
                />
              </AspectRatio>
              <CardTitle className='mt-4'>{project.projectName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>{project.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className='flex justify-center mt-10'>
        <Link href='/projects'>
          <Button className='px-6 py-2 text-lg'>View All Projects</Button>
        </Link>
      </div>
    </div>
  );
};

export default Feature;
