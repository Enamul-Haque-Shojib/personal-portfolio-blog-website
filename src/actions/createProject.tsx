
"use server"


export type TProject = {
    _id: string;
    projectName: string;
          projectImgUrl: string | File| null;
          description: string;
          technologies: string[];
          email: string,
   
}
const createProject = async(data:Partial<TProject>) => {
    const res = await fetch('http://localhost:5000/api/projects/create-project',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        }
    );
    const projectData = res.json();
    return projectData;
};

export default createProject;