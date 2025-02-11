"use client"

import createImage from '@/actions/createImage';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import registerUser, { TAuth } from '@/utils/actions/registerUser';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const Register = () => {
  const router = useRouter();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const form = useForm({
        defaultValues: {
          authName: "",
          authImgUrl: null,
          email: "",
          password: "",
        },
      });


    

      const onSubmit: SubmitHandler<FieldValues> = async (data) => {
     
        const imageFile = data.authImgUrl[0];
        const authImgUrl = await createImage(imageFile);

        const initialData: TAuth = {
          authName: data.authName,
          authImgUrl: authImgUrl,
          email: data.email,
          password: data.password,
         
      };
     
 
      
        try {
          const response = await registerUser(initialData, data.email)
           
          
          console.log(response);
        } catch (error) {
          console.error("Error submitting form:", error);
     
        }
        form.reset();
        router.push('/login')
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
                                name="authName"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                    <Input placeholder="Name" required {...field}  />
                                    </FormControl>
                                    
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
    control={form.control}
    name="authImgUrl"
    render={({ field }) => (
        <FormItem>
            <FormLabel>Image</FormLabel>
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
                                name="email"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                    <Input placeholder="Email" required {...field}  />
                                    </FormControl>
                                    
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                    <Input placeholder="Password" required {...field}  />
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
                                Sign Up
                                </Button>
                            </div>
                            </form>
                        </Form>
                        <Button onClick={()=>{signIn("github", {
            callbackUrl: "/dashboard"
        })}}>Github</Button>
                        <Button onClick={()=>{signIn("google", {
            callbackUrl: "/dashboard"
        })}}>Google</Button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Register;