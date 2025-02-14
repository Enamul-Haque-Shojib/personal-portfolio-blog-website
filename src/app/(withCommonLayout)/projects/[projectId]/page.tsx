/* eslint-disable @typescript-eslint/no-explicit-any */


import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from 'next/image';
import Link from 'next/link';

const fetchProjectDetails = async (projectId:string) => {
  try {
    const res = await fetch(`https://personal-portfolio-blog-website-server.vercel.app/api/projects/get-single-project/${projectId}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch project details");
    const data = await res.json();
    return data?.data[0] || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const ProjectDetails = async ({ params }: any) => {

  const { projectId } = params;
  const project = await fetchProjectDetails(projectId);

  if (!project) {
    return <p className='text-center text-red-500'>Project not found.</p>;
  }

  const { projectName, projectImgUrl, technologies, description, github, live } = project;

  return (
    <div className='max-w-5xl mx-auto px-6 py-12 flex flex-col min-h-screen'>
      <Card className="flex flex-col lg:flex-row shadow-lg hover:shadow-xl transition-all overflow-hidden flex-grow">
        <div className="lg:w-1/2 p-5">
          <AspectRatio ratio={16 / 9} className="bg-muted border">
            <Image
              src={projectImgUrl}
              alt={projectName}
              fill
              className="h-full w-full rounded-md object-cover"
            />
          </AspectRatio>
        </div>
        <div className="p-6 lg:w-1/2 flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{projectName}</CardTitle>
            <CardDescription className="mt-2 text-gray-600">{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold mb-2">Technologies Used:</h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech:string, index:number) => (
                <span key={index} className="bg-gray-200 px-3 py-1 rounded-md text-sm">{tech}</span>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex gap-4 mt-4">
            <Link href={github} target="_blank">
              <Button variant="outline">GitHub</Button>
            </Link>
            <Link href={live} target="_blank">
              <Button>Live</Button>
            </Link>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};

export default ProjectDetails;
