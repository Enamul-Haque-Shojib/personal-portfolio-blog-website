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
// import deleteContact from '@/actions/deleteContact';


// const AllContactInfo = () => {
//     const router = useRouter();
//     const [contactInfosData, setContactInfosData] = useState<any[]>([]); // Store fetched data
//     const [loading, setLoading] = useState<boolean>(true); // Loading state
//     const [error, setError] = useState<string | null>(null); // Error handling

//     useEffect(() => {
//         const fetchMessages = async () => {
//             try {
//                 const res = await fetch(`http://localhost:5000/api/contactinfo`);
//                 if (!res.ok) throw new Error("Failed to fetch contact info");
//                 const data = await res.json();
//                 setContactInfosData(data.data);
//             } catch (err: any) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchMessages();
//     }, []);

  
//     const handleDeleteContact = async(id: string) => {
     
//         try {
//             const res = await deleteContact(id);
//             if (res.success) {
//                 // Remove deleted project from UI
//                 setContactInfosData((prev) => prev.filter((info) => info._id !== id));
//             } else {
//                 console.error("Error deleting project:", res.message);
//             }
//         } catch (error) {
//             console.error("Failed to delete project:", error);
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
//                         <TableHead className="w-[100px]">Name</TableHead>
//                         <TableHead>Email</TableHead>
//                         <TableHead>Message</TableHead>
                      
//                         <TableHead className="text-right">Action</TableHead>
//                     </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                     {contactInfosData.map((info) => (
//                         <TableRow key={info._id}>
//                             <TableCell className="font-medium">{info.name}</TableCell>
//                             <TableCell>{info.email}</TableCell>
//                             <TableCell>{info.message}</TableCell>
                            
//                             <TableCell className="text-right space-x-2">
                               
//                                 <Button variant="destructive" 
//                                 onClick={()=>{handleDeleteContact(info._id)}}
//                                 >Delete</Button>
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </div>
//     );
// };

// export default AllContactInfo;



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

import deleteContact from "@/actions/deleteContact";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const AllContactInfo = () => {
    const { toast } = useToast();
  const [contactInfosData, setContactInfosData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleDeleteContact = async (id: string) => {
    try {
      const res = await deleteContact(id);
      if (res.success) {
        setContactInfosData((prev) => prev.filter((info) => info._id !== id));
        toast({ title: "Success", description: "contact deleted successfully", variant: "default" });
      } else {
        console.error("Error deleting contact info:", res.message);
        toast({ title: "Error", description: res.message, variant: "destructive" });
      }
    } catch (error) {
      console.error("Failed to delete contact info:", error);
      toast({ title: "Error", description: "Failed to delete contact", variant: "destructive" });
    }
  };

  return (
    <div className="p-6 w-full max-w-5xl mx-auto">
      <Card>
        <CardContent className="p-4">
          <h2 className="text-2xl font-semibold text-center mb-4">All Contact Information</h2>
          {loading ? (
            <Skeleton className="h-32 w-full" />
          ) : error ? (
            <p className="text-center text-red-500">Error: {error}</p>
          ) : (
            <Table className="w-full overflow-x-auto">
              <TableCaption>A list of recent contact messages.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/4">Name</TableHead>
                  <TableHead className="w-1/4">Email</TableHead>
                  <TableHead className="w-1/2">Message</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contactInfosData.map((info) => (
                  <TableRow key={info._id}>
                    <TableCell className="font-medium truncate max-w-xs">{info.name}</TableCell>
                    <TableCell className="truncate max-w-xs">{info.email}</TableCell>
                    <TableCell className="truncate max-w-md">{info.message}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="destructive" onClick={() => handleDeleteContact(info._id)}>
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

export default AllContactInfo;

