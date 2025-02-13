"use client";

import createImage from '@/actions/createImage';
import createSkill, { TSkill } from '@/actions/createSkill';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';


import Image from 'next/image';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const AddSkill = () => {
    const { toast } = useToast();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const form = useForm({
        defaultValues: {
            title: "",
            skillImgUrl: null,
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const imageFile = data.skillImgUrl[0];
            const skillImgUrl = await createImage(imageFile);
            const initialData: TSkill = {
                title: data.title,
                skillImgUrl: skillImgUrl,
                email: 'jack@gmail.com',
            };
            await createSkill(initialData);
            toast({ title: "Success", description: "Skill added successfully!" });
            form.reset();
            setImagePreview(null);
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to add skill." });
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <Card className="w-full max-w-lg  text-black shadow-xl">
                <CardHeader>
                    <CardTitle className="text-center text-xl font-semibold">Add Skill</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {/* Title Field */}
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter skill title" required {...field} className="text-black" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            {/* Image Upload Field */}
                            <FormField
                                control={form.control}
                                name="skillImgUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Skill Image</FormLabel>
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
                                                className="file:bg-gray-700 file:border-none file:rounded-lg file:text-white file:px-4 file:py-2"
                                            />
                                        </FormControl>
                                        {imagePreview && (
                                            <div className="flex justify-center mt-4">
                                                <Image
                                                    src={imagePreview}
                                                    width={80}
                                                    height={80}
                                                    alt="Preview"
                                                    className="rounded-full border-2 border-gray-500 shadow-md"
                                                />
                                            </div>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            {/* Submit Button */}
                            <Button type="submit" className="w-full bg-[#ff004f] hover:bg-red-700 transition font-semibold text-white">
                                Submit
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddSkill;