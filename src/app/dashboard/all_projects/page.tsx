/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import deleteProject from '@/actions/deleteProject';


const AllProjects = () => {
    const router = useRouter();
    const [projectsData, setProjectsData] = useState<any[]>([]); // Store fetched data
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error handling

    console.log(process.env.BACKEND_URL)
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/projects');
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
    const handleDeleteProject = async(id: string) => {
        const res = await deleteProject(id);
        console.log(res)
    }

    if (loading) return <p className="text-center text-gray-500">Loading projects...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent projects.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Project Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Technologies</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {projectsData.map((project) => (
                        <TableRow key={project._id}>
                            <TableCell className="font-medium">{project.projectName}</TableCell>
                            <TableCell>{project.description}</TableCell>
                            <TableCell>
                                {project.technologies.map((tech: string, index: number) => (
                                    <span key={index} className="mr-2 px-2 py-1 bg-gray-700 text-white rounded-md">
                                        {tech}
                                    </span>
                                ))}
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button onClick={() => handleUpdateProject(project._id)}>Update</Button>
                                <Button variant="destructive" 
                                onClick={()=>{handleDeleteProject(project._id)}}
                                >Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AllProjects;
