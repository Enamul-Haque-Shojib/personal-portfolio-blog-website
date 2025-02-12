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

const ProjectDetails = async({params}) => {
    const {projectId} = params;

  
        const res = await fetch(`http://localhost:5000/api/projects/get-single-project/${projectId}`);

        const projectsData = await res.json();
        console.log(projectsData)
        const {projectName, projectImgUrl, technologies, description, github, live} = projectsData.data[0]

    return (
        <div>
           
           <Card className="w-[700px] flex">
            <AspectRatio ratio={16 / 9} className="bg-muted border">
                  <Image
                    src='https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230202143636/NEXT-js-tutorial-1.png'
                    alt="Photo by Drew Beamer"
                    fill
                    className="h-full w-full rounded-md object-cover"
                  />
                </AspectRatio>
                <div>
                <CardHeader>
        <CardTitle>{projectName}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
       {
        technologies.map((tech,inex)=> <p key={tech._id}>{tech}</p>)
       }
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">github</Button>
        <Button>Live</Button>
      </CardFooter>
                </div>
      
    </Card>
          
        </div>
        
    
    );
};

export default ProjectDetails;