
"use server"

import { TSkill } from "./createSkill";





const updateSkill = async(data: Partial<TSkill>, id: string) => {
    const res = await fetch(`https://personal-portfolio-blog-website-server.vercel.app/api/skills/update-skill/${id}`,
        {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data),
            cache: 'no-store'
        }
    );
    const skillData = res.json();
    return skillData;
};

export default updateSkill;