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

import deleteBlog from '@/actions/deleteBlog';
import deleteContact from '@/actions/deleteContact';


const AllContactInfo = () => {
    const router = useRouter();
    const [contactInfosData, setContactInfosData] = useState<any[]>([]); // Store fetched data
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error handling

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/contactinfo`);
                if (!res.ok) throw new Error("Failed to fetch contact info");
                const data = await res.json();
                setContactInfosData(data.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

  
    const handleDeleteContact = async(id: string) => {
        const res = await deleteContact(id);
        console.log(res)
    }

    if (loading) return <p className="text-center text-gray-500">Loading blogs...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent titles.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Message</TableHead>
                      
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {contactInfosData.map((info) => (
                        <TableRow key={info._id}>
                            <TableCell className="font-medium">{info.name}</TableCell>
                            <TableCell>{info.email}</TableCell>
                            <TableCell>{info.message}</TableCell>
                            
                            <TableCell className="text-right space-x-2">
                               
                                <Button variant="destructive" 
                                onClick={()=>{handleDeleteContact(info._id)}}
                                >Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AllContactInfo;
