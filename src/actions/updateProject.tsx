
"use server"

import { TProject } from "./createProject";



const updateProject = async(data: Partial<TProject>, id: string) => {
    const res = await fetch(`https://personal-portfolio-blog-website-server.vercel.app/api/projects/update-project/${id}`,
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

export default updateProject;