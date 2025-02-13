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
// import deleteProject from '@/actions/deleteProject';
// import { useToast } from '@/hooks/use-toast';


// const AllProjects = () => {
//     const { toast } = useToast();
//     const router = useRouter();
//     const [projectsData, setProjectsData] = useState<any[]>([]); // Store fetched data
//     const [loading, setLoading] = useState<boolean>(true); // Loading state
//     const [error, setError] = useState<string | null>(null); // Error handling


//     useEffect(() => {
//         const fetchProjects = async () => {
//             try {
//                 const res = await fetch('http://localhost:5000/api/projects');
//                 if (!res.ok) throw new Error("Failed to fetch projects");
//                 const data = await res.json();
//                 setProjectsData(data.data);
//             } catch (err: any) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProjects();
//     }, []);

//     const handleUpdateProject = (id: string) => {
//         router.push(`/dashboard/all_projects/${id}`);
//     };
//     const handleDeleteProject = async(id: string) => {
//         try {
//             const res = await deleteProject(id);
//             if (res.success) {
//                 // Remove deleted project from UI
//                 setProjectsData((prev) => prev.filter((project) => project._id !== id));
//                 toast({ title: "Success", description: "Project deleted successfully!" });
//             } else {
//                 console.error("Error deleting project:", res.message);
//             }
//         } catch (error) {
//             console.error("Failed to delete project:", error);
//             toast({ variant: "destructive", title: "Error", description: "Failed to delete project." });
//         }
//     }

//     if (loading) return <p className="text-center text-gray-500">Loading projects...</p>;
//     if (error) return <p className="text-center text-red-500">Error: {error}</p>;

//     return (
//         <div>
//             <Table>
//                 <TableCaption>A list of your recent projects.</TableCaption>
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead className="w-[100px]">Project Name</TableHead>
//                         <TableHead>Description</TableHead>
//                         <TableHead>Technologies</TableHead>
//                         <TableHead className="text-right">Action</TableHead>
//                     </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                     {projectsData.map((project) => (
//                         <TableRow key={project._id}>
//                             <TableCell className="font-medium">{project.projectName}</TableCell>
//                             <TableCell>{project.description}</TableCell>
//                             <TableCell>
//                                 {project.technologies.map((tech: string, index: number) => (
//                                     <span key={index} className="mr-2 px-2 py-1 bg-gray-700 text-white rounded-md">
//                                         {tech}
//                                     </span>
//                                 ))}
//                             </TableCell>
//                             <TableCell className="text-right space-x-2">
//                                 <Button onClick={() => handleUpdateProject(project._id)}>Update</Button>
//                                 <Button variant="destructive" 
//                                 onClick={()=>{handleDeleteProject(project._id)}}
//                                 >Delete</Button>
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </div>
//     );
// };

// export default AllProjects;


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
import deleteProject from "@/actions/deleteProject";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const AllProjects = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [projectsData, setProjectsData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/projects");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjectsData(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleUpdateProject = (id: string) => {
    router.push(`/dashboard/all_projects/${id}`);
  };

  const handleDeleteProject = async (id: string) => {
    try {
      const res = await deleteProject(id);
      if (res.success) {
        setProjectsData((prev) => prev.filter((project) => project._id !== id));
        toast({ title: "Success", description: "Project deleted successfully!" });
      } else {
        toast({ variant: "destructive", title: "Error", description: res.message });
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to delete project." });
    }
  };

  return (
    <div className="p-6 w-full max-w-5xl mx-auto">
      <Card>
        <CardContent className="p-4">
          <h2 className="text-2xl font-semibold text-center mb-4">All Projects</h2>
          {loading ? (
            <Skeleton className="h-32 w-full" />
          ) : error ? (
            <p className="text-center text-red-500">Error: {error}</p>
          ) : (
            <Table className="w-full overflow-x-auto">
              <TableCaption>A list of your recent projects.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/4">Project Name</TableHead>
                 
                  <TableHead>Technologies</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectsData.map((project) => (
                  <TableRow key={project._id}>
                    <TableCell className="font-medium">{project.projectName}</TableCell>
                  
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech: string, index: number) => (
                          <span
                            key={index}
                            className="bg-gray-700 text-white px-2 py-1 text-xs rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button onClick={() => handleUpdateProject(project._id)}>Update</Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteProject(project._id)}
                      >
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

export default AllProjects;






