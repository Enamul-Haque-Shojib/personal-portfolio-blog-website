
"use server"

import { console } from "inspector";

export type TAuth = {
    _id?: string;
    authName?: string;
    authImgUrl?: string;
    email?: string;
    password?: string;
    role?: string;
   
}
const loginUser = async(data:TAuth) => {
    console.log(data)
    const res = await fetch(`https://personal-portfolio-blog-website-server.vercel.app/api/auths/login`,
    // const res = await fetch(`http://localhost:5000/api/auths/login`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data),
            cache: "no-store"
        },
    );
    const userData = res.json();
    
    return userData;
};

export default loginUser;