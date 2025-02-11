
"use server"


export type TBlog = {
    _id: string;
    title: string;
    blogImgUrl: string | File | null;
    content: string;
    email: string;
   
}
const createBlog = async(data:TBlog) => {
    const res = await fetch('http://localhost:5000/api/blogs/create-blog',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        }
    );
    const blogData = res.json();
    return blogData;
};

export default createBlog;