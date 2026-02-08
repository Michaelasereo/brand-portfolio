import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .limit(1)
      .single();

    if (error && error.code !== "PGRST116") {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data ?? null);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = createAdminClient();

    const row = {
      name: body.name ?? "",
      title: body.title ?? "",
      about: body.about ?? "",
      avatar_url: body.avatar_url ?? "",
      socials: body.socials ?? [],
      ctas: body.ctas ?? [],
      updated_at: new Date().toISOString(),
    };

    const { data: existing } = await supabase
      .from("profile")
      .select("id")
      .limit(1)
      .single();

    if (existing) {
      const { error } = await supabase
        .from("profile")
        .update(row)
        .eq("id", existing.id);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    } else {
      const { error } = await supabase.from("profile").insert(row);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
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
