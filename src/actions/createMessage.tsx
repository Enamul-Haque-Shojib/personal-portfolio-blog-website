
"use server"


export type TMessage = {
    name: string;
    email: string;
    message: string;
  
}
const createMessage = async(data:TMessage) => {
    const res = await fetch('https://personal-portfolio-blog-website-server.vercel.app/api/contactinfo/create-contactinfo',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data),
            cache: 'no-store'
        }
    );
    const messageData = res.json();
    return messageData;
};

export default createMessage;