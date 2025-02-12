import React from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Link from 'next/link';

const Feature = () => {
    return (
        <div className='w-[80%] mx-auto'>
            <h1>Features</h1>
            <div className=' grid grid-cols-3'>
        <Card className="w-[350px]">
      <CardHeader>
      <AspectRatio ratio={16 / 9} className="bg-muted">
      <Image
        src="https://clevercloset.co.uk/wp-content/uploads/2023/06/shutterstock_1562568346.jpg"
        alt='equipment'
        fill
        className="h-full w-full rounded-md object-cover"
      />
    </AspectRatio>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardContent>
       <p></p>
      </CardContent>
    </Card>
        <Card className="w-[350px]">
      <CardHeader>
      <AspectRatio ratio={16 / 9} className="bg-muted">
      <Image
        src="https://youth.europa.eu/sites/default/files/styles/1200x600/public/article/photo-1543269865-cbf427effbad.jpeg?itok=8o0Z9LgW"
        alt="Photo by Drew Beamer"
        fill
        className="h-full w-full rounded-md object-cover"
      />
    </AspectRatio>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardContent>
       <p></p>
      </CardContent>
    </Card>
        <Card className="w-[350px]">
      <CardHeader>
      <AspectRatio ratio={16 / 9} className="bg-muted">
      <Image
        src="https://transimpact.com/wp-content/uploads/2024/02/Blog-Inner-Page-Image.jpg"
        alt="Photo by Drew Beamer"
        fill
        className="h-full w-full rounded-md object-cover"
      />
    </AspectRatio>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardContent>
       <p></p>
      </CardContent>
    </Card>
        </div>
        <Link href='/projects'><Button>View Projects</Button></Link>
        </div>
        
    );
};

export default Feature;