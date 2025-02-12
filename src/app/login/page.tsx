"use client"

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
// import loginUser from '@/utils/actions/loginUser';

// import { TAuth } from '@/utils/actions/registerUser';
import { signIn } from 'next-auth/react';

import { useRouter } from 'next/navigation';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const Login = () => {
  const router = useRouter();
    
    const form = useForm({
        defaultValues: {
          email: "",
          password: "",
        },
      });

      const onSubmit: SubmitHandler<FieldValues> = async (data) => {




        const result = await signIn("credentials", {
          redirect: false, // Prevent default redirect
          email: data.email,
          password: data.password,
        });
    
        if (result?.error) {
          console.error("Login failed:", result.error);
        } else {
          router.push("/dashboard"); // Redirect after successful login
        }









      //   const initialData: TAuth = {
      //     email: data.email,
      //     password: data.password,
         
      // };
     
 
      
      //   try {
      //     const response = await loginUser(initialData)
           
          
          
      //     if(response.success==true) {
      //       console.log(response);
      //       router.push('/dashboard')
      //     }
      //   } catch (error) {
      //     console.error("Error submitting form:", error);
     
      //   }
      //   form.reset();
      //   router.push('/dashboard')
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
                                Login
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

export default Login;