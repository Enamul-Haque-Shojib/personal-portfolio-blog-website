
"use server"

import { TBlog } from "./createBlog";





const updateBlog = async(data: Partial<TBlog>, id: string) => {
    const res = await fetch(`http://localhost:5000/api/blogs/update-blog/${id}`,
        {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        }
    );
    const projectData = res.json();
    return projectData;
};

export default updateBlog;