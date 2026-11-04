import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionResponse = await fetch(
      `${process.env.API_BASE_URL}/api/auth/get-session`,
      {
        headers: { Cookie: cookieStore.toString() },
        cache: "no-store",
      },
    );

    if (sessionResponse.status === 401) {
      return Response.json(
        { message: "Please log in to upload a photo." },
        { status: 401 },
      );
    }

    if (!sessionResponse.ok) {
      return Response.json(
        { message: "Could not check your session." },
        { status: 502 },
      );
    }

    const session = await sessionResponse.json();

    if (!session?.user) {
      return Response.json(
        { message: "Please log in to upload a photo." },
        { status: 401 },
      );
    }

    const key = process.env.IMGBB_API_KEY;

    if (!key) {
      return Response.json(
        { message: "Photo upload is unavailable. Use an image URL instead." },
        { status: 503 },
      );
    }

    const data = await request.formData();
    const photo = data.get("photo");

    if (
      !(photo instanceof File) ||
      photo.size === 0 ||
      photo.size > 3 * 1024 * 1024 ||
      !["image/jpeg", "image/png", "image/webp"].includes(photo.type)
    ) {
      return Response.json(
        { message: "Choose a JPG, PNG or WebP photo up to 3 MB." },
        { status: 400 },
      );
    }

    const uploadData = new FormData();
    uploadData.set("image", photo);

    const upload = await fetch(
      `https://api.imgbb.com/1/upload?key=${encodeURIComponent(key)}`,
      { method: "POST", body: uploadData },
    );

    const result = await upload.json();

    if (!upload.ok || !result.success || !result.data?.url) {
      return Response.json(
        { message: "Photo upload failed. Try again." },
        { status: 502 },
      );
    }

    return Response.json({ imageUrl: result.data.url });
  } catch {
    return Response.json(
      { message: "Could not upload the photo." },
      { status: 500 },
    );
  }
}
