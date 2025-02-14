"use client";


import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import Image from "next/image";

import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import createImage from "@/actions/createImage";
import { useParams, useRouter } from "next/navigation";

import updateSkill from "@/actions/updateSkill";
import { TSkill } from "@/actions/createSkill";
import { useToast } from "@/hooks/use-toast";

const UpdateSkill = () => {
    const { toast } = useToast();
    const router = useRouter();
    const params : {update_skill: string} = useParams();

    const [imagePreview, setImagePreview] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    const form = useForm({
        defaultValues: {
            title: "",
            skillImgUrl: "",
            email: "",
        },
    });

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`https://personal-portfolio-blog-website-server.vercel.app/api/skills/get-single-skill/${params?.update_skill}`);
                if (!res.ok) throw new Error("Failed to fetch blog");
                const data = await res.json();
                const skill = data.data[0];

                form.reset({
                    title: skill.title,
                    skillImgUrl: skill.skillImgUrl,
                    email: skill.email || "",
                });

                
                setImagePreview(skill.skillImgUrl);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [params?.update_skill, form]);


    

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        let skillImgUrl : string;
        skillImgUrl = imagePreview;
   

        if (typeof data.skillImgUrl === 'object') {
            skillImgUrl = await createImage(data.skillImgUrl[0]);
        }

     

        const updatedSkill: Partial<TSkill> = {
            title: data.title,
            skillImgUrl: skillImgUrl,
            email: data.email,
        };

       

        try {
            await updateSkill(updatedSkill, params?.update_skill);

            router.push('/dashboard/all_skills')
            toast({ title: "Success", description: "skill updated successfully", variant: "default" });
        } catch (error) {
            console.error("Error submitting form:", error);
            toast({ variant: "destructive", title: "Error", description: "Failed to update skill." });
        }
    };

    if (loading) return <p className="text-center text-gray-500">Loading blog details...</p>;

    return (
        <div className=" text-black py-16">
            <div className="w-[90%] max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row gap-10">
                    <div className="w-full md:w-1/2">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className=" p-6 rounded-lg shadow-lg space-y-4">
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
                                    name="skillImgUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>skill Image</FormLabel>
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

export default UpdateSkill;
