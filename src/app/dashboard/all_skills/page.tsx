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


// import deleteSkill from '@/actions/deleteSkill';
// import { useToast } from '@/hooks/use-toast';


// const ALLSkills = () => {
//     const { toast } = useToast();
//     const router = useRouter();
//     const [skillsData, setSkillsData] = useState<any[]>([]); // Store fetched data
//     const [loading, setLoading] = useState<boolean>(true); // Loading state
//     const [error, setError] = useState<string | null>(null); // Error handling

//     useEffect(() => {
//         const fetchSkills = async () => {
//             try {
//                 const res = await fetch(`http://localhost:5000/api/skills`);
//                 if (!res.ok) throw new Error("Failed to fetch blogs");
//                 const data = await res.json();
//                 setSkillsData(data.data);
//             } catch (err: any) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchSkills();
//     }, []);

//     const handleUpdateSkill = (id: string) => {
//         router.push(`/dashboard/all_skills/${id}`);
//     };
//     const handleDeleteSkill = async(id: string) => {
//         try {
//             const res = await deleteSkill(id);
//             if (res.success) {
//                 // Remove deleted project from UI
//                 setSkillsData((prev) => prev.filter((skill) => skill._id !== id));
//                 toast({ title: "Success", description: "Skill deleted successfully!" });
//             } else {
//                 console.error("Error deleting project:", res.message);
//                 toast({ variant: "destructive", title: "Error", description: "Failed to delete skill." });
//             }
//         } catch (error) {
//             console.error("Failed to delete project:", error);
//             toast({ variant: "destructive", title: "Error", description: "Failed to delete skill." });
            
//         }
//     }

//     if (loading) return <p className="text-center text-gray-500">Loading blogs...</p>;
//     if (error) return <p className="text-center text-red-500">Error: {error}</p>;

//     return (
//         <div>
//             <Table>
//                 <TableCaption>A list of your recent titles.</TableCaption>
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead className="w-[100px]">Title</TableHead>
                       
                      
//                         <TableHead className="text-right">Action</TableHead>
//                     </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                     {skillsData.map((skill) => (
//                         <TableRow key={skill._id}>
//                             <TableCell className="font-medium">{skill.title}</TableCell>
                      
                            
//                             <TableCell className="text-right space-x-2">
//                                 <Button onClick={() => handleUpdateSkill(skill._id)}>Update</Button>
//                                 <Button variant="destructive" 
//                                 onClick={()=>{handleDeleteSkill(skill._id)}}
//                                 >Delete</Button>
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </div>
//     );
// };

// export default ALLSkills;




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
                const res = await fetch("http://localhost:5000/api/skills");
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

