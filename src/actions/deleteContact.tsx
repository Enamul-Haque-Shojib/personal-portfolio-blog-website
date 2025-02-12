
"use server"



const deleteContact = async(id: string) => {
    const res = await fetch(`${process.env.BACKEND_URL}/contactinfo/delete-contactinfo/${id}`,
        {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'},
        }
    );
    const blogData = res.json();
    return blogData;
};

export default deleteContact;