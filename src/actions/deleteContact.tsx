
"use server"



const deleteContact = async(id: string) => {
    const res = await fetch(`https://personal-portfolio-blog-website-server.vercel.app/api/contactinfo/delete-contactinfo/${id}`,
        {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'},
            cache: 'no-store'
        }
    );
    const blogData = res.json();
    return blogData;
};

export default deleteContact;