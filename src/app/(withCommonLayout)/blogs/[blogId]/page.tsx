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

const BlogDetails = async({params}) => {
    const {blogId} = params;

  
        const res = await fetch(`http://localhost:5000/api/blogs/get-single-blog/${blogId}`);

        const blogsData = await res.json();
        console.log(blogsData)
        const {title, blogImgUrl, content} = blogsData.data[0]

    return (
        <div>
           
           <Card className="w-[700px] flex">
            <AspectRatio ratio={16 / 9} className="bg-muted border">
                  <Image
                    src={blogImgUrl}
                    alt="Photo by Drew Beamer"
                    fill
                    className="h-full w-full rounded-md object-cover"
                  />
                </AspectRatio>
                <div>
                <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{content}</CardDescription>
      </CardHeader>
      <CardContent>
       
      </CardContent>
      <CardFooter className="flex justify-between">
        
      </CardFooter>
                </div>
      
    </Card>
          
        </div>
        
    
    );
};

export default BlogDetails;