/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"


import { Button } from '@/components/ui/button';
import React from 'react';

const ErrorPage = ({error, reset} : {error:any, reset: any}) => {
    return (
        <div>
            <h1 className='text-red-600 text-4xl'>somethis wrong</h1>
            <p>{error.message}</p>
            <Button onClick={()=>{reset()}}>Try Again</Button>
        </div>
    );
};

export default ErrorPage;