
import Footer from '@/components/share/footer/Footer';
import Navbar from '@/components/share/navbar/Navbar';
import { authOptions } from '@/utils/authOptions';

import { getServerSession } from 'next-auth';
import React from 'react';


const withCommonLayout = async({children}: Readonly<{
  children: React.ReactNode;
}>) => {
    const session = await getServerSession(authOptions)
    return (
        <div>
            <Navbar session={session}></Navbar>
            {children}
            <Footer></Footer>
        </div>
    );
};

export default withCommonLayout;