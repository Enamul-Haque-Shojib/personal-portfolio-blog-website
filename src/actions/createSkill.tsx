
"use server"


export type TSkill = {
    _id: string;
    title: string;
    skillImgUrl: string | File | null;
    email: string;
   
}
const createSkill = async(data:TSkill) => {
    const res = await fetch('http://localhost:5000/api/skills/create-skill',
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

export default createSkill;