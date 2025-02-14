

'use client';

import createProject, { TProject } from '@/actions/createProject';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import createImage from '@/actions/createImage';
import { useToast } from '@/hooks/use-toast';
import { useSession } from 'next-auth/react';

const AddProject = () => {
    const {data: session} = useSession();
        const email = session?.user?.email || "";
    const { toast } = useToast();

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [technologies, setTechnologies] = useState<string[]>([]);

    const form = useForm({
        defaultValues: {
            projectName: '',
            projectImgUrl: null,
            description: '',
            technologies: [],
            github: '',
            live: ''
        },
    });

    const handleAddTechnology = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const value = e.currentTarget.value.trim();
            if (value && !technologies.includes(value)) {
                setTechnologies([...technologies, value]);
            }
            e.currentTarget.value = '';
        }
    };

    const handleRemoveTechnology = (tech: string) => {
        setTechnologies(technologies.filter(t => t !== tech));
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const imageFile = data.projectImgUrl?.[0];
        const projectImgUrl = await createImage(imageFile);

        const initialData: Partial<TProject> = {
            projectName: data.projectName,
            projectImgUrl,
            description: data.description,
            technologies,
            github: data.github,
            live: data.live,
            email: email,
        };

    

        try {
            await createProject(initialData);
            
            form.reset();
            setTechnologies([]);
            toast({ title: "Success", description: "Project added successfully!" });
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to add project." });
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <Card className="w-full max-w-2xl text-black shadow-xl">
                <CardHeader>
                    <CardTitle className="text-center text-xl">Add New Project</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField control={form.control} name="projectName" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter project name" required {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="projectImgUrl" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Image</FormLabel>
                                    <FormControl>
                                        <Input type="file" accept="image/*" onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            field.onChange(e.target.files);
                                            if (file) {
                                                const imageUrl = URL.createObjectURL(file);
                                                setImagePreview(imageUrl);
                                            }
                                        }} />
                                    </FormControl>
                                    {imagePreview && <Image src={imagePreview} width={100} height={100} alt="Preview" className="rounded-lg mt-2" />}
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="description" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Project description" required {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="technologies" render={() => (
                                <FormItem>
                                    <FormLabel>Technologies</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Type and press Enter" onKeyDown={handleAddTechnology} />
                                    </FormControl>
                                    <FormDescription>Type and press Enter to add multiple skill (Add at least one skill)</FormDescription>
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
                            )} />

                            <FormField control={form.control} name="github" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>GitHub Link</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter GitHub link" required {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="live" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Live Link</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter live site link" required {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <Button type="submit" className="w-full bg-[#ff004f] hover:bg-red-700 transition">
                                Submit
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddProject;
