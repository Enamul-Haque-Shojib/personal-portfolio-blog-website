


"use client";

import createMessage, { TMessage } from '@/actions/createMessage';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
// import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { ImGithub } from "react-icons/im";import { GrLinkedin } from "react-icons/gr";

const ContactMe = () => {
    // const {data: session} = useSession();
    //     const {email} = session?.user;
    const { toast } = useToast();
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
    //   authEmail: email,
    };

    try {
      await createMessage(initialData);
      
      toast({ title: "Success", description: "Message added successfully!" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({ variant: "destructive", title: "Error", description: "Failed to add Message." });
    }
    form.reset();
  };

  return (
    <div className=" text-black py-16 flex flex-col min-h-screen" id="contact h-screen" >
      <div className="container mx-auto px-4 md:px-8 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-black">Contact Me</h1>
            <p className="text-lg text-black flex items-center gap-3">
              <i className="fa-solid fa-envelope text-[#ff004f]" /> enamulhaqueshojib@gmail.com
            </p>
            <p className="text-lg text-black flex items-center gap-3">
              <i className="fa-solid fa-phone text-[#ff004f]" /> +8801635011383
            </p>
            <div className="flex gap-5 text-2xl">
              <Link href="https://github.com/Enamul-Haque-Shojib" target="_blank" className="text-black hover:text-[#ff004f]">
              <ImGithub />
              </Link>
              <Link href="https://www.linkedin.com/in/enamul-haque-shojib-b1a738173/" target="_blank" className=" hover:text-[#ff004f]">
              <GrLinkedin />
              </Link>
            </div>
            <Link href="#" download className="inline-block bg-[#ff004f] text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition duration-300">
              Download Resume
            </Link>
          </div>

          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" p-8 rounded-lg shadow-lg space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Your Name"
                          required
                          {...field}
                          className="w-full p-4 rounded-lg text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ff004f]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Your Email"
                          required
                          {...field}
                          className="w-full p-4 rounded-lg  text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ff004f]"
                        />
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
                      <FormControl>
                        <Textarea
                          placeholder="Your Message"
                          required
                          {...field}
                          className="w-full p-4 rounded-lg text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ff004f]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="text-center">
                  <Button
                    type="submit"
                    className="w-full bg-[#ff004f] text-white p-4 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
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
  );
};

export default ContactMe;
