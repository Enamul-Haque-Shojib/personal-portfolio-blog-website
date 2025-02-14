"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import createImage from "@/actions/createImage";
import { useParams, useRouter } from "next/navigation";
import { TBlog } from "@/actions/createBlog";
import updateBlog from "@/actions/updateBlog";
import { useToast } from "@/hooks/use-toast";



const UpdateBlog = () => {
   
    const router = useRouter();
    const params : {update_blog: string} = useParams();
    // const { update_blog } = useParams(); 
    const { toast } = useToast();
    const [imagePreview, setImagePreview] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    const form = useForm({
        defaultValues: {
            title: "",
            blogImgUrl: "",
            content: "",
            email: "",
        },
    });

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`https://personal-portfolio-blog-website-server.vercel.app/api/blogs/get-single-blog/${params?.update_blog}`);
                if (!res.ok) throw new Error("Failed to fetch blog");
                const data = await res.json();
                const blog = data.data[0];

                form.reset({
                    title: blog.title,
                    blogImgUrl: blog.blogImgUrl,
                    content: blog.content,
                    email: blog.email || "",
                });
                setImagePreview(blog.blogImgUrl);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [params?.update_blog, form]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        let blogImgUrl: string  = imagePreview;

        if (typeof data.blogImgUrl === 'object' && data.blogImgUrl.length > 0) {
            blogImgUrl = await createImage(data.blogImgUrl[0]);
        }

        const updatedBlog: Partial<TBlog> = {
            title: data.title,
            blogImgUrl: blogImgUrl,
            content: data.content,
            email: data.email,
        };

        try {
            await updateBlog(updatedBlog, params?.update_blog);
            toast({
                title: "Success",
                description: "Blog updated successfully",
                variant: "default",
            });
            router.push('/dashboard/all_blogs');
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update blog",
                variant: "destructive",
            });
            console.error("Error submitting form:", error);
        }
    };

    if (loading) return <p className="text-center text-gray-500">Loading blog details...</p>;

    return (
        <div className="flex items-center justify-center min-h-screen text-black p-4">
            <div className="w-full max-w-2xl shadow-lg rounded-lg p-6">
                <h2 className="text-center text-xl font-bold mb-4">Update Blog</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Title" required {...field} className=" text-black border-none" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="blogImgUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Blog Image</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                field.onChange(e.target.files);
                                                if (file) {
                                                    setImagePreview(URL.createObjectURL(file));
                                                }
                                            }}
                                            className="text-black border-none"
                                        />
                                    </FormControl>
                                    {imagePreview && (
                                        <Image
                                            src={imagePreview}
                                            width={80}
                                            height={80}
                                            alt="Preview"
                                            className="w-20 h-20 rounded-lg mt-2 object-cover"
                                        />
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Content" required {...field} className=" text-black border-none h-32" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold p-3 rounded-lg transition">
                            Update
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default UpdateBlog;
