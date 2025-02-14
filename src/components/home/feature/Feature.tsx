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

const projects = [
  {
    title: "Language Exchange",
    description: "Users can register as tutors or students. Tutors can add tutorials and manage bookings, while students can book tutorials as they like.",
    image: "https://www.shutterstock.com/shutterstock/videos/1111376725/thumb/7.jpg?ip=x480",
    alt: "Language Exchange platform",
  },
  {
    title: "Sports Equipment Store",
    description: "Users can add, update, delete, and view their products with a dashboard, as well as manage their profiles.",
    image: "https://www.niir.org/blog/wp-content/uploads/2023/04/Sport-EQUIP.jpg",
    alt: "Sports Equipment Store",
  },
  {
    title: "Parcel Warehouse",
    description: "Users can post parcels with weight, price, location coordinates, and booking status. Admins assign parcels to delivery personnel for tracking and delivery.",
    image: "https://transimpact.com/wp-content/uploads/2024/02/Blog-Inner-Page-Image.jpg",
    alt: "Parcel Warehouse Management",
  },
];

const Feature = () => {
  return (
    <div className='w-full max-w-7xl mx-auto px-4 py-12'>
      <h1 className='text-3xl font-bold text-center mb-8'>Featured Projects</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {projects.map((project, index) => (
          <Card key={index} className="w-full shadow-lg hover:shadow-xl transition-all">
            <CardHeader>
              <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  className="object-cover"
                />
              </AspectRatio>
              <CardTitle className='mt-4'>{project.title}</CardTitle>
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
