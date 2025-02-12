
"use server"



const deleteSkill = async(id: string) => {
    const res = await fetch(`${process.env.BACKEND_URL}/skills/delete-skill/${id}`,
        {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'},
            cache: 'no-store'
        }
    );
    const blogData = res.json();
    return blogData;
};

export default deleteSkill;