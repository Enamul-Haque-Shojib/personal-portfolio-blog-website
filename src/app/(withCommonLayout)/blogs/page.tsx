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
// import { TBlog } from '@/actions/createBlog';

// const Blogs = async() => {

  
//         const res = await fetch('http://localhost:5000/api/blogs');

//         const blogsData = await res.json();
  

//     return (
//         <div className='grid grid-cols-3 w-[80%] mx-auto gap-5'>
//             {
//                 blogsData.data.map((blog:TBlog) => (
//                     <Card className="w-[350px]" key={blog._id}>
           
//             <AspectRatio ratio={16 / 9} className="bg-muted border">
//       <Image
//         src={blog?.blogImgUrl}
//         alt="Photo by Drew Beamer"
//         fill
//         className="h-full w-full rounded-md object-cover"
//       />
//     </AspectRatio>
           
         
//             <CardHeader>
//           <CardTitle>{blog.title}</CardTitle>
//         </CardHeader>
     
//         <CardFooter className="flex justify-end">
//          <Link href={`/blogs/${blog._id}`}> <Button variant="outline">Details</Button></Link>
    
//         </CardFooter>
            
            
//       </Card>
//                 ))
//             }
//         </div>
        
    
//     );
// };

// export default Blogs;


import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,

  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from 'next/image';
import { TBlog } from '@/actions/createBlog';
import Link from 'next/link';

const Blogs = async () => {
  const res = await fetch('https://personal-portfolio-blog-website-server.vercel.app/api/blogs',{ cache: "force-cache" });
  const blogsData = await res.json();

  return (
    <div className='container mx-auto py-10 flex flex-col min-h-screen'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow'>
        {
          blogsData.data.map((blog: TBlog) => (
            <Card className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 duration-300" key={blog._id}>
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <Image
                  src={blog?.blogImgUrl}
                  alt={blog.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </AspectRatio>

              <CardHeader className="p-4">
                <CardTitle className="text-lg font-semibold text-gray-800">{blog.title}</CardTitle>
                <CardDescription className="mt-2 text-sm text-gray-500">
                 
                  <div
                    className="prose dark:prose-invert mt-4 text-lg leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                </CardDescription>
              </CardHeader>

              <CardFooter className="flex justify-between items-center p-4">
                <Link href={`/blogs/${blog._id}`}>
                  <Button variant="outline" className="text-sm px-4 py-2 hover:bg-gray-100">Read More</Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        }
      </div>
    </div>
  );
};

export default Blogs;
