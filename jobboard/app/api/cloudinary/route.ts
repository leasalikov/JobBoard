
import cloudinary from '@/lib/cloudinary';
import { NextRequest, NextResponse } from 'next/server';

const uploadToCloudinary = async (fileUri: string) => {
    try {
        return await cloudinary.uploader.upload(fileUri)
    }
    catch (err) {
        console.log(err);
        return null;
    }
}


export async function POST(req: NextRequest) {
    try {
        const formData: FormData = await req.formData();
        const uploadedFiles = formData.getAll('filepond');
        console.log(uploadedFiles)
        let fileName = '';
        let parsedText = '';
        const file = formData.get("filepond") as File
        const fileBuffer = await file.arrayBuffer();

        const mimeType = file.type;
        console.log(mimeType + "      👩‍🦰👩‍🦰👩‍🦰mimeType!!!!!!!!!!!!!!!!");

        const encoding = "base64";
        const base64Data = Buffer.from(fileBuffer).toString("base64");

        const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;
        const res = await uploadToCloudinary(fileUri);

        console.log(res)
        return NextResponse.json({
            message: "success", imgUrl: res?.secure_url
        });
    } catch (error) {
        console.log(error);

        return NextResponse.json({ message: "failure" });
    }

}

// const uploadToCloudinary = async (fileUri: string) => {
//     try {
//         return await cloudinary.uploader.upload(fileUri)
//     }
//     catch (err) {
//         console.log(err);
//         return null;
//     }
// }


// export async function POST(req: NextRequest) {

//     // your auth check here if required
//     try {
//         const formData = await req.formData();
//         const file = formData.get("file") as File;
//         console.log(file + "    🧓👴👨‍🦳file!!!!!!!!!!!!!!!!");

//         const fileBuffer = await file.arrayBuffer();

//         const mimeType = file.type;
//         console.log(mimeType + "      👩‍🦰👩‍🦰👩‍🦰mimeType!!!!!!!!!!!!!!!!");

//         const encoding = "base64";
//         const base64Data = Buffer.from(fileBuffer).toString("base64");

//         const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;
//         const res = await uploadToCloudinary(fileUri);

//         console.log(res)
//         return NextResponse.json({
//             message: "success", imgUrl: res?.secure_url
//         });
//     } catch (error) {
//         console.log(error);

//         return NextResponse.json({ message: "failure" });
//     }

// }
