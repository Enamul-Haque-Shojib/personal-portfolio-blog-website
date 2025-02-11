
"use server"


export type TMessage = {
    name: string;
    email: string;
    message: string;
    authEmail: string;
}
const createMessage = async(data:TMessage) => {
    const res = await fetch('http://localhost:5000/api/contactinfo/create-contactinfo',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        }
    );
    const messageData = res.json();
    return messageData;
};

export default createMessage;