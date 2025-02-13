"use client";

import createBlog, { TBlog } from '@/actions/createBlog';
import createImage from '@/actions/createImage';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import Image from 'next/image';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

const AddBlog = () => {
    const { toast } = useToast();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const form = useForm({
        defaultValues: {
          title: "",
          blogImgUrl: null,
          content: "",
          email: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const imageFile = data.blogImgUrl[0];
        const blogImgUrl = await createImage(imageFile);

        const initialData: TBlog = {
            title: data.title,
            blogImgUrl: blogImgUrl,
            content: data.content,
            email: 'jack@gmail.com',
        };

        try {
            const response = await createBlog(initialData);
            console.log(response);
            toast({ title: "Success", description: "Blog submitted successfully!" });
        } catch (error) {
            console.error("Error submitting form:", error);
            toast({ title: "Error", description: "Failed to submit blog." });
        }
        form.reset();
    };

    return (
        <div className="flex items-center justify-center min-h-screen  text-black p-4">
            <Card className="w-full max-w-2xl  rounded-lg">
                <CardHeader>
                    <CardTitle className="text-center text-xl font-bold text-black">Add New Blog</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-black'>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter blog title" required {...field} className=" text-black border-none" />
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
                                        <FormLabel className='text-black'>Blog Image</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    field.onChange(e.target.files);
                                                    if (file) {
                                                        const imageUrl = URL.createObjectURL(file);
                                                        setImagePreview(imageUrl);
                                                    }
                                                }}
                                                className=" text-black border-none"
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
                                        <FormLabel className='text-black'>Content</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Write your blog content here..."
                                                required
                                                {...field}
                                                className=" text-black border-none h-32"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold p-3 rounded-lg transition"
                            >
                                Submit Blog
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddBlog;
