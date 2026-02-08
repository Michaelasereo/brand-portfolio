import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const name = (formData.get("name") as string) ?? "file";

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `project-assets/${name}.${ext}`;

    const { data, error } = await supabase.storage
      .from("project-assets")
      .upload(path, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("project-assets").getPublicUrl(data.path);

    return NextResponse.json({ url: publicUrl });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
