"use client";

import createProject, { TProject } from "@/actions/createProject";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import createImage from "@/actions/createImage";
import { useParams } from "next/navigation";
import updateProject from "@/actions/updateProject";

const UpdateProject = () => {
    const { update_project } = useParams(); 
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [technologies, setTechnologies] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const form = useForm({
        defaultValues: {
            projectName: "",
            projectImgUrl: null,
            description: "",
            technologies: [],
            email: "",
        },
    });

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/projects/get-single-project/${update_project}`);
                if (!res.ok) throw new Error("Failed to fetch project");
                const data = await res.json();
                const project = data.data[0];

                form.reset({
                    projectName: project.projectName,
                    projectImgUrl: project.projectImgUrl,
                    description: project.description,
                    technologies: project.technologies || [],
                    email: project.email || "",
                });

                setTechnologies(project.technologies || []);
                setImagePreview(project.projectImgUrl);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [update_project, form]);

    const handleAddTechnology = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const value = e.currentTarget.value.trim();
            if (value && !technologies.includes(value)) {
                setTechnologies([...technologies, value]);
            }
            e.currentTarget.value = "";
        }
    };

    const handleRemoveTechnology = (tech: string) => {
        setTechnologies(technologies.filter((t) => t !== tech));
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        let projectImgUrl : string | File |null;
        projectImgUrl = imagePreview;
        console.log(projectImgUrl)

        if (typeof data.projectImgUrl === 'object') {
            projectImgUrl = await createImage(data.projectImgUrl[0]);
        }

     

        const updatedProject: Partial<TProject> = {
            projectName: data.projectName,
            projectImgUrl: projectImgUrl,
            description: data.description,
            technologies: technologies,
            email: data.email,
        };

        console.log(updatedProject);

        try {
            const response = await updateProject(updatedProject, update_project);
            console.log(response);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    if (loading) return <p className="text-center text-gray-500">Loading project details...</p>;

    return (
        <div className="bg-gray-900 text-white py-16">
            <div className="w-[90%] max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row gap-10">
                    <div className="w-full md:w-1/2">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
                                <FormField
                                    control={form.control}
                                    name="projectName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Project Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Project Name" required {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="projectImgUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Project Image</FormLabel>
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
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Description" required {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="technologies"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>Technologies</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="Type and press Enter..." onKeyDown={handleAddTechnology} />
                                            </FormControl>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {technologies.map((tech) => (
                                                    <span key={tech} className="bg-gray-700 text-white px-3 py-1 rounded-lg flex items-center gap-2">
                                                        {tech}
                                                        <button type="button" onClick={() => handleRemoveTechnology(tech)}>
                                                            <X size={16} className="text-red-500" />
                                                        </button>
                                                    </span>
                                                ))}
                                            </div>
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

export default UpdateProject;
