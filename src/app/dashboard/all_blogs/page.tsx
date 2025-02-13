// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client"

// import React, { useEffect, useState } from 'react';
// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table";
// import { Button } from '@/components/ui/button';
// import { useRouter } from 'next/navigation';


// import deleteBlog from '@/actions/deleteBlog';
// import { useToast } from '@/hooks/use-toast';

// const AllBlogs = () => {
//     const router = useRouter();
//     const { toast } = useToast();
//     const [blogsData, setBlogsData] = useState<any[]>([]); // Store fetched data
//     const [loading, setLoading] = useState<boolean>(true); // Loading state
//     const [error, setError] = useState<string | null>(null); // Error handling

//     useEffect(() => {
//         const fetchBlogs = async () => {
//             try {
//                 const res = await fetch(`http://localhost:5000/api/blogs`);
//                 if (!res.ok) throw new Error("Failed to fetch blogs");
//                 const data = await res.json();
//                 setBlogsData(data.data);
//             } catch (err: any) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchBlogs();
//     }, []);

//     const handleUpdateBlog = (id: string) => {
//         router.push(`/dashboard/all_blogs/${id}`);
//     };

//     const handleDeleteBlog = async (id: string) => {
//         try {
//             const res = await deleteBlog(id);
//             if (res.success) {
//                 setBlogsData((prev) => prev.filter((blog) => blog._id !== id));
//                 toast({ title: "Success", description: "Blog deleted successfully", variant: "default" });
//             } else {
//                 toast({ title: "Error", description: res.message, variant: "destructive" });
//             }
//         } catch (error) {
//             toast({ title: "Error", description: "Failed to delete blog", variant: "destructive" });
//         }
//     };

//     if (loading) return <p className="text-center text-gray-500">Loading blogs...</p>;
//     if (error) return <p className="text-center text-red-500">Error: {error}</p>;

//     return (
//         <div>
//             <Table>
//                 <TableCaption>A list of your recent blogs.</TableCaption>
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead className="w-[100px]">Title</TableHead>
//                         <TableHead>Content</TableHead>
//                         <TableHead className="text-right">Action</TableHead>
//                     </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                     {blogsData.map((blog) => (
//                         <TableRow key={blog._id}>
//                             <TableCell className="font-medium">{blog.title}</TableCell>
//                             <TableCell>{blog.content}</TableCell>
//                             <TableCell className="text-right space-x-2">
//                                 <Button onClick={() => handleUpdateBlog(blog._id)}>Update</Button>
//                                 <Button variant="destructive" onClick={() => handleDeleteBlog(blog._id)}>
//                                     Delete
//                                 </Button>
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </div>
//     );
// };

// export default AllBlogs;



/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import deleteBlog from "@/actions/deleteBlog";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const AllBlogs = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [blogsData, setBlogsData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/blogs`);
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        setBlogsData(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleUpdateBlog = (id: string) => {
    router.push(`/dashboard/all_blogs/${id}`);
  };

  const handleDeleteBlog = async (id: string) => {
    try {
      const res = await deleteBlog(id);
      if (res.success) {
        setBlogsData((prev) => prev.filter((blog) => blog._id !== id));
        toast({ title: "Success", description: "Blog deleted successfully", variant: "default" });
      } else {
        toast({ title: "Error", description: res.message, variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete blog", variant: "destructive" });
    }
  };

  return (
    <div className="p-6 w-full max-w-5xl mx-auto">
      <Card>
        <CardContent className="p-4">
          <h2 className="text-2xl font-semibold text-center mb-4">All Blogs</h2>
          {loading ? (
            <Skeleton className="h-32 w-full" />
          ) : error ? (
            <p className="text-center text-red-500">Error: {error}</p>
          ) : (
            <Table className="w-full overflow-x-auto">
              <TableCaption>A list of your recent blogs.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/4">Title</TableHead>
                  <TableHead className="w-1/2">Content</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogsData.map((blog) => (
                  <TableRow key={blog._id}>
                    <TableCell className="font-medium truncate max-w-xs">{blog.title}</TableCell>
                    <TableCell className="truncate max-w-md">{blog.content}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button onClick={() => handleUpdateBlog(blog._id)}>Update</Button>
                      <Button variant="destructive" onClick={() => handleDeleteBlog(blog._id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AllBlogs;

