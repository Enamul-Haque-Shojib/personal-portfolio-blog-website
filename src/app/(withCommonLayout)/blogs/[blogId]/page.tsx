/* eslint-disable @typescript-eslint/no-explicit-any */
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
import Link from 'next/link';




const fetchBlog = async (blogId: string) => {
  const res = await fetch(
    `https://personal-portfolio-blog-website-server.vercel.app/api/blogs/get-single-blog/${blogId}`
  );
  if (!res.ok) throw new Error("Failed to fetch blog data");
  return res.json();
};

const BlogDetails = async ({ params }: any) => {

  const { blogId } =  params;

  const blogsData = await fetchBlog(blogId);
  const { title, blogImgUrl, content } = blogsData.data[0];

  return (
    <div className="container mx-auto py-10 px-4 flex flex-col min-h-screen">
      <div className="w-[70%] mx-auto flex-grow">
        <Card className="bg-white shadow-xl rounded-lg overflow-hidden">
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <Image
              src={blogImgUrl}
              alt={title}
              fill
              className="object-cover rounded-t-lg"
            />
          </AspectRatio>

          <div className="p-6">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-900">{title}</CardTitle>
              <CardDescription className="mt-4 text-lg text-gray-700 leading-relaxed">
                <div
                  className="prose dark:prose-invert mt-4 text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </CardDescription> 

            </CardHeader>

            <CardFooter className="flex justify-between items-center mt-6">
              <Link href="/blogs">
                <Button variant="outline" className="px-6 py-2 text-sm font-semibold hover:bg-gray-100">
                  Back to Blogs
                </Button>
              </Link>
            </CardFooter>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BlogDetails;
