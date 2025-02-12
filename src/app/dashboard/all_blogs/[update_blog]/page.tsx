"use client";


import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import createImage from "@/actions/createImage";
import { useParams } from "next/navigation";

import { TBlog } from "@/actions/createBlog";
import updateBlog from "@/actions/updateBlog";

const UpdateBlog = () => {
    const { update_blog } = useParams(); 
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const form = useForm({
        defaultValues: {
            title: "",
            blogImgUrl: null,
            content: "",
            email: "",
        },
    });

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/blogs/get-single-blog/${update_blog}`);
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
    }, [update_blog, form]);


    

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        let blogImgUrl : string | File |null;
        blogImgUrl = imagePreview;
        console.log(blogImgUrl)

        if (typeof data.projectImgUrl === 'object') {
            blogImgUrl = await createImage(data.blogImgUrl[0]);
        }

     

        const updatedBlog: Partial<TBlog> = {
            title: data.title,
            blogImgUrl: blogImgUrl,
            content: data.content,
          
            email: data.email,
        };

        console.log(updatedBlog);

        try {
            const response = await updateBlog(updatedBlog, update_blog);
            console.log(response);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    if (loading) return <p className="text-center text-gray-500">Loading blog details...</p>;

    return (
        <div className="bg-gray-900 text-white py-16">
            <div className="w-[90%] max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row gap-10">
                    <div className="w-full md:w-1/2">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Title" required {...field} />
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
                                                />
                                            </FormControl>
                                            {imagePreview && (
                                                <Image
                                                    src={imagePreview}
                                                    width={50}
                                                    height={50}
                                                    alt="Preview"
                                                    className="w-20 h-20 rounded-full mt-2"
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
                                                <Textarea placeholder="Content" required {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                               
                                <div className="col-span-full text-center">
                                    <Button type="submit" className="w-full bg-[#ff004f] text-white p-6 rounded-lg shadow-md hover:bg-red-700 transition">
                                        Update
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateBlog;
