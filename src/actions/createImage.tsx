
// "use server"


// import axios from "axios";
// const createImage = async(file:File) => {
//     console.log('file')
//     const formData = new FormData();
//     formData.append("image", file);

//     // const res = await fetch('https://api.imgbb.com/1/upload?key=8367e30714143f89dc7eb7e14faaf8eb',
//     //     {
//     //         method: 'POST',
//     //         body: formData,
//     //     }
//     // );
//     // if (!res.ok) {
//     //     throw new Error("Failed to upload image");
//     // }

//     // const imageData = await res.json();
//     // console.log(imageData)
//     // return imageData.data.url;






//     formData.append("upload_preset", "portfolio-blog");
  
//         const response = await axios.post(
//             "CLOUDINARY_URL=cloudinary://735122214858436:Z85yx7aMremhszACYtoKZuVgAEQ@dqsm6ybdu",
//             formData
//           );
    
//           console.log(response.data);
   
   





// };

// export default createImage;


"use server";

import axios from "axios";

const createImage = async (file: File) => {
    console.log("Uploading file...");

    const formData = new FormData();
    formData.append("file", file); // Use "file" instead of "image"
    formData.append("upload_preset", "portfolio-blog"); // Use your actual upload preset

    try {
        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dqsm6ybdu/image/upload",
            formData
        );

        console.log("Cloudinary Response:", response.data);
        return response.data.secure_url; // Returns the uploaded image URL
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};

export default createImage;
