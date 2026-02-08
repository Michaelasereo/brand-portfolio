import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, primary_color, secondary_color, border_radius, font_family } =
      body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing settings id" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const { error } = await supabase
      .from("site_settings")
      .update({
        primary_color: primary_color ?? undefined,
        secondary_color: secondary_color ?? undefined,
        border_radius: border_radius ?? undefined,
        font_family: font_family ?? undefined,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
