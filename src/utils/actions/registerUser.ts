
"use server"



export type TAuth = {
    _id?: string;
    authName?: string;
    authImgUrl?: string;
    email?: string;
    password?: string;
    role?: string;
   
}
const registerUser = async(data:TAuth, email: string) => {
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

export default registerUser;