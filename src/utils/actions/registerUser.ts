
"use server"



export type TAuth = {
    _id?: string;
    name?: string;
    image?: string;
    email?: string;
    password?: string;
    role?: string;
   
}
const registerUser = async(data:TAuth) => {
    const res = await fetch(`${process.env.BACKEND_URL}/auths/register`,
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

export default registerUser;