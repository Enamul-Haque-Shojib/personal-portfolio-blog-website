
"use server"

import { TAuth } from "./registerUser";

const SocialUser = async(data:TAuth, email: string) => {
    const res = await fetch(`${process.env.BACKEND_URL}/auths/account/${email}`,
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

export default SocialUser;