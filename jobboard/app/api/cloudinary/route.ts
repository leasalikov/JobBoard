
// your config path

import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";


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
    // your auth check here if required
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        const fileBuffer = await file.arrayBuffer();

        const mimeType = file.type;
        const encoding = "base64";
        const base64Data = Buffer.from(fileBuffer).toString("base64");

        // this will be used to upload the file
        const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

        const res = await uploadToCloudinary(fileUri);


        return NextResponse.json({
            message: "success", imgUrl: res?.result.secure_url
        });
    } catch (error) {
        return NextResponse.json({ message: "failure" });
    }

}
