
"use server"

import { TProject } from "./createProject";



const updateProject = async(data: Partial<TProject>, id: string) => {
    const res = await fetch(`http://localhost:5000/api/projects/update-project/${id}`,
        {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        }
    );
    const projectData = res.json();
    return projectData;
};

export default updateProject;