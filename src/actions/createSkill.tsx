
"use server"


export type TSkill = {
    _id?: string;
    title: string;
    skillImgUrl: string;
    email: string;
   
}
const createSkill = async(data:TSkill) => {
    const res = await fetch('https://personal-portfolio-blog-website-server.vercel.app/api/skills/create-skill',
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