
"use server"


// export type TBlog = {
//     title: string;
//     content: string;
//     email: string;
   
// }
const createImage = async(file:File) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch('https://api.imgbb.com/1/upload?key=8367e30714143f89dc7eb7e14faaf8eb',
        {
            method: 'POST',
            body: formData,
        }
    );
    if (!res.ok) {
        throw new Error("Failed to upload image");
    }

    const imageData = await res.json();
    return imageData.data.url;
};

export default createImage;