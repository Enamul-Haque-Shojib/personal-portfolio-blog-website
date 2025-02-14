
"use server"


export type TBlog = {
    _id?: string;
    title: string;
    blogImgUrl: string ;
    content: string;
    email: string;
   
}
const createBlog = async(data:TBlog) => {
    const res = await fetch('https://personal-portfolio-blog-website-server.vercel.app/api/blogs/create-blog',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data),
            cache: 'no-store'
        }
    );
    const blogData = res.json();
    return blogData;
};

export default createBlog;