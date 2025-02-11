"use client"

import createMessage, { TMessage } from '@/actions/createMessage';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const ContactMe = () => {

    const form = useForm({
        defaultValues: {
          name: "",
          email: "",
          message: "",
        },
      });

      const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const initialData: TMessage = {
          name: data.name,
          email: data.email,
          message: data.message,
          authEmail: "admin@gmail.com",
      };
     
      
        try {
          const response = await createMessage(initialData)
           
          
          console.log(response.data);
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
                    <div className="w-full md:w-1/2 space-y-6">
                        <h1 className="text-5xl font-bold">Contact Me</h1>
                        <p className="flex items-center gap-3 text-lg"><i className="fa-solid fa-envelope text-[#ff004f]"></i> enamulhaqueshojib@gmail.com</p>
                        <p className="flex items-center gap-3 text-lg"><i className="fa-solid fa-phone text-[#ff004f]"></i> +8801635011383</p>
                        <div className="flex gap-5 text-2xl">
                            <Link href="https://github.com/Enamul-Haque-Shojib" target="_blank" className="hover:text-[#ff004f]"><i className="fa-brands fa-github"></i></Link>
                            <Link href="https://www.linkedin.com/in/enamul-haque-shojib-b1a738173/" target="_blank" className="hover:text-[#ff004f]"><i className="fa-brands fa-linkedin"></i></Link>
                        </div>
                        <Link href="#" download className="bg-[#ff004f] text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition">Download Resume</Link>
                    </div>
                    <div className="w-full md:w-1/2">
                        
                         <Form {...form}>
                            <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4"
                            >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                <FormItem>
                                    {/* <FormLabel>Name</FormLabel> */}
                                    <FormControl>
                                    <Input placeholder="Your Name" required {...field} className="w-full p-6 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ff004f]"  />
                                    </FormControl>
                                    {/* <FormDescription>Full name of the sender.</FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                <FormItem>
                                    {/* <FormLabel>Email</FormLabel> */}
                                    <FormControl>
                                    <Input placeholder="Your Email" required {...field} className="w-full p-6 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ff004f]"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                <FormItem>
                                    {/* <FormLabel>Email</FormLabel> */}
                                    <FormControl>
                                    <Textarea placeholder="Your Message" required {...field} className="w-full p-6 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ff004f]" />
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

export default ContactMe;