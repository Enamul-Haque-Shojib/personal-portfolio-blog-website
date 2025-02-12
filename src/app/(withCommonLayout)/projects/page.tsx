import React from 'react';
 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from 'next/image';
import { TProject } from '@/actions/createProject';
import Link from 'next/link';

const Project = async() => {

  
        const res = await fetch('http://localhost:5000/api/projects');

        const projectsData = await res.json();
  

    return (
        <div className='grid grid-cols-3 w-[80%] mx-auto gap-5'>
            {
                projectsData.data.map((project:TProject) => (
                    <Card className="w-[350px]" key={project._id}>
           
            <AspectRatio ratio={16 / 9} className="bg-muted border">
      <Image
        src={project?.projectImgUrl}
        alt="Photo by Drew Beamer"
        fill
        className="h-full w-full rounded-md object-cover"
      />
    </AspectRatio>
           
         
            <CardHeader>
          <CardTitle>{project.projectName}</CardTitle>
        </CardHeader>
     
        <CardFooter className="flex justify-end">
         <Link href={`/projects/${project._id}`}> <Button variant="outline">Details</Button></Link>
    
        </CardFooter>
            
            
      </Card>
                ))
            }
        </div>
        
    
    );
};

export default Project;