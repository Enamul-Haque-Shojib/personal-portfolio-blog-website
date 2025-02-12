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


import deleteSkill from '@/actions/deleteSkill';


const ALLSkills = () => {
    const router = useRouter();
    const [skillsData, setSkillsData] = useState<any[]>([]); // Store fetched data
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error handling

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/skills`);
                if (!res.ok) throw new Error("Failed to fetch blogs");
                const data = await res.json();
                setSkillsData(data.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSkills();
    }, []);

    const handleUpdateSkill = (id: string) => {
        router.push(`/dashboard/all_skills/${id}`);
    };
    const handleDeleteSkill = async(id: string) => {
        try {
            const res = await deleteSkill(id);
            if (res.success) {
                // Remove deleted project from UI
                setSkillsData((prev) => prev.filter((skill) => skill._id !== id));
            } else {
                console.error("Error deleting project:", res.message);
            }
        } catch (error) {
            console.error("Failed to delete project:", error);
        }
    }

    if (loading) return <p className="text-center text-gray-500">Loading blogs...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent titles.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Title</TableHead>
                       
                      
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {skillsData.map((skill) => (
                        <TableRow key={skill._id}>
                            <TableCell className="font-medium">{skill.title}</TableCell>
                      
                            
                            <TableCell className="text-right space-x-2">
                                <Button onClick={() => handleUpdateSkill(skill._id)}>Update</Button>
                                <Button variant="destructive" 
                                onClick={()=>{handleDeleteSkill(skill._id)}}
                                >Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ALLSkills;
