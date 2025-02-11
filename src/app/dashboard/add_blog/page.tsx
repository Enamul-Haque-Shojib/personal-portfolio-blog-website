"use client"

import createBlog, { TBlog } from '@/actions/createBlog';
import createImage from '@/actions/createImage';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const AddBlog = () => {
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
          const response = await createBlog(initialData)
           
          
          console.log(response);
        } catch (error) {
          console.error("Error submitting form:", error);
     
        }
        form.reset();
      };
    return (
        <div>
            <div className="bg-gray-900 text-white" id="contact">
            <div className="w-[90%] max-w-5xl mx-auto py-16">
                <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
                    
                    <div className="w-full md:w-1/2">
                        
                         <Form {...form}>
                            <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4"
                            >
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                    <Input placeholder="Title" required {...field}  />
                                    </FormControl>
                                    {/* <FormDescription>Full name of the sender.</FormDescription> */}
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
                            const imageUrl = URL.createObjectURL(file);
                            setImagePreview(imageUrl);  // ✅ Now TypeScript will not complain
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
                                                                <Textarea placeholder="Content" required {...field}  />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                            )}
                                                        />

                            {/* Submit Button */}
                            <div className="col-span-full text-center">
                                <Button
                                type="submit"
                                className="w-full bg-[#ff004f] text-white p-6 rounded-lg shadow-md hover:bg-red-700 transition"
                                >
                                Submit
                                </Button>
                            </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default AddBlog;