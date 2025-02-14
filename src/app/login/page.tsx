'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const Login = () => {
  const { toast } = useToast();
  const router = useRouter();
  
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
   
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

 console.log('-->>>>',result)
    if (result?.error) {
      console.error('Login failed:', result.error);
      toast({ title: "Error", description: "Failed to Logged in." });
    } else {
      toast({ title: "Success", description: "Logged in successfully!" });
      router.push('/dashboard');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 p-4">
      <Card className="w-full max-w-lg shadow-lg border border-gray-800">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold text-gray-600">Login to Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email Address" required {...field} />
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
                    <FormLabel className="text-white">Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter Password" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 transition">
                Login
              </Button>
            </form>
          </Form>
          <div className="mt-4 flex justify-center gap-3">
            <Button onClick={() => signIn('github', { callbackUrl: '/dashboard' })} variant="outline">
              Sign in with GitHub
            </Button>
            <Button onClick={() => signIn('google', { callbackUrl: '/dashboard' })} variant="outline">
              Sign in with Google
            </Button>
          </div>
          <p className="text-center text-gray-400 mt-4">
            Don`t have an account? <Link href="/register" className="text-red-500 hover:underline">Sign Up</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
