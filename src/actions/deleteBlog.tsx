
"use server"



const deleteBlog = async(id: string) => {
    const res = await fetch(`${process.env.BACKEND_URL}/blogs/delete-blog/${id}`,
        {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'},
        }
    );
    const blogData = res.json();
    return blogData;
};

export default deleteBlog;