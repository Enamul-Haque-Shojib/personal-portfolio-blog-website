
"use server"

import { TBlog } from "./createBlog";





const updateBlog = async(data: Partial<TBlog>, id: string) => {
    const res = await fetch(`https://personal-portfolio-blog-website-server.vercel.app/api/blogs/update-blog/${id}`,
        {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data),
            cache: 'no-store'
        }
    );
    const projectData = res.json();
    return projectData;
};

export default updateBlog;