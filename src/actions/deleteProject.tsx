
"use server"


const deleteProject = async(id: string) => {
    const res = await fetch(`https://personal-portfolio-blog-website-server.vercel.app/api/projects/delete-project/${id}`,
        {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'},
            cache: 'no-store'
            
        }
    );
    const projectData = res.json();
    return projectData;
};

export default deleteProject;