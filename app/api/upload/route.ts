import { NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiOptions } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
export async function POST(request: Request) {
  const path = await request.json();
  console.log(path);
  if (!path) {
    return NextResponse.json(
      {
        message: "Image path is requied",
      },
      { status: 400 }
    );
  }
  try {
    const options: UploadApiOptions = {
      use_filename: true,
      unique_filename: true,
      overwrite: true,
      transformation: [{ width: 1000, height: 752, crop: "scale" }],
    };

    const result = await cloudinary.uploader.upload(path, options);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return NextResponse.json(
      {
        message: "Cant upload this file",
      },
      { status: 500 }
    );
  }
}
