
"use server"


export type TProject = {
    _id?: string;
    projectName: string;
          projectImgUrl: string ;
          description: string;
          technologies: string[];
          email: string,
          github: string,
          live: string,
   
}
const createProject = async(data:Partial<TProject>) => {
    const res = await fetch('https://personal-portfolio-blog-website-server.vercel.app/api/projects/create-project',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data),
            cache: 'no-store'
        }
    );
    const projectData = res.json();
    return projectData;
};

export default createProject;