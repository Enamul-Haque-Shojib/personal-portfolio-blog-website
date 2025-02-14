/* eslint-disable @typescript-eslint/no-unused-vars */


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
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import deleteSkill from "@/actions/deleteSkill";
import { Loader2 } from "lucide-react";

const ALLSkills = () => {
    const { toast } = useToast();
    const router = useRouter();
    const [skillsData, setSkillsData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await fetch("https://personal-portfolio-blog-website-server.vercel.app/api/skills");
                if (!res.ok) throw new Error("Failed to fetch skills");
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

    const handleDeleteSkill = async (id: string) => {
        try {
            const res = await deleteSkill(id);
            if (res.success) {
                setSkillsData((prev) => prev.filter((skill) => skill._id !== id));
                toast({ title: "Success", description: "Skill deleted successfully!" });
            } else {
                toast({ variant: "destructive", title: "Error", description: "Failed to delete skill." });
            }
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to delete skill." });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <Loader2 className="animate-spin text-gray-500" size={32} />
            </div>
        );
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }

    return (
        <Card className="mx-auto w-full max-w-4xl p-4">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-center">Skill List</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption className="text-gray-500">Manage your skills efficiently</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-1/2">Title</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {skillsData.map((skill) => (
                            <TableRow key={skill._id}>
                                <TableCell className="font-medium">{skill.title}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleUpdateSkill(skill._id)}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDeleteSkill(skill._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default ALLSkills;

