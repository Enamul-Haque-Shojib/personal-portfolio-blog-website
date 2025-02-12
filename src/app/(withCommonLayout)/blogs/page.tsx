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
import { TBlog } from '@/actions/createBlog';

const Blogs = async() => {

  
        const res = await fetch('http://localhost:5000/api/blogs');

        const blogsData = await res.json();
  

    return (
        <div className='grid grid-cols-3 w-[80%] mx-auto gap-5'>
            {
                blogsData.data.map((blog:TBlog) => (
                    <Card className="w-[350px]" key={blog._id}>
           
            <AspectRatio ratio={16 / 9} className="bg-muted border">
      <Image
        src={blog?.blogImgUrl}
        alt="Photo by Drew Beamer"
        fill
        className="h-full w-full rounded-md object-cover"
      />
    </AspectRatio>
           
         
            <CardHeader>
          <CardTitle>{blog.title}</CardTitle>
        </CardHeader>
     
        <CardFooter className="flex justify-end">
         <Link href={`/blogs/${blog._id}`}> <Button variant="outline">Details</Button></Link>
    
        </CardFooter>
            
            
      </Card>
                ))
            }
        </div>
        
    
    );
};

export default Blogs;